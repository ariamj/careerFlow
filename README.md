# CareerFlow

CareerFlow is a job search application tracker designed to make the job hunt
more organized and less overwhelming. It gives job seekers one place to record
opportunities, review their pipeline, and keep important application details
easy to find.

> **Project status:** CareerFlow is an active work in progress. The core
> application-tracking experience and API are being built, while authentication
> and some data flows are still being connected end to end.

## What it does

- Track applications by company, position, work mode, interest level, status,
  and application date
- View application counts and an at-a-glance dashboard
- Browse applications in a sortable, reusable data table
- Archive and revisit job postings
- Use responsive navigation across dashboard, applications, archive, and profile
  areas
- Support light and dark themes through the frontend design system
- Persist application data through a serverless API backed by PostgreSQL

## Tech stack

### Frontend

- React 19 and TypeScript
- Vite
- TanStack Router for file-based routing
- TanStack Query for server-state management
- TanStack Table for application data tables
- Tailwind CSS and shadcn/ui-inspired components
- Neon Auth UI for the authentication experience

### Backend and data

- Hono running on Vercel Edge Functions
- Drizzle ORM
- Neon serverless PostgreSQL
- A shared `packages/database` workspace package for schema and migrations

## Design

- [Figma design](https://www.figma.com/design/mqWIHM0xbmqUCW67g1JYAp/CareerFlow?node-id=1-2887&t=g0wqrD8lkSkbhNOj-1)
- [shadcn/ui style reference](https://ui.shadcn.com/create?command=init&template=vite&preset=b6ZjlcLaK&item=preview)
