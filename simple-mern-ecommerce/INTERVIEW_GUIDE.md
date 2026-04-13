# Interview Guide - Simple MERN E-Commerce

## 1) How the project works (step-by-step)

1. User opens the home page and sees products from `GET /api/products`.
2. User can open product details and add items to cart.
3. Cart data is stored in Redux and persisted in `localStorage`.
4. User registers or logs in to receive a JWT token.
5. During checkout, frontend sends order data to `POST /api/orders` with JWT.
6. Backend validates token, creates order, and returns order confirmation.
7. User can view order history from `GET /api/orders/my`.
8. Admin users access `/admin` to create/edit/delete products and view all orders.

## 2) How JWT auth works

1. User sends email/password to `/api/auth/login` (or `/register`).
2. Backend verifies credentials and signs JWT using `JWT_SECRET`.
3. Frontend stores user object + token in `localStorage`.
4. Protected API calls include `Authorization: Bearer <token>`.
5. `protect` middleware verifies JWT and attaches `req.user`.
6. `adminOnly` middleware allows access only when `req.user.isAdmin === true`.

## 3) How Redux flow works

1. Pages dispatch async thunks (example: `fetchProducts`).
2. Thunks call service methods (Axios) under `src/services`.
3. Pending/fulfilled/rejected states update `loading`, `error`, and `data`.
4. Components subscribe with `useSelector` and render based on state.
5. Slices are split by feature: `auth`, `products`, `cart`, `orders`.

## 4) Common interview questions with answers

### Q1: Why this folder structure?
**Answer:** It enforces separation of concerns. Backend uses `routes -> controllers -> models`, and frontend uses `pages/components/redux/services` for modular feature-based code.

### Q2: Why use Redux Toolkit here?
**Answer:** It reduces boilerplate, standardizes async handling with `createAsyncThunk`, and keeps state shape predictable with loading/error/data patterns.

### Q3: How is authorization enforced?
**Answer:** JWT is required for protected routes, and admin routes additionally check `isAdmin` through middleware.

### Q4: How did you simplify payment for interview readiness?
**Answer:** A mock payment flow marks order as paid to keep business flow clear without external gateway complexity.

### Q5: How can this scale?
**Answer:** Add pagination, caching, tests, and domain-specific modules while preserving the current clean layered structure.
