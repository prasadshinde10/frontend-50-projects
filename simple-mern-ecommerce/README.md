# Simple MERN E-Commerce

A clean, interview-friendly full-stack e-commerce app built with MongoDB, Express, React (Vite), and Redux Toolkit.

## Features

- JWT authentication (register/login)
- Product listing and product details
- Cart management with local persistence
- Checkout with simple mock payment
- Order placement and user order history
- Admin dashboard for product CRUD and all-order view

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **Frontend:** React (Vite), Redux Toolkit, React Router, Axios
- **State Management:** Redux slices + `createAsyncThunk`

## Folder Structure

```text
simple-mern-ecommerce/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  frontend/
    src/
      components/
      pages/
      redux/
      services/
```

## Run Locally

### 1) Backend

```bash
cd /home/runner/work/frontend-50-projects/frontend-50-projects/simple-mern-ecommerce/backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend

```bash
cd /home/runner/work/frontend-50-projects/frontend-50-projects/simple-mern-ecommerce/frontend
cp .env.example .env
npm install
npm run dev
```

## Environment Variables

### Backend (`backend/.env`)

- `PORT=5000`
- `MONGO_URI=<your_mongodb_connection_string>`
- `JWT_SECRET=<your_secret>`
- `FRONTEND_URL=http://localhost:5173`

### Frontend (`frontend/.env`)

- `VITE_API_BASE_URL=http://localhost:5000/api`

## Future Improvements

- Add product categories and search filters
- Add pagination and image upload
- Add real Stripe payment integration
- Add automated tests (unit + integration)
- Add role-based admin analytics
