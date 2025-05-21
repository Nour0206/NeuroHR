import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userProfile: User | null = null;
  loading = true;
  errorMsg = '';
  editMode = false;

  // For new entries, string keyed by property name
  newEntry: { [key: string]: string } = {};

  constructor(private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMsg = 'User not authenticated.';
      this.loading = false;
      return;
    }

    this.userService.getUser(userId).subscribe({
      next: (user) => {
        console.log('User received:', user);
        this.userProfile = user;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load profile.';
        this.loading = false;
      },
    });
  }

  saveProfile(): void {
    if (!this.userProfile) return;

    const userId = this.authService.getUserId();
    if (!userId) {
      this.errorMsg = 'User not authenticated.';
      return;
    }

    this.userService.updateUser(userId, this.userProfile).subscribe({
      next: () => {
        this.editMode = false;
      },
      error: () => {
        this.errorMsg = 'Failed to save profile.';
      },
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.ngOnInit(); // reload original profile to discard edits
  }

  addEntry(key: keyof User): void {
    if (!this.userProfile) return;

    const entryStr = this.newEntry[key];
    if (!entryStr) return;

    // For arrays of strings (languages), just push the string
    if (key === 'languages') {
      (this.userProfile[key] as string[]).push(entryStr);
      this.newEntry[key] = '';
      return;
    }

    // For arrays of objects, parse JSON string
    try {
      const entryObj = JSON.parse(entryStr);
      if (entryObj && Array.isArray(this.userProfile[key])) {
        (this.userProfile[key] as any[]).push(entryObj);
        this.newEntry[key] = '';
      }
    } catch (error) {
      alert('Invalid JSON format for ' + key);
    }
  }

  removeEntry(key: keyof User, index: number): void {
    if (!this.userProfile) return;

    if (Array.isArray(this.userProfile[key])) {
      (this.userProfile[key] as any[]).splice(index, 1);
    }
  }
}
