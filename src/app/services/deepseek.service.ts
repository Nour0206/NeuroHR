import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { JobService } from './job.service'; // Import JobService

@Injectable({
  providedIn: 'root'
})
export class DeepseekService {
  private groqApiKey = environment.groqApiKey;

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
                    fist give him some questions he can ask you like : how to apply for a job, how to track my application.
                    If the user asks about a specific job, provide a brief description and ask if they would like to apply.make your answer as short as possible and to the point.
                    Only respond to job-related questions. If someone asks something else,
                    politely tell them you're only for HR support. also to apply for a job he has only to go to the Available Jobs in the side bar and click on the apply button and all he have to do is to upload his resume and to track his applications he can go on the My Application on the sidenavbar , most of the time the jobs is offered to the most suituble condidate that's his resume match the job more ,`
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
