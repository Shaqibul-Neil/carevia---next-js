# Carevia Enhancement & Dashboard Implementation Plan

## 1. Industry Standard: Next.js (Marketing) + React (Dashboard)
**Current Architecture:** Public Site (Next.js) + Dashboard (Separate React App).

**Why this is a Great Choice (The SaaS Model):**
You are following the **"Decoupled Architecture"** often used by high-performance SaaS platforms (e.g., Discord, Asana, Trello).
*   **Public Site (Next.js):** Optimized for SEO, fast initial load, and marketing.
*   **Dashboard (React/Vite):** Optimized for heavy interactivity, complex state management, and "app-like" feel without the overhead of Server-Side Rendering (SSR).
*   **Isolation:** If one site goes down, the other remains active.

### **Implementation Strategy: Connecting the Two**
Since they are separate, you need a strategy to link them:
1.  **Shared Authentication (Key Challenge):**
    *   **Best Practice:** Use **JWT stored in HTTPOnly Cookies** on the backend domain. Both apps should communicate with the *same* backend API.
    *   **Flow:** User logins on `carevia.com/login` -> Backend sets cookie -> User redirected to `app.carevia.com` -> Dashboard reads validity from backend.
2.  **Shared Design System:**
    *   Ensure your buttons, colors (Tailwind config), and fonts match exactly so the user doesn't feel like they "left" the website.

---

## 2. User Dashboard (React App)
*Goal: Provide a fast, app-like experience for managing personal care.*

### **Essential Features for React Dashboard**
1.  **"My Care Team" (Smart List):**
    *   Fetches previous bookings.
    *   **Action:** "Re-book" button (One-click booking).
2.  **Health Profile Manager:**
    *   A comprehensive form for medical history, allergies, and emergency contacts.
    *   *Tip:* Use `react-hook-form` for complex validation here.
3.  **Real-Time Status Center:**
    *   Show active booking status: `Pending` -> `Confirmed` -> `Caregiver En Route` -> `In Progress`.
    *   *Tech:* Use **Socket.io** or **Polling** to update this without refreshing.

### **Analytics (For Users)**
*   **Visual Spending Report:** A line chart showing monthly expenses on care.
*   **Care Hours:** "You've secured 40 hours of care this month."

---

## 3. Admin Dashboard (React App)
*Goal: Complete operational oversight.*

### **Advanced Features**
1.  **Service & Pricing Manager:**
    *   CRUD operations for services.
    *   Real-time toggle for service availability.
2.  **Dispute Resolution Panel:**
    *   A dedicated interface to view user complaints and process refunds.
3.  **User & Caregiver CRM:**
    *   Searchable table of all users.
    *   "Ban/Suspend" buttons for policy violators.
    *   **Verification Queue:** List of caregivers pending document approval.

### **Analytics (For Admins)**
*   **Revenue Dashboard:**
    *   *Charts:* Total Income, Payouts Pending, Net Profit.
*   **Retention Metrics:**
    *   *Chart:* How many users booked more than once? (Repeat Customer Rate).
*   **Geo-Map (Optional):**
    *   Heatmap showing which areas (e.g., Dhaka, Chittagong) have the most demand.

---

## 4. Career Page & Job Portal (Public Next.js Site)
*Goal: Attract talent without needing them to log in.*

### **Public Job Board**
1.  **Job Listing Page:** Dynamic list of open roles fetched from API.
2.  **Application Modal/Page:**
    *   Simple form: Name, Contact, Role.
    *   **Resume Upload:** Drag-and-drop zone.
    *   *Tech:* Submit data to backend -> Backend stores file (S3/Cloudinary) -> Saves record to DB.

### **Recruiter Dashboard (Inside Admin React App)**
*   **Applicants Kanban Board:**
    *   Columns: `New` -> `Interviewing` -> `Offer Sent` -> `Hired`.
    *   Drag and drop candidates between columns.

---

## 5. Technology Recommendations (For your Setup)

| Feature | Recommended Tech | Why? |
| :--- | :--- | :--- |
| **Charts** | `Recharts` or `Chart.js` | Great React integration, responsive. |
| **Tables** | `TanStack Table` | Essential for Admin tables with sorting/pagination. |
| **Forms** | `React Hook Form` + `Zod` | Handles complex validation easily. |
| **Data Fetching** | `TanStack Query` (React Query) | **Critical** for separate Dashboards. Caches API data, handles loading states automatically. |
| **Icons** | `React Icons` | Consistent with your Next.js site. |

---

## 6. Development Checklist (Things to Look Out For)
*   [ ] **CORS Issues:** Since your frontend (React) and Backend are likely on different ports/domains during dev, ensure your backend allows requests from `localhost:3000` (Next.js) AND `localhost:5173` (Vite/React).
*   [ ] **Route Protection:** In your React Dashboard, wrap your routes in a `ProtectedRouter` component that checks for the Auth Token before rendering.
*   [ ] **SEO:** Remember, your React Dashboard will effectively have **Zero SEO**. Do not put public content (like Blogs or About Us) inside the Dashboard. Keep those in the Next.js app.


যেহেতু আপনার ডোমেইন দুটি সম্পূর্ণ আলাদা (carevia.com এবং careviadashboard.com), তাই Cookie Sharing সরাসরি কাজ করবে না (ব্রাউজারের সিকিউরিটি পলিসির কারণে)।

এই ক্ষেত্রে "Token Handoff Strategy" ব্যবহার করা একমাত্র এবং বেস্ট উপায়। এটি যেভাবে কাজ করবে:

Cross-Domain SSO Flow (Token Handoff)
১. লগইন (Next.js - carevia.com):

ইউজার carevia.com-এ লগইন করবে।
আপনি তার JWT Token বা Access Token টি localStorage বা Cookies-এ সেভ করছেন।
২. ড্যাশবোর্ডে যাওয়া (Redirect):

যখন ইউজার "Go to Dashboard" বাটনে ক্লিক করবে, আপনি তাকে নিচের লিংকে পাঠাবেন: window.location.href = "https://careviadashboard.com/sso?token=" + userToken;
৩. রিসিভ করা (React - careviadashboard.com):

ড্যাশবোর্ড অ্যাপে /sso নামে একটি বিশেষ রাউট (Page) থাকবে।
এই পেজটি লোড হওয়ার সাথে সাথে URL থেকে token টি রিড করবে।
token টি ভ্যালিড কিনা চেক করে (ঐচ্ছিক) সেটিকে নিজের localStorage বা cookie-তে সেভ করবে।
এরপর ইউজারকে মেইন /dashboard পেজে রিডাইরেক্ট করে দিবে।
পুরো প্রসেসটি ১ সেকেন্ডেরও কম সময় নিবে এবং ইউজারের কাছে মনে হবে সে অটোমেটিক লগইন হয়ে গেছে।