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

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

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
- Provide a README with:
  - Setup instructions
  - Brief explanation of your approach
  - Any challenges you faced
  - What you would improve with more time

## Evaluation Criteria

- Basic functionality of the form and table
- Implementation of a simple API route
- Code organization
- TypeScript usage
- UI design with shadcn components
- Component structure and organization

Good luck! We're excited to see what you build.
