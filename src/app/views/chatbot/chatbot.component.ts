import { Component } from '@angular/core';
import { DeepseekService } from '../../services/deepseek.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: { sender: 'user' | 'bot', text: string }[] = [];
  userInput = '';
  loading = false;

  constructor(private ai: DeepseekService) {}
  ngOnInit(): void {
    this.messages.push({ sender: 'bot', text: 'Hey 👋 ,I\'m an Hr Bot How can I help you today?' });
  }
  async sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    this.loading = true;

    try {
      const reply = await this.ai.askBot(input);
      this.messages.push({ sender: 'bot', text: reply });
    } catch (error) {
      this.messages.push({ sender: 'bot', text: 'Oops, something went wrong.' });
    } finally {
      this.loading = false;
    }
  }
}
