import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, timeout } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface FeedbackSubmission {
  name: string;
  email: string;
  message: string;
}

interface DummyJsonPost {
  id: number;
  title: string;
  body: string;
  userId?: number;
}

interface DummyJsonPostsResponse {
  posts: DummyJsonPost[];
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  // Using DummyJSON as primary source - reliable and fast
  private primaryApiUrl = 'https://dummyjson.com/posts';
  // JSONPlaceholder as backup
  private fallbackApiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private readonly defaultPostLimit = 10;
  private readonly requestTimeoutMs = 4000;

  constructor(private http: HttpClient) {}

  getPosts(limit: number = this.defaultPostLimit): Observable<Post[]> {
    return this.http
      .get<DummyJsonPostsResponse>(`${this.primaryApiUrl}?limit=${limit}`)
      .pipe(
        timeout(this.requestTimeoutMs),
        map((response) =>
          response.posts.map((post) => ({
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId ?? 0,
          }))
        ),
        catchError(() =>
          this.http
            .get<Post[]>(`${this.fallbackApiUrl}?_limit=${limit}`)
            .pipe(
              timeout(this.requestTimeoutMs),
              catchError(() => of(this.getLocalFallbackPosts(limit)))
            )
        )
      );
  }

  private getLocalFallbackPosts(limit: number): Post[] {
    // Local fallback data in case APIs are unreachable
    const posts: Post[] = [
      {
        userId: 1,
        id: 1,
        title: "Welcome to My Blog",
        body: 'Hey everyone! I am Surya, an aspiring web developer studying at Humber Polytechnic. This blog showcases projects and learnings from my web development courses.',
      },
      {
        userId: 2,
        id: 2,
        title: 'Getting Started with Angular',
        body: 'Angular has been one of my favorite frameworks to work with. The component-based architecture and built-in tools make building scalable applications easier than I expected.',
      },
      {
        userId: 3,
        id: 3,
        title: 'Why I Chose TypeScript',
        body: 'Coming from JavaScript, TypeScript took some time to get used to but the type safety has saved me from so many bugs. Definitely worth the learning curve.',
      },
      {
        userId: 4,
        id: 4,
        title: 'Building Forms That Actually Work',
        body: 'Form validation used to be a pain point for me. Reactive forms in Angular are way cleaner than I thought they would be. Here is what I learned along the way.',
      },
      {
        userId: 5,
        id: 5,
        title: 'APIs and Services - The Backbone',
        body: 'Understanding how services talk to APIs is crucial. In this post I talk about how I structured my first real Angular app with proper service layers.',
      },
    ];

    return posts.slice(0, limit);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.fallbackApiUrl}/${id}`);
  }

  submitFeedback(feedback: FeedbackSubmission): Observable<any> {
    // Since JSONPlaceholder doesn't have a real feedback endpoint,
    // we'll mock it by posting to the posts endpoint
    return this.http.post(`${this.fallbackApiUrl}`, feedback);
  }
}
