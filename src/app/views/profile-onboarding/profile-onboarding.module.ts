import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProfileOnboardingComponent } from './profile-onboarding.component';

@NgModule({
  declarations: [ProfileOnboardingComponent],
  imports: [CommonModule, FormsModule],
  exports: [ProfileOnboardingComponent]
})
export class ProfileOnboardingModule {}
