import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  private apiKey = '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';

  async askBot(message: string): Promise<string> {
    const endpoint = 'https://openrouter.ai/api/v1/chat/completions';

    const body = {
      model: 'deepseek/deepseek-chat:free',
      messages: [
        {
          role: 'system',
          content: `You are an HR assistant chatbot for a job application platform.
                    Only respond to job-related questions. If someone asks something else,
                    politely tell them you're only for HR support.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    };

    try {
      const response = await axios.post(endpoint, body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0 &&
        response.data.choices[0].message
      ) {
        return response.data.choices[0].message.content.trim();
      } else {
        return 'No response from DeepSeek.';
      }
    } catch (error: any) {
      console.error('DeepSeek API error:', error.response?.data || error.message);
      return `Error contacting DeepSeek API: ${error.response?.data?.message || error.message}`;
    }
  }
}
