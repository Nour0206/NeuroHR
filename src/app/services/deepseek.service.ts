import { Injectable } from '@angular/core';
import axios from 'axios';
import { JobService } from './job.service'; // Import JobService

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  private groqApiKey = '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';

  constructor(private jobService: JobService) {} // Inject JobService

  async askBot(message: string): Promise<string> {
    const endpoint = 'https://api.groq.com/openai/v1/chat/completions'; // Updated Groq API endpoint

    // Fetch the list of jobs
    let jobList = 'No jobs available.';
    try {
      const jobs = await this.jobService.getJobs('', '').toPromise(); // Pass empty strings for no filters
      if (jobs && jobs.length > 0) {
        jobList = jobs.map((job: any) => `${job.title} (${job.type})`).join(', ');
      }
    } catch (error) {
      console.error('Error fetching job list:', error);
    }

    const body = {
      model: 'llama-3.3-70b-versatile', // Updated model to match the example
      messages: [
        {
          role: 'system',
          content: `You are an HR assistant chatbot for a job application platform.
                    Here is the list of available jobs: ${jobList}.
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
          'Authorization': `Bearer ${this.groqApiKey}`
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
        return 'No response from Groq.';
      }
    } catch (error: any) {
      console.error('Groq API error:', error.response?.data || error.message);
      return `Error contacting Groq API: ${error.response?.data?.message || error.message}`;
    }
  }
}
