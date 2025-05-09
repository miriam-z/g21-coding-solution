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

## Brief Explanation of My Approach

- The project uses **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS** for rapid development and strong typing.
- All form data and loading states are managed using simple React `useState` hooks for clarity and maintainability.
- The API route `/api/review-requests` serves and accepts review requests, using a local file for sample data.
- The UI leverages **shadcn/ui** components for a modern, accessible look with minimal custom styling.
- The table supports sorting, filtering, and status changes, all handled client-side.
- The app is fully Dockerized for easy onboarding and consistent local development.

---

## Challenges I Faced

- **Turbopack instability in Docker:** Next.js 15 defaults to Turbopack, which caused runtime errors in Docker. Solved by explicitly disabling Turbopack in `next.config.js` and using Webpack for dev.

---

## What I Would Improve With More Time

- **Data persistence and dynamic updates:** There was no requirement for persistent database storage in this challenge, so the app uses static in-memory data. As a result, status changes and new entries are not truly dynamic. For a production solution, I would implement persistent storage (e.g., SQLite, Postgres), and use state management and caching libraries like Redux or React Query to handle larger and more dynamic datasets efficiently.
- **API improvements:** I would create more REST endpoints for granular operations (edit, delete, etc.), and add automated tests for these endpoints. For robust type safety, I would use [openapi-typescript](https://www.npmjs.com/package/openapi-typescript) to auto-generate TypeScript types from OpenAPI/Swagger docs.
- **Backend enhancements:** Consider building the API with Node.js (Express) or FastAPI for scalability and maintainability.
- **Optimized data loading:** Efficient data loading and fetching strategies, including pagination and caching, to handle large datasets and improve performance.
- **Responsive design and accessibility:** Further enhance the UI for accessibility and mobile responsiveness.
- **Automated testing:** Add comprehensive unit and integration tests for both frontend components and backend endpoints.
- **Stress and load testing:** Implement stress and load tests to ensure the application can handle large datasets and high user concurrency, and to identify performance bottlenecks.
- **Multi-tenancy and RBAC:** Add multi-tenancy support and robust role-based access control (RBAC) to securely manage data isolation and permissions for different users and organizations.

---

