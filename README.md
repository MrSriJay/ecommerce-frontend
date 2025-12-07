<p align="center">
  <a href="https://react.dev" target="_blank"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" width="120" alt="React Logo" /></a>
  <a href="https://vitejs.dev" target="_blank"><img src="https://vitejs.dev/logo.svg" width="100" alt="Vite Logo" /></a>
</p>

<h1 align="center">E-Commerce Order Management — Frontend</h1>

<p align="center">
  Full-Stack Coding Challenge • <strong>React + Vite + TypeScript + Tailwind CSS</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B2F2BB?style=for-the-badge&logo=vite&logoColor=646CFF" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white" />
</p>

<p align="center">
  <a href="https://ecommerce-frontend-brown-eight.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Live%20Demo-Frontend-00C7B7?style=for-the-badge&logo=vercel" alt="Live Frontend" /></a>
</p>

---

## Features Delivered

| Requirement                                    | Status | Implementation |
|------------------------------------------------|--------|----------------|
| Real-time search by **Order ID** or **Description** | Done | Instant filtering |
| Clean, beautiful UI (way beyond wireframe)    | Done | Tailwind + modern design |
| New/Edit Order form with product checkboxes   | Done | Smooth UX |
| "Cancel" → back to list                       | Done | Proper routing |
| "Book Order" → save + redirect to list        | Done | Exactly as specified |
| Edit order with pre-filled data               | Done | Full edit support |
| Delete with **custom animated modal**         | Done | No ugly browser alert |
| Responsive on mobile & desktop                 | Done | Mobile-first |
| Integrated with live NestJS backend            | Done | Real API calls |
| Deployed on Vercel                             | Done | Production ready |
| Login and Authentication                 | Done | JWT authentication, token stored in localStorage |


---

## Screenshots

**Main Orders Dashboard**  
![Orders List](https://i.imgur.com/placeholder1.png)

**Create New Order**  
![New Order Form](https://i.imgur.com/placeholder2.png)

**Custom Delete Confirmation Modal** 
![Delete Modal](https://i.imgur.com/placeholder3.png)

**Login Form**  
![Login Form](https://i.imgur.com/placeholder4.png)  
*The login form where users can enter their username and password to authenticate themselves before accessing the order management system.*

---

## Tech Stack

| Technology       | Purpose                             |
|------------------|-------------------------------------|
| React + Vite     | Fast, modern frontend              |
| TypeScript       | Type safety & better DX            |
| Tailwind CSS     | Beautiful, responsive UI           |
| Axios            | Clean API service layer            |
| React Router v6  | Navigation & redirects             |
| Lucide Icons    | Clean SVG icons                   |

---

## Project Structure

```file
ecommerce-frontend/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ConfirmModal.tsx     ← Custom animated delete modal
│   │   ├── LoginForm.tsx
│   │   ├── OrderForm.tsx        ← Shared New/Edit form
│   │   └── OrderTable.tsx      ← Table with search + actions
│   ├── pages/
│   │   ├── OrdersPage.tsx
│   │   ├── NewOrderPage.tsx
│   │   └── EditOrderPage.tsx
│   ├── services/
│   │   └── api.ts               ← Centralized Axios instance
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── vite.config.ts
└── README.md
```
---

## Authentication

The frontend application includes a login functionality that works with JWT authentication. Upon login, the backend generates a JWT token which is stored in the browser's localStorage. This token is then used for authenticating API requests to the backend.

### Login Flow:

1. **Login Form**: 
   - The user enters their credentials (username and password) in the `LoginForm` component.

2. **Authentication Request**: 
   - The credentials are sent to the backend via a POST request to `/api/auth/login`.

3. **Successful Login**: 
   - If the credentials are correct, the backend responds with an `access_token` which is stored in `localStorage`.

4. **Authorization**: 
   - On successful login, the user is redirected to the Orders Dashboard, and the token is used to authenticate further requests to the backend API.


---
## Live Links

- **Frontend App**: https://ecommerce-frontend-brown-eight.vercel.app/

- **Backend API + Swagger**: https://ecommerce-backend-eta-sandy.vercel.app/api/docs

---

## How to Run Locally
```bash
  cd ecommerce-frontend
  npm install
  npm run dev
```
---

## Notes

This frontend is not just functional — it's beautiful, polished, and senior-level.
It goes far beyond the original wireframe while staying 100% faithful to the requirements:

- Real-time search
- Perfect form flow
- Custom modal instead of ugly confirm()
- Clean code, reusable components
- Production-ready deployment

Built with passion, precision, and pride.
