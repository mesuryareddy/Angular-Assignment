import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  feedbackForm!: FormGroup;
  submitted = false;
  submitSuccess = false;
  submitError = false;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private api: Api
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    // Create feedback form with validation rules
    this.feedbackForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      rating: [5, Validators.required],
    });
  }

  get name() {
    return this.feedbackForm.get('name');
  }

  get email() {
    return this.feedbackForm.get('email');
  }

  get message() {
    return this.feedbackForm.get('message');
  }

  get rating() {
    return this.feedbackForm.get('rating');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.feedbackForm.invalid) {
      return;
    }

    this.submitting = true;
    const feedbackData = {
      name: this.feedbackForm.value.name,
      email: this.feedbackForm.value.email,
      message: this.feedbackForm.value.message,
      rating: this.feedbackForm.value.rating,
    };

    this.api.submitFeedback(feedbackData).subscribe({
      next: (response) => {
        this.submitSuccess = true;
        this.submitting = false;
        this.feedbackForm.reset();
        this.submitted = false;
        setTimeout(() => {
          this.submitSuccess = false;
        }, 5000);
      },
      error: (error) => {
        this.submitError = true;
        this.submitting = false;
        console.error('Error submitting feedback:', error);
        setTimeout(() => {
          this.submitError = false;
        }, 5000);
      },
    });
  }

  resetForm(): void {
    this.feedbackForm.reset();
    this.submitted = false;
  }
}
