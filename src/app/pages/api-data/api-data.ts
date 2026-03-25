import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs';
import { Api, Post } from '../../services/api';

@Component({
  selector: 'app-api-data',
  imports: [CommonModule],
  templateUrl: './api-data.html',
  styleUrl: './api-data.css',
})
export class ApiData implements OnInit {
  posts: Post[] = [];
  loading = true;
  error: string | null = null;
  selectedPost: Post | null = null;
  private requestTimeoutHandle: ReturnType<typeof setTimeout> | null = null;

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts(): void {
    // Load posts from API service
    this.loading = true;
    this.error = null;
    this.clearRequestTimeout();

    // Final UI safety net: if network hangs unexpectedly, stop spinner and show message.
    this.requestTimeoutHandle = setTimeout(() => {
      if (this.loading) {
        this.loading = false;
        this.error = 'Request timed out. Please try again.';
      }
    }, 12000);

    this.api
      .getPosts()
      .pipe(
        finalize(() => {
          this.loading = false;
          this.clearRequestTimeout();
        })
      )
      .subscribe({
        next: (data) => {
          this.posts = data;
        },
        error: (err) => {
          this.error = 'Failed to load blog posts. Please try again later.';
          console.error('Error fetching posts:', err);
        },
      });
  }

  private clearRequestTimeout(): void {
    if (this.requestTimeoutHandle) {
      clearTimeout(this.requestTimeoutHandle);
      this.requestTimeoutHandle = null;
    }
  }

  selectPost(post: Post): void {
    this.selectedPost = post;
  }

  closeDetail(): void {
    this.selectedPost = null;
  }
}
