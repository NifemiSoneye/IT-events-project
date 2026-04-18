Tech Meetup 2026 — Frontend
A fullstack event management app built with React, TypeScript, and Redux Toolkit. Admins can manage attendees, view analytics, and handle authentication — all with a clean, dark-themed UI.

🔗 Live Demo & Related Repos
• Live Site: https://tech-event-teal.vercel.app
• Backend Repo: github.com/NifemiSoneye/It-events-backend
• Backend API: https://it-events-backend.onrender.com

🛠 Tech Stack
• React 18 + TypeScript — Component-based UI with full type safety
• Redux Toolkit + RTK Query — Global state management and data fetching with caching
• React Router v6 — Client-side routing with protected routes
• Tailwind CSS + Framer Motion — Utility-first styling with animations
• JWT Authentication — Access + refresh token auth with token rotation

✨ Features
Authentication
• JWT login with access token (15min) + refresh token (7 days)
• PersistLogin — survives page reload via refresh token
• RequireAuth — protects admin routes
• Auto-redirect to login on token expiry
Admin Dashboard
• View all registered attendees with search
• Analytics: total registrations, spots left, registrations today
• Create, edit, and delete attendees
• Logout with token cleanup
Public Page
• Attendee registration form with validation
• Email confirmation sent on successful registration

📁 Project Structure
• src/app/api/apiSlice.ts — Base RTK Query API slice with re-auth logic
• src/app/store.ts — Redux store configuration
• src/features/auth/ — Login, authSlice, authApiSlice, RequireAuth, PersistLogin
• src/features/attendees/ — attendeesApiSlice with entity adapter
• src/User/ — Public-facing registration form

🚀 Getting Started
Prerequisites
• Node.js 18+
• npm or yarn
Installation

1. Clone the repo:
   git clone https://github.com/NifemiSoneye/IT-events-project
2. Install dependencies:
   npm install
3. Create a .env file:
   VITE_API_URL=http://localhost:3500
4. Start the dev server:
   npm run dev

🔐 Environment Variables
Create a .env file in the root:
VITE_API_URL=http://localhost:3500

☁️ Deployment
Deployed on Vercel. Auto-deploys on push to main.

👤 Author
GitHub: github.com/NifemiSoneye
