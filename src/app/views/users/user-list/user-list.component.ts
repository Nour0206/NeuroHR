import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { User } from '../../../models/user.model';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-user-list',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})


/* @Pipe({
  name: 'roleFilter'
})
export class RoleFilterPipe implements PipeTransform {
  transform(users: User[], selectedRole: string): User[] {
    if (!selectedRole) return users;
    return users.filter(user => user.role === selectedRole);
  }
} */
export class UserListComponent  implements OnInit {
  roleFilter: string = '';
  utilisateurs: User[] = [];
  showModal = false;
  isEditMode = false;
  currentUserId: string | null = null;
  userIsHR: boolean = false; // Add a property to check if the user is HR
  userIsAdmin: boolean = false; // Add a property to check if the user is Admin

  userForm!: FormGroup;

  constructor(private authService: AuthService,private userService: UserService,private fb: FormBuilder
) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['candidate', Validators.required]
    });
    this.loadUsers();

    // Set userIsHR based on the user's role
    const userInfo = this.authService.getUserInfo();
    this.userIsHR = userInfo.roles?.includes('HR') || false;

    // Set userIsAdmin based on the user's role
    this.userIsAdmin = userInfo.roles?.includes('Admin') || false;
    console.log('User Info:', userInfo); // Debugging log
    console.log('User Roles:', userInfo['roles']); // Debugging log  
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.utilisateurs = users,
      error: (err) => console.error('Error loading users:', err)
    });
  }

  openAddUserModal(): void {
    this.isEditMode = false;
    this.currentUserId = null;
    this.userForm.reset({ role: 'candidate' });
    this.showModal = true;
  }

  openEditUserModal(user: User): void {
    this.isEditMode = true;
    this.currentUserId = user.id;
    this.userForm.patchValue({
      name: user.name,
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

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error deleting user:', err)
      });
    }
  }
}
