# Fintech Dashboard — Personal Expense Tracker & Insights

A responsive one-page fintech dashboard built with React (Vite), TailwindCSS, and Recharts.  
Designed to showcase real-world frontend engineering skills: tables with filtering/pagination, charts, exports, and a simple auth demo.

## Live Demo

[View on Vercel](https://fintech-dashboard-lovat.vercel.app/)

## Screenshots

(Add screenshots or a short GIF here after deployment)

## Features

- Responsive layout with collapsible sidebar & topbar
- Analytics:
- Income vs. Expenses (Line Chart)
- Category breakdown (Pie Chart)
- Transactions Table:
- Search, filter by status/date, pagination
- CSV & PDF export
- Simple demo login flow
- Local fake API with `json-server`
- Clean, modular component-based structure (easy to review)

## Tech Stack

- React (Vite) + Tailwind CSS\*\* for fast UI
- @tanstack/react-table for advanced tables
- Recharts for data visualization
- json-server to mock backend APIs
- PapaParse + jsPDF for CSV/PDF export

## Run Locally

Clone and install:

````bash
git clone <your-repo-url>
cd fintech-dashboard
npm install
Run dev server:

```bash
npm run dev
npx json-server db.json --port 5000

Visit app at:
http://localhost:5173

Case Study: Why json-server?

To make the project easy to run, I used json-server to mock API endpoints for transactions and login.
This avoids backend setup complexity while still showing how I handle:

API calls

Authentication flow

State management

It keeps the project lightweight, portable, and user-friendly.

About this project:
Built as a portfolio piece to demonstrate modern frontend best practices.
Includes clean commits, responsive design, and production-ready deployment.
````
