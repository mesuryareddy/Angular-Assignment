# Surya's Angular Blog Application

This is my Angular 21 web application for my web programming course at Humber Polytechnic. It's a blog site with multiple pages, API integration, and a feedback form.

## About the Project

I built this project to learn Angular fundamentals:
- Client-side navigation using Angular Router
- API calls through a custom service with HttpClient
- Reactive forms with validation
- Component-based architecture

## Pages

**Home** - Landing page with introduction and features

**Blogs** - Blog posts from DummyJSON API

**Feedback** - Form to submit feedback (name, email, message, rating)

## Technologies

- Angular 21 (Standalone Components)
- TypeScript 5.9
- RxJS 7.8
- Reactive Forms
- Angular Router

## Setup

Install dependencies:
```bash
npm install
```

Start dev server:
```bash
npm start
```

Open http://localhost:4200

## Build

```bash
npm run build
```

Output: `dist/angular-client-app/browser/`

## Deployment to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Set build command: `npm run build`
4. Set output: `dist/angular-client-app/browser`
5. Deploy

The vercel.json file handles SPA routing.

## Project Structure

```
src/app/
  pages/
    home/       - Landing page
    api-data/   - Blog posts
    form/       - Feedback form
  services/
    api.ts      - API service
  shared/
    navbar/     - Navigation
```

## Assignment Checklist

- ✓ 3+ page navigation (Home, Blogs, Feedback)
- ✓ API integration with HttpClient
- ✓ Reactive form with validation
- ✓ Client-side routing
- ✓ Production build ready
- ✓ Deployment configured
