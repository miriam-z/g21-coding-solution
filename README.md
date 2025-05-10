# G21 Portal Coding Challenge

Welcome to the G21 Portal Developer Coding Challenge! This repository contains everything you need to get started with the challenge.

## Overview

In this challenge, you will build a small module for the G21 Portal that helps compliance officers manage document review requests.

Your task is to create:

1. A form to submit new document review requests
2. A table to display existing review requests
3. Basic filtering functionality for the table

## Challenge Requirements

### Technical Stack

- NextJS (App Router)
- React
- TypeScript
- Tailwind CSS for styling
- shadcn/ui for components (already set up)

### Data Fetching

For this challenge, you'll need to implement basic data fetching using NextJS:

1. Create a simple API route at `/api/review-requests` that:

   - Returns the list of sample review requests (GET)
   - Accepts new review requests (POST)

2. Implement data fetching in your components using one of these methods:

   - Client-side: Using `fetch` with React state
   - Server-side: Using NextJS Server Components

3. Add basic loading indicators when data is being fetched

### Features

#### 1. Document Review Request Form

Create a form on its own dedicated page that collects the following information:

- Client name (dropdown with at least 3 dummy options)
- Document title (text input)
- Document type (dropdown: "Financial Promotion", "DDQ Response", "Risk Assessment")
- Priority (dropdown: "Low", "Medium", "High")
- Due date (date picker)
- Notes (text area)
- File upload (simulate only, no actual upload needed)

#### 2. Review Requests Table

Create a table on its own dedicated page displaying submitted review requests with the following:

- All fields from the form except Notes
- Status column (automatically set to "Pending" for new submissions)
- Created date (automatically set to submission time)
- Actions column with "View" and "Edit" buttons (these don't need to be functional)

#### 3. Filtering

Add a simple filter dropdown to the table:

- Filter by status (dropdown with options: "All", "Pending", "In Review", "Completed")

### State Management

- Use simple React state to manage form data and loading states
- Store sample data in a file that your API route will use
- Pre-populate the data with 5-7 sample entries

## Bonus Points (completely optional)

Choose one or more if you have extra time:

- Form validation using Zod
- Add more filters (client name, document type)
- Sorting functionality for the table
- Status change capability
- Simple responsive design
- Add a search input for document titles
- Enhanced styling and UI improvements for the pages
- Dockerize the project (create a Dockerfile and docker-compose.yml)

## Project Structure

The starter repository contains:

- TypeScript types for review requests
- Sample data for clients and review requests
- Basic project structure
- Several pre-installed shadcn/ui components (Button, Select, Badge)
- Helper utilities

You are encouraged to install additional shadcn/ui components as needed for your implementation. For example, you might want to add Input, Label, Table, Form, or Card components depending on your approach. You can install additional components using:

```bash
npx shadcn-ui@latest add <component-name>
```

## Styling

Functionality is the priority for this challenge. Simple styling using the provided shadcn/ui components will suffice. Only focus on enhanced styling and UI improvements if you have extra time, as the main focus is on implementing the core functionality correctly.

## Submission Guidelines

- Complete the challenge within 2 hours
- Create a new repository with your solution
- Provide a README with the following sections:

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone git@github.com:miriam-z/g21-coding-solution.git
   cd g21-coding-solution
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Run locally:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   npx next dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

4. **Run with Docker (clean workflow):**
   ```bash
   docker-compose down -v
   docker-compose build --no-cache
   docker-compose up
   ```
   Visit [http://localhost:3000](http://localhost:3000)

**Other useful Docker commands:**

- **Stop containers:**
  ```bash
  docker-compose down
  ```
- **View logs:**
  ```bash
  docker-compose logs -f
  ```
- **Access the running container shell:**
  ```bash
  docker-compose exec app sh
  ```

**Troubleshooting:**
- If you see errors related to node_modules or dependencies, try stopping and removing volumes, then rebuild with `docker-compose down -v && docker-compose up --build`.
- Make sure port 3000 is not in use by another process on your machine.

---

## Architecture Overview

- **Data Layer (Supabase):** Migrated from static mock data to a real PostgreSQL backend using Supabase. All review request data is persisted via secure, async Supabase client functions, ready for multi-user RLS and production use.
- **Client-Side Fetching:** All reads/writes are performed using client-side hooks and fetch logic for fast interactivity. SSR was intentionally avoided to keep auth handling simpler and support dynamic client-specific filtering.
- **Component Design:** UI is composed of reusable shadcn/ui components (DropdownFilter, ReviewRequestTable, etc.) following DRY principles and clear folder separation.
- **Routing (App Router):** Structured with Next.js App Router (`/submit`, `/reviews`)
- **UI/UX:** Designed for minimal, accessible interactivity using Tailwind and shadcn/ui. Sorting, filtering, and table logic is modular and easily extendable.
- **Dockerized:** Fully Dockerized for consistent local onboarding and dev environments.

---

## Future Enhancements

- **Dynamic actions (View/Edit):** Add View and Edit flows for full submission lifecycle and dynamic status updates.
- **Access control & multi-tenancy:** Apply Supabase RLS and RBAC to isolate tenant data and manage user permissions.
- **Admin tooling:** Support bulk actions, CSV import/export, and an admin dashboard for operations.
* **State management & data loading:** Use [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) or [SWR](https://swr.vercel.app/) for caching and real-time updates. Add Redux for complex client-side state. For large datasets, implement SSR/SSG with pagination to improve load performance.
- **API improvements:** Add REST endpoints for editing, deleting, and retrieving review requests, with test coverage. Generate TypeScript types from OpenAPI specs using [openapi-typescript](https://www.npmjs.com/package/openapi-typescript)
- **Backend enhancements:** Build out the API using Node.js or FastAPI for scalability and clearer separation of concerns.
- **Reusable logic:** Abstract fetch/filter logic into custom hooks and clean up component structure for better maintainability.
- **Accessibility & responsiveness:** Improve mobile UI and ensure full WCAG compliance.
- **Automated testing:** Add end-to-end unit and integration tests to ensure reliability across frontend and backend logic.
- **Performance testing:** Run stress and load tests to ensure scalability and identify bottlenecks.
- **File uploads:** Implement secure uploads using Supabase or S3, persist document metadata, and enable/preview/download.
- **ML workflows:** Integrate NLP pipelines to classify, summarize, or analyze uploaded documents for compliance flagging.

---

