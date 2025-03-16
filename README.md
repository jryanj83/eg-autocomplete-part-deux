# EG Autocomplete Part Deux

A Next.js application that provides an address lookup functionality with autocomplete search capabilities.

## Project Overview

This application allows users to:
- Search and filter user data using an autocomplete search field that updates results in real-time
- View user information in a responsive data grid with sortable columns
- Filter results by name or email address with instant feedback
- Click on any user row to view detailed information including:
  - Full contact details (phone, email, website)
  - Complete address information with street, city, and zip code
  - Company information including company name and business details
  - Make aditional API call to get users todo list
- Navigate between search results and detailed views seamlessly

The project demonstrates:
- React with TypeScript implementation
- Material UI v6 integration
- Client-side filtering and search functionality with optimized performance
- Server side and client side data fetching with error handling and loading states
- Component composition and separation of concerns
- Drawer-based UI for detailed information display
- Comprehensive test coverage using Jest and React Testing Library

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: Material UI v6
- **State Management**: React Query
- **Testing**: Jest and React Testing Library
- **Language**: TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Testing

Run the test suite:

```bash
npm test
```
