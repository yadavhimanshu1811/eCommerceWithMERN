MERN E-Commerce Application

A full-stack e-commerce web application built using the MERN stack (MongoDB, Express, React with TypeScript, Node.js).
Includes authentication, product management (CRUD), profile editing, notifications, and loaders, with a clean and responsive UI.

⸻

🚀 Live Demo

Frontend (Vercel): (https://e-commerce-with-mern-kappa.vercel.app/)
Backend (Render): (https://ecommercewithmern-backend.onrender.com)

⸻

🛠️ Tech Stack

Frontend
	•	React + TypeScript
	•	Vite
	•	React Router
	•	Custom Loader Component
	•	Global Notification (Toast) System
	•	CSS Styling
	•	Hosted on Vercel

Backend
	•	Node.js
	•	Express.js
	•	MongoDB (Monstack headless)
	•	Mongoose
	•	JWT Authentication
	•	bcrypt Password Hashing
	•	dotenv for secure environment variables
	•	Hosted on Render

⸻

🔐 Authentication Features
	•	Secure JWT-based login & signup
	•	Password hashing with bcrypt
	•	Protected API routes using middleware
	•	Automatic redirection on token failure

⸻

🛍️ E-Commerce Features

Product Management
	•	Add products
	•	Update existing products
	•	Delete products
	•	Search products by name/company (regex)
	•	List all products on homepage

User Features
	•	User profile page
	•	Update username and name
	•	Logout functionality
	•	Protected routes (Frontend + Backend)

⸻

🎨 UI/UX Features
	•	Global Toast Notification System
	•	Custom Fullscreen + Inline Loader
	•	Clean, minimal design
	•	Fully responsive layout
	•	Smooth UX with debounced search

⸻⸻⸻

Folder Structure:
/frontend
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   ├── context/
  │   ├── App.tsx
  │   └── main.tsx
  ├── public/
  ├── vite.config.ts
  └── package.json

/Backend
  ├── models/
  ├── db/
  ├── routes/
  ├── index.js
  ├── .env
  └── package.json

⸻⸻⸻

Clone the repository
git clone https://github.com/yadavhimanshu1811/eCommerceWithMERN.git
cd eCommerceWithMERN

⸻⸻⸻

Backend setup:
cd Backend
npm install
npm start

Frontend setup:
cd frontend
npm install
npm run dev

⸻⸻⸻

Contributions:
Contributions, issues, and suggestions are welcome!