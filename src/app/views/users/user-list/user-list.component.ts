import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent  implements OnInit {
  utilisateurs: User[] = [];
  showModal = false;
  isEditMode = false;
  currentUserId: number | null = null;

  userForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    role: ['USER', Validators.required]
  });

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {this.utilisateurs = users
        console.log(users)
      },
      error: (err) => console.error('Error loading users:', err)
    });
  }

  openAddUserModal(): void {
    this.isEditMode = false;
    this.currentUserId = null;
    this.userForm.reset({ role: 'USER' });
    this.showModal = true;
  }

  openEditUserModal(user: User): void {
    this.isEditMode = true;
    this.currentUserId = user.id;
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      role: user.role
    });
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.userForm.reset();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      const operation = this.isEditMode && this.currentUserId
        ? this.userService.updateUser(this.currentUserId, userData)
        : this.userService.addUser(userData);

      operation.subscribe({
        next: () => {
          this.loadUsers();
          this.closeModal();
        },
        error: (err) => console.error('Error saving user:', err)
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }
  /* utilisateurs: User[] = []; // This will hold the list of users
  userForm: FormGroup;
  isEditMode = false;
  currentUserId: number | null = null;





  constructor(private userService: UserService,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.utilisateurs = users;
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(); // Reload users after deletion
    });
  } */
}
