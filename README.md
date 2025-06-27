# 🛍️ WareWave – MERN Stack E-commerce Platform

**WareWave** is a full-featured E-commerce application built with the **MERN Stack** (MongoDB, Express, React, Node.js). It includes a user-friendly shopping experience and a secure admin dashboard for managing products, users, and orders. The frontend is powered by **React + Redux Toolkit**, while the backend is built with **Node.js + Express**, and data is stored in **MongoDB**.

Live Demo 👉 [https://warewave-hk7j.vercel.app](https://warewave-hk7j-ph2vuhlre-tanujs-projects-8a449376.vercel.app/)

---

## 🚀 Features

### 👤 Customer

- Browse products with filters (category, size, color, etc.)
- View detailed product pages with size/color selection
- Add products to cart
- Secure login/register
- Checkout with payment (or COD)
- Order history

### 🛠️ Admin Dashboard

- Manage products (CRUD)
- Upload product images
- View and manage orders
- View and manage users

### 🌐 Tech Stack

| Tech         | Usage                          |
|--------------|--------------------------------|
| **React.js** | Frontend UI                    |
| **Redux**    | State Management               |
| **Node.js**  | Backend Server                 |
| **Express**  | API Routes                     |
| **MongoDB**  | NoSQL Database                 |
| **Mongoose** | MongoDB ODM                    |
| **Vercel**   | Frontend Deployment            |
| **Vercel** | Backend Deployment         |
| **Axios**    | API Requests                   |
| **JWT**      | Authentication                 |

---

Backend Setup
bash
Copy
Edit
cd backend
npm install
# Create a .env file and add MongoDB URI, JWT secret
npm start
Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
🔐 Environment Variables (.env)
Backend .env should contain:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000
🛒 Screenshots
Home Page	Product Page	Admin Dashboard

🧠 Learnings
Full-stack app development with MERN

Redux Toolkit for scalable state management

Authentication with JWT

Image uploading and management

Deployment on Vercel & backend hosting (Render/Railway)

📌 Future Features
Razorpay / Stripe integration

Wishlist and product reviews

Admin analytics dashboard

🙌 Acknowledgments
Redux Toolkit

Vercel

MongoDB Atlas

📫 Contact
Made with ❤️ by Tanuj Kumar Ukkem
📧 ukkemtanujkumar@gmail.com

