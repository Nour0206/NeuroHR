from flask import Flask, request, jsonify
import os
import PyPDF2 as pdf
import re
import json
from flask_cors import CORS
import requests
from dotenv import load_dotenv
from groq import Groq

app = Flask(__name__)
CORS(app)
load_dotenv()

# Groq API configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
groq_client = Groq(
    api_key=GROQ_API_KEY,
)

input_prompt = """
Hey Act Like a skilled or very experienced ATS (Application Tracking System)
with a deep understanding of tech fields. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide
best assistance for improving the resume. Assign the percentage matching based
on JD and the missing and Matching keywords with high accuracy also a general Profile Summary with the candidate name .

resume: {text}
description: {jd}

I want the response in one single string having the structure:
{{"JD Match":"%","MissingKeywords":[],'MatchingKeywords':[],"Profile Summary":""}}
"""

# Extract text from PDF
def extract_text(file):
    reader = pdf.PdfReader(file)
    return "".join(page.extract_text() for page in reader.pages)

# Route to fetch available models
@app.route('/models', methods=['GET'])
def get_models():
    model_options = [
        {"value": "gemma2-9b-it", "name": "Gemma 2 9B"},
        {"value": "gemma-7b-it", "name": "Gemma 7B"},
        {"value": "llama3-groq-70b-8192-tool-use-preview", "name": "Llama 3 Groq 70B Tool Use (Preview)"},
        {"value": "llama3-groq-8b-8192-tool-use-preview", "name": "Llama 3 Groq 8B Tool Use (Preview)"},
        {"value": "llama-3.1-70b-versatile", "name": "Llama 3.1 70B (Preview)"},
        {"value": "llama-3.1-8b-instant", "name": "Llama 3.1 8B (Preview)"},
        {"value": "llama3-70b-8192", "name": "Meta Llama 3 70B"},
        {"value": "llama3-8b-8192", "name": "Meta Llama 3 8B"},
        {"value": "mixtral-8x7b-32768", "name": "Mixtral 8x7B"},
    ]
    return jsonify(model_options)

# Updated get_groq_response to use the provided Groq client usage pattern
def get_groq_response(prompt, model="llama3-70b-8192"):
    try:
        # Log the prompt and model for debugging
        print(f"Model: {model}")

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            model=model,
        )

        # Log the raw response for debugging
        print(f"Raw response from Groq API: {chat_completion}")

        return chat_completion.choices[0].message.content
    except Exception as e:
        print(f"Error with Groq API: {e}")
        raise

@app.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        resume = request.files['resume']
        job_details = json.loads(request.form['jobDetails'])
        resume_text = extract_text(resume)

        prompt = input_prompt.format(text=resume_text, jd=job_details['description'])
        groq_result = get_groq_response(prompt)

        print(f"Groq raw output: {repr(groq_result)}")  # Debug

        # Debugging: Log the raw response before cleaning
        print(f"Raw response before cleaning: {groq_result}")

        # Extract JSON object from the response
        try:
            # Updated regex to match balanced braces without recursion
            match = re.search(r'\{[^{}]*\}', groq_result, re.DOTALL)
            if not match:
                print(f"Full Groq API response: {groq_result}")  # Log full response for debugging
                raise ValueError("No valid JSON object found in the response")

            cleaned = match.group(0).strip()
            print(f"Extracted JSON string: {cleaned}")  # Debugging

            # Handle quoted JSON
            if cleaned.startswith('"') and cleaned.endswith('"'):
                cleaned = cleaned[1:-1].replace('\\"', '"')
                print(f"Unquoted JSON string: {cleaned}")  # Debugging

            # Preprocess the JSON string to fix invalid syntax (e.g., percentages)
            cleaned = re.sub(r'"(\d+)%"', r'"\1"', cleaned)
            print(f"Preprocessed JSON string: {cleaned}")  # Debugging

            # Replace single quotes with double quotes for valid JSON
            cleaned = re.sub(r"'(.*?)'", r'"\1"', cleaned)
            print(f"Cleaned JSON string with corrected quotes: {cleaned}")  # Debugging

            # Additional preprocessing to handle invalid characters
            cleaned = re.sub(r'\s+', ' ', cleaned).strip()  # Remove extra spaces
            print(f"Final cleaned JSON string: {cleaned}")  # Debugging

            # Attempt to load JSON
            parsed = json.loads(cleaned)
        except json.JSONDecodeError as e:
            print(f"JSON parsing error: {e}")
            print(f"Full Groq API response: {groq_result}")  # Log full response for debugging
            raise ValueError("Failed to parse JSON from the response")

        # Debugging: Log the parsed JSON object
        print(f"Parsed JSON object: {parsed}")

        # Safety net: ensure required fields are always present
        # Ensure jd_match is treated as a string before calling replace
        jd_match = str(parsed.get('JD Match', '0'))
        try:
            parsed['JDMatchPercentage'] = float(jd_match.replace("%", "").strip())
        except ValueError:
            print(f"Error converting JD Match to float: {jd_match}")
            parsed['JDMatchPercentage'] = 0.0

        # Fix isinstance usage to correctly check for list type
        parsed['MissingKeywords'] = ", ".join(parsed.get('MissingKeywords', [])) if isinstance(parsed.get('MissingKeywords'), list) else parsed.get('MissingKeywords', 'N/A')
        parsed['MatchingKeywords'] = ", ".join(parsed.get('MatchingKeywords', [])) if isinstance(parsed.get('MatchingKeywords'), list) else parsed.get('MatchingKeywords', 'N/A')
        parsed['ProfileSummary'] = parsed.get('Profile Summary', 'N/A')

        # Remove Groq-style keys
        parsed.pop('JD Match', None)
        parsed.pop('Profile Summary', None)

        # Debugging: Log the final parsed dictionary before returning
        print(f"Final Parsed Output: {parsed}")

        # Validate JSON serialization
        try:
            json.dumps(parsed)
        except (TypeError, ValueError) as e:
            print(f"Error serializing JSON: {e}")
            raise ValueError("Response contains non-serializable data")

        return jsonify(parsed)

    except Exception as e:
        print(f"Error in evaluate endpoint: {e}")
        return jsonify({
            "error": "An error occurred",
            "details": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
