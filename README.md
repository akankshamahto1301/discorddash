Discord Server Admin Dashboard
A responsive, modern dashboard built using Next.js 14, Tailwind CSS, and React to manage a Discord-like community. This project includes sections like member management, role control, and message viewing — all powered by mock data for demonstration.

Features
Dashboard overview with key server stats (members, online users, roles, messages)

Member management with search, filter, sort, and pagination

Role management with editable role names and color-coded badges

Message viewer with mock delete and channel-based filtering

Light and dark mode toggle with persistent theme preference

Fully responsive design for desktop, tablet, and mobile

Tech Stack
Next.js 14 (App Router)

React

Tailwind CSS

Lucide React Icons

TypeScript

React Context API with useReducer

Project Structure
bash
Copy
Edit
src/
├── app/            # App Router, layout, global styles
├── components/     # Navbar, Sidebar, Layout, Pages
├── pages/          # Dashboard, Members, Roles, Messages
├── context/        # Global dashboard state
├── data/           # Mock users, roles, messages
├── utils/          # Utility functions (formatting, styling)
Getting Started
Clone the repository

bash
Copy
Edit
git clone https://github.com/akankshamahto1301/discordDashboard.git
cd discordDashboard
Install dependencies

bash
Copy
Edit
npm install
Start the development server

bash
Copy
Edit
npm run dev
Open http://localhost:3000 in your browser

Mock Data
The app uses mock data stored in:

bash
Copy
Edit
src/data/mockData.ts
You can customize it or replace it with real API calls and backend integration.

Deployment
This project is ready to deploy on platforms like Vercel or Netlify. Just push your repo and connect it to the deployment platform.

License
This project is open source and available for learning or demo purposes. Feel free to use, modify, and build on top of it.

