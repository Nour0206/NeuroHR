from flask import Flask, request, jsonify
import os
import PyPDF2 as pdf
import re
import json
from flask_cors import CORS
from dotenv import load_dotenv
from groq import Groq
import ast

app = Flask(__name__)
CORS(app)
load_dotenv()

# Groq API configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=GROQ_API_KEY)

# -------- PROMPTS --------

input_prompt = """
Hey Act Like a skilled or very experienced ATS (Application Tracking System)
with a deep understanding of tech fields. Your task is to evaluate the resume based on the given job description.
You must consider the job market is very competitive and you should provide
best assistance for improving the resume. Assign the percentage matching based
on JD and the missing and Matching keywords with high accuracy also a general Profile Summary with the candidate name .

resume: {text}
description: {jd}

I want the response in one single string having the structure:
{{"JD Match":"%","MissingKeywords":[],"MatchingKeywords":[],"Profile Summary":""}}
"""

profile_extraction_prompt = """
You are an expert resume parser. Extract the following information from the provided resume and return it as a valid JSON object with these fields (in English):

{{
  "ProfessionalExperiences": [
    {{
      "JobTitle": "",
      "Company": "",
      "StartDate": "",
      "EndDate": "",
      "Description": ""
    }}
  ],
  "Education": [
    {{
      "Degree": "",
      "Institution": "",
      "Year": ""
    }}
  ],
  "Projects": [
    {{
      "Title": "",
      "Description": "",
      "Technologies": []
    }}
  ],
  "Languages": [""],
  "Certifications": [
    {{
      "Name": "",
      "Institution": "",
      "Year": ""
    }}
  ],
  "ProfileSummary": ""
}}

- Only return a single valid JSON object, no markdown, no explanation, no extra text.
- All fields must be present, even if empty.
- Use double quotes for all keys and string values.
- Do not include any comments or extra formatting.
- If a field is not found, return an empty string or empty array for that field.

Resume:
{text}

Return ONLY the JSON object as shown above, with all fields filled if possible.
"""

# -------- UTILITIES --------

def extract_text(file):
    reader = pdf.PdfReader(file)
    return "".join(page.extract_text() or '' for page in reader.pages)

def get_groq_response(prompt, model="llama3-70b-8192"):
    try:
        response = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": prompt}
            ],
            model=model,
        )
        return response.choices[0].message.content
    except Exception as e:
        raise RuntimeError(f"Groq API error: {e}")

# -------- ROUTES --------

@app.route('/models', methods=['GET'])
def get_models():
    return jsonify([
        {"value": "gemma2-9b-it", "name": "Gemma 2 9B"},
        {"value": "gemma-7b-it", "name": "Gemma 7B"},
        {"value": "llama3-groq-70b-8192-tool-use-preview", "name": "Llama 3 Groq 70B Tool Use (Preview)"},
        {"value": "llama3-groq-8b-8192-tool-use-preview", "name": "Llama 3 Groq 8B Tool Use (Preview)"},
        {"value": "llama-3.1-70b-versatile", "name": "Llama 3.1 70B (Preview)"},
        {"value": "llama-3.1-8b-instant", "name": "Llama 3.1 8B (Preview)"},
        {"value": "llama3-70b-8192", "name": "Meta Llama 3 70B"},
        {"value": "llama3-8b-8192", "name": "Meta Llama 3 8B"},
        {"value": "mixtral-8x7b-32768", "name": "Mixtral 8x7B"},
    ])

@app.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        resume = request.files['resume']
        job_details = json.loads(request.form['jobDetails'])
        resume_text = extract_text(resume)

        prompt = input_prompt.format(text=resume_text, jd=job_details['description'])
        groq_result = get_groq_response(prompt)

        match = re.search(r'\{.*\}', groq_result, re.DOTALL)
        if not match:
            raise ValueError("No JSON object found in Groq response.")

        cleaned = match.group(0)
        cleaned = cleaned.replace("'", '"')
        cleaned = re.sub(r'"(\d+)%"', r'"\1"', cleaned)

        parsed = json.loads(cleaned)
        jd_match = str(parsed.get('JD Match', '0'))
        parsed['JDMatchPercentage'] = float(jd_match.replace('%', '').strip())
        parsed['MissingKeywords'] = ", ".join(parsed.get('MissingKeywords', []))
        parsed['MatchingKeywords'] = ", ".join(parsed.get('MatchingKeywords', []))
        parsed['ProfileSummary'] = parsed.get('Profile Summary', '')

        parsed.pop('JD Match', None)
        parsed.pop('Profile Summary', None)

        return jsonify(parsed)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/extract_profile', methods=['POST'])
def extract_profile():
    try:
        resume = request.files['resume']
        resume_text = extract_text(resume)
        prompt = profile_extraction_prompt.format(text=resume_text)
        response = get_groq_response(prompt)

        print(f"Full Groq response:\n{response}")

        # Simple validation of JSON response
        if not response.strip().startswith('{') or not response.strip().endswith('}'):
            return jsonify({
                'error': 'Incomplete JSON response from Groq API',
                'message': 'The response is truncated or malformed.',
                'groq_response': response
            }), 500

        # Attempt to parse entire response directly (avoid slicing)
        parsed = json.loads(response)
        return jsonify(parsed)

    except json.JSONDecodeError as jde:
        print("JSONDecodeError:", jde)
        return jsonify({'error': 'JSON decoding error', 'exception': str(jde), 'groq_response': response}), 500

    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        print("Exception:", e)
        print(tb)
        return jsonify({"error": str(e), "traceback": tb}), 500

# -------- RUN --------

if __name__ == '__main__':
    app.run(debug=True)
