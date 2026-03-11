# 🏎️ SwiftDrive - Premium Car Rental Platform

SwiftDrive is a modern, full-stack car rental application built for a premium user experience. It features a robust car comparison system, visual analytics for owners, and a comprehensive review and wishlist system.

---

## 🏗️ Project Structure

The project is split into two main directories:
- **[rental-ui](./rental-ui)**: The frontend React (Vite) application.
- **[rental-backend](./rental-backend)**: The backend Node.js (Express) application.

---

## ✨ Key Features (Recently Added)

- **Advanced Filtering & Sorting**: Easily find cars by category, fuel type, and price.
- **Car Comparison**: Compare up to 3 cars side-by-side with localized data.
- **Review System**: Star ratings and user feedback for every vehicle.
- **Owner Dashboard**: Interactive charts (Revenue & Bookings) using Recharts.
- **Wishlist**: Quick-save your favorite cars to a dedicated wishlist.
- **Multi-language Support**: Fully integrated i18next for global accessibility.

---

## 🛠️ Technology Stack

| Part | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, Recharts, i18next, Axios |
| **Backend** | Node.js, Express, MongoDB (Mongoose), JWT, Multer (Memory Storage) |
| **Cloud** | ImageKit (Asset Optimization & CDN), MongoDB Atlas |

---

## 🚀 Getting Started

### Backend Setup
1. `cd rental-backend`
2. `npm install`
3. Create a `.env` file with `MONGODB_URI`, `PORT`, `JWT_SECRET`, and ImageKit keys.
4. `npm run server`

### Frontend Setup
1. `cd rental-ui`
2. `npm install`
3. Create a `.env` file with `VITE_BASE_URL` and `VITE_CURRENCY`.
4. `npm run dev`

---

## 🔐 Security & Operations

- **JWT Authentication**: Secure user sessions with role-based access control (Owner/User).
- **Image Optimization**: Images are optimized on-the-fly and served as **WebP** via ImageKit.
- **Vercel Optimized**: Backend is configured for serverless deployment with memory-buffer image handling.

---

*Built with ❤️ for a modern car rental experience.*
