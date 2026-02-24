# 🏥 Carevia

### **Real-time Healthcare Service Marketplace**
*A high-performance, decoupled healthcare platform connecting patients with caregivers, featuring low-latency updates and a secure financial layer.*

---

## 🚀 Live Demo & Proof of Concept
- **Main Patient Website:** [carevia-next-js.vercel.app](https://carevia-next-js.vercel.app/)
- **Provider/Admin Dashboard:** [carevia-portal.netlify.app](https://carevia-portal.netlify.app/)
- **Status:** 🛠️ Work in Progress (Development phase)

---

## 🛠️ Tech Stack (The Intentional Choice)

### **Core Infrastructure**
- **Next.js 16 (App Router):** Leveraging server components for SEO and client-side interactivity where needed.
- **MongoDB:** Flexible document schema to handle diverse healthcare service types and booking metadata.
- **Node.js + Express (Socket Server):** Dedicated microservice for real-time WebSocket communication.

### **Security & Payments**
- **NextAuth + JWT:** Hybrid authentication strategy sharing sessions across decoupled applications.
- **Stripe API + Webhooks:** Reliable asynchronous payment processing with idempotency checks.
- **Jose:** Modern, edge-compatible JWT signing and verification.

### **Frontend & UX**
- **Vite + React 19:** Lightweight, high-speed SPA for the provider dashboard.
- **TanStack Query (React Query):** Efficient server-state management with automatic caching and refetching.
- **Framer Motion:** Smooth micro-interactions and transitions for a premium feel.
- **Tailwind CSS + DaisyUI:** Utility-first styling with a consistent healthcare-themed design system.

---

## 🏗️ Architecture Overview

The project follows a **Decoupled Monolith** architecture split into three core modules:

1.  **`carevia` (Main App):** Next.js application handling the patient-facing marketplace, SEO routes, and core API layer.
2.  **`carevia-dashboard` (Portal):** A separate Vite-based SPA for providers and admins, communicating via JWT-secured REST APIs.
3.  **`carevia-socket` (Real-time Hub):** An independent Node.js server managing WebSocket connections for live notifications and eventual chat features.

### **Folder Structure Philosophy**
```text
/carevia                # Next.js Mother App
├── src/app/api         # Layered REST API (Routes -> Repository -> Service)
├── src/components      # Reusable UI components (shadcn-inspired)
└── src/lib             # Shared utilities (DB connection, JWT verify)

/carevia-dashboard      # Vite Provider Portal
├── src/hooks           # Custom TanStack Query hooks (Feature-based)
└── src/pages           # Role-based dashboard views

/carevia-socket         # Socket.io Server
└── index.js            # WebSocket event handlers & HTTP bridge
```

---

## 🔥 Key Engineering Features

- **Decoupled Dual-Auth:** Shared authentication between Next.js (Cookie-based) and Vite (Bearer Token-based) using the same `NEXTAUTH_SECRET`.
- **Reliable Payment Flow:** Stripe Webhooks ensure 100% booking success even if the user closes the browser during payment.
- **Real-time Event Bridge:** Payment completion triggers a server-to-server POST to the Socket server, which then emits a live notification to the Dashboard.
- **Automated Communication:** Integration with **Nodemailer** for instant email receipts and booking confirmations.
- **Performance Optimized:** 
    - Layered backend separation for testability.
    - TanStack Query used in the dashboard for zero-loading state transitions.
    - Image optimization via Next.js `<Image />` component.

---

## 🧠 Technical Challenges & Solutions

### 1. The Webhook Reliability Gap
**Challenge:** Users sometimes close browsers after a Stripe payment but before redirecting back, causing "Paid but no Booking" errors.
**Solution:** Implemented **Stripe Webhooks** with cryptographic signature verification (`stripe.webhooks.constructEvent`). Added **Idempotency checks** using `payment_intent_id` to prevent duplicate bookings during network retries.

### 2. Cross-App Authentication (JWT Sharing)
**Challenge:** Sharing a login session between a Next.js app (Cookies) and a separate Vite app (Headers) on different domains.
**Solution:** Created a hybrid auth layer. The Next.js backend creates a JWT signed with `jose`. The Dashboard stores this in `localStorage` and attaches it via an **Axios Interceptor** (`Authorization: Bearer <token>`). The API then verifies either the Cookie or the Header.

### 3. Real-time Synchronization
**Challenge:** Notifying the Admin dashboard immediately when a patient makes a payment on the main site.
**Solution:** Established a **Server-to-Server bridge**. The Next.js webhook handler sends a POST request to the `carevia-socket` server, which then broadcasts the event to the connected Admin client.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shaqibul-Neil/carevia---next-js.git
   ```

2. **Setup Carevia (Main App):**
   ```bash
   cd carevia
   npm install
   cp .env.example .env
   npm run dev
   ```

3. **Setup Dashboard:**
   ```bash
   cd ../carevia-dashboard
   npm install
   npm run dev
   ```

4. **Setup Socket Server:**
   ```bash
   cd ../carevia-socket
   npm install
   node index.js
   ```

---

## 🔐 Environment Variables

Required variables for the project to function:

```env
# Database & Auth
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Communication
NODEMAILER_USER=
NODEMAILER_PASS=

# Real-time
NEXT_PUBLIC_SOCKET_URL=
```

---

## 📈 Roadmap & Future Improvements
- [ ] **AI-Powered Matching:** Smart caregiver suggestions based on patient history.
- [ ] **Real-time Chat:** Implementing the `carevia-socket` chat logic (currently in progress).
- [ ] **Telehealth Integration:** Video consultation via WebRTC.
- [ ] **Mobile App:** React Native entry point using the same API layer.

---

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for better healthcare accessibility.*
