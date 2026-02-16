# Carevia Enhancement & Dashboard Implementation Plan

## 1. Industry Standard: Next.js (Marketing) + React (Dashboard)

**Current Architecture:** Public Site (Next.js) + Dashboard (Separate React App).
\*\* Doctor appointement selector after banner section and new doctor and caregiver page

**Why this is a Great Choice (The SaaS Model):**
You are following the **"Decoupled Architecture"** often used by high-performance SaaS platforms (e.g., Discord, Asana, Trello).

- **Public Site (Next.js):** Optimized for SEO, fast initial load, and marketing.
- **Dashboard (React/Vite):** Optimized for heavy interactivity, complex state management, and "app-like" feel without the overhead of Server-Side Rendering (SSR).
- **Isolation:** If one site goes down, the other remains active.

### **Implementation Strategy: Connecting the Two**

Since they are separate, you need a strategy to link them:

1.  **Shared Authentication (Key Challenge):**
    - **Best Practice:** Use **JWT stored in HTTPOnly Cookies** on the backend domain. Both apps should communicate with the _same_ backend API.
    - **Flow:** User logins on `carevia.com/login` -> Backend sets cookie -> User redirected to `app.carevia.com` -> Dashboard reads validity from backend.
2.  **Shared Design System:**
    - Ensure your buttons, colors (Tailwind config), and fonts match exactly so the user doesn't feel like they "left" the website.

---

## 2. User Dashboard (React App)

_Goal: Provide a fast, app-like experience for managing personal care._

### **Essential Features for React Dashboard**

1.  **"My Care Team" (Smart List):**
    - Fetches previous bookings.
    - **Action:** "Re-book" button (One-click booking).
2.  **Health Profile Manager:**
    - A comprehensive form for medical history, allergies, and emergency contacts.
    - _Tip:_ Use `react-hook-form` for complex validation here.
3.  **Real-Time Status Center:**
    - Show active booking status: `Pending` -> `Confirmed` -> `Caregiver En Route` -> `In Progress`.
    - _Tech:_ Use **Socket.io** or **Polling** to update this without refreshing.

### **Analytics (For Users)**

- **Visual Spending Report:** A line chart showing monthly expenses on care.
- **Care Hours:** "You've secured 40 hours of care this month."

---

## 3. Admin Dashboard (React App)

_Goal: Complete operational oversight._

### **Advanced Features**

1.  **Service & Pricing Manager:**
    - CRUD operations for services.
    - Real-time toggle for service availability.
2.  **Dispute Resolution Panel:**
    - A dedicated interface to view user complaints and process refunds.
3.  **User & Caregiver CRM:**
    - Searchable table of all users.
    - "Ban/Suspend" buttons for policy violators.
    - **Verification Queue:** List of caregivers pending document approval.

### **Analytics (For Admins)**

- **Revenue Dashboard:**
  - _Charts:_ Total Income, Payouts Pending, Net Profit.
- **Retention Metrics:**
  - _Chart:_ How many users booked more than once? (Repeat Customer Rate).
- **Geo-Map (Optional):**
  - Heatmap showing which areas (e.g., Dhaka, Chittagong) have the most demand.

---

## 4. Career Page & Job Portal (Public Next.js Site)

_Goal: Attract talent without needing them to log in._

### **Public Job Board**

1.  **Job Listing Page:** Dynamic list of open roles fetched from API.
2.  **Application Modal/Page:**
    - Simple form: Name, Contact, Role.
    - **Resume Upload:** Drag-and-drop zone.
    - _Tech:_ Submit data to backend -> Backend stores file (S3/Cloudinary) -> Saves record to DB.

### **Recruiter Dashboard (Inside Admin React App)**

- **Applicants Kanban Board:**
  - Columns: `New` -> `Interviewing` -> `Offer Sent` -> `Hired`.
  - Drag and drop candidates between columns.

---

## 5. Technology Recommendations (For your Setup)

| Feature           | Recommended Tech               | Why?                                                                                         |
| :---------------- | :----------------------------- | :------------------------------------------------------------------------------------------- |
| **Charts**        | `Recharts` or `Chart.js`       | Great React integration, responsive.                                                         |
| **Tables**        | `TanStack Table`               | Essential for Admin tables with sorting/pagination.                                          |
| **Forms**         | `React Hook Form` + `Zod`      | Handles complex validation easily.                                                           |
| **Data Fetching** | `TanStack Query` (React Query) | **Critical** for separate Dashboards. Caches API data, handles loading states automatically. |
| **Icons**         | `React Icons`                  | Consistent with your Next.js site.                                                           |

---

## 6. Development Checklist (Things to Look Out For)

- [ ] **CORS Issues:** Since your frontend (React) and Backend are likely on different ports/domains during dev, ensure your backend allows requests from `localhost:3000` (Next.js) AND `localhost:5173` (Vite/React).
- [ ] **Route Protection:** In your React Dashboard, wrap your routes in a `ProtectedRouter` component that checks for the Auth Token before rendering.
- [ ] **SEO:** Remember, your React Dashboard will effectively have **Zero SEO**. Do not put public content (like Blogs or About Us) inside the Dashboard. Keep those in the Next.js app.

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

Your Task (Assessment)
Task Name: Newsletter Subscription Email Context: আপনার হোমপেজে একটি "Subscribe" সেকশন আছে।

Requirement:

একটি নতুন API Route তৈরি করুন: src/app/api/subscribe/route.js
ফ্রন্টএন্ড থেকে ইউজার যখন ইমেইল দিয়ে সাবমিট করবে, সেই ইমেইলটি রিসিভ করুন।
আমাদের তৈরি করা sendEmail.js ইউটিলিটি ব্যবহার করে ইউজারকে একটি "Welcome Newsletter" ইমেইল পাঠান।
emailTemplates.js-এ একটি নতুন ফাংশন generateWelcomeEmail অ্যাড করুন।
Challenge: এই টাস্কটি করার সময় খেয়াল রাখবেন যেন একই ইমেইলে বারবার সাবস্ক্রাইব করলে এরর হ্যান্ডেল করা হয় (Database check - যদি ডিবি কানেকশন থাকে, না থাকলে দরকার নেই)।

এটা কমপ্লিট করে আমাকে জানাবেন! কোন হেল্প লাগলে বলবেন।

// lib/rateLimit.js
const requestCounts = new Map(); // In-memory store (production এ Redis use করবেন)

export async function rateLimit(identifier, maxRequests = 100, windowMs = 60000) {
const now = Date.now();
const key = identifier; // IP address or user ID

// Get previous requests
const userRequests = requestCounts.get(key) || [];

// Remove old requests (outside time window)
const recentRequests = userRequests.filter(
timestamp => now - timestamp < windowMs
);

// Check if limit exceeded
if (recentRequests.length >= maxRequests) {
return false; // ❌ Rate limit hit
}

// Add current request
recentRequests.push(now);
requestCounts.set(key, recentRequests);

return true; // ✅ Allowed
}

// app/api/login/route.js
export async function POST(req) {
const ip = req.headers.get('x-forwarded-for') || 'unknown';

// ✅ Only 5 login attempts per minute
const allowed = await rateLimit(ip, 5, 60000);
if (!allowed) {
return ApiResponse.error('Too many attempts. Try again later.', 429);
}

// Continue with login...
}

Scenario: Customer complains "আমার payment হয়েছে কিন্তু booking নেই"

❌ Without Audit Log:

- কিছু prove করতে পারবেন না
- Debug করা impossible
- Legal issue হলে evidence নেই

✅ With Audit Log:
2026-02-11 10:30:15 | USER:user123 | ACTION:payment*initiated | AMOUNT:5000
2026-02-11 10:30:45 | STRIPE:webhook | ACTION:payment_confirmed | SESSION:cs*...
2026-02-11 10:30:46 | SYSTEM:booking | ACTION:booking_created | ID:bk_001
↑
এখানে clear proof যে payment এর সাথে সাথে booking হয়েছে

// lib/auditLog.js
import { db } from '@/lib/dbConnect';

export async function logAudit({
userId,
action,
resource,
details,
ipAddress,
userAgent,
}) {
try {
await db.collection('audit_logs').insertOne({
userId,
action, // 'login', 'payment_created', 'user_deleted'
resource, // 'auth', 'payment', 'user'
details, // JSON object with specifics
ipAddress,
userAgent,
timestamp: new Date(),
environment: process.env.NODE_ENV
});
} catch (error) {
console.error('Audit log failed:', error);
// Never block main operation if logging fails
}
}

// app/api/login/route.js
export async function POST(req) {
const { email, password } = await req.json();

// Login successful
const user = await authenticateUser(email, password);

// ✅ Log the login
await logAudit({
userId: user.\_id.toString(),
action: 'user_login',
resource: 'auth',
details: {
email: user.email,
method: 'credentials',
success: true
},
ipAddress: req.headers.get('x-forwarded-for'),
userAgent: req.headers.get('user-agent')
});

return ApiResponse.success({ token, user });
}

// app/api/payment/webhook/route.js
if (event.type === 'checkout.session.completed') {
await createBooking(...);

// ✅ Log payment
await logAudit({
userId: session.metadata.userId,
action: 'payment_completed',
resource: 'payment',
details: {
amount: session.amount_total / 100,
paymentIntent: session.payment_intent,
bookingId: booking.\_id.toString()
},
ipAddress: 'stripe-webhook',
userAgent: 'stripe/webhook'
});
}

3. Token Refresh (Automatic Token Renewal)
   কী এবং কেন?
   Token refresh মানে expire হওয়ার আগে automatic নতুন token issue করা।

Current Problem:
JWT Token Expiry: 7 days

Day 1: User login → Token valid
Day 7: Token expires → User kicked out
→ Must login again → Poor UX

       Access Token: Short-lived (15 minutes)

Refresh Token: Long-lived (7 days)

Minute 1: Access token valid → API works
Minute 15: Access token expired → Use refresh token to get new access token
Minute 16: New access token → API works again

// app/api/login/route.js
export async function POST(req) {
const user = await authenticateUser(email, password);

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

// ✅ Short-lived access token (15 min)
const accessToken = await new SignJWT({
id: user.\_id.toString(),
email: user.email,
role: user.role,
type: 'access' // Mark as access token
})
.setProtectedHeader({ alg: 'HS256' })
.setExpirationTime('15m') // ⏰ 15 minutes
.sign(secret);

// ✅ Long-lived refresh token (7 days)
const refreshToken = await new SignJWT({
id: user.\_id.toString(),
type: 'refresh' // Mark as refresh token
})
.setProtectedHeader({ alg: 'HS256' })
.setExpirationTime('7d') // ⏰ 7 days
.sign(secret);

return ApiResponse.success({
accessToken,
refreshToken,
user
});
}
Step 2: React Dashboard stores both
// AuthProvider.jsx
const login = (accessToken, refreshToken, userInfo) => {
localStorage.setItem('access-token', accessToken);
localStorage.setItem('refresh-token', refreshToken); // ✅ Store refresh
localStorage.setItem('user-info', JSON.stringify(userInfo));

setToken(accessToken);
setUser(userInfo);
};

Step 3: Auto-refresh when access token expires
// hooks/useAxiosSecure.js
useEffect(() => {
const responseInterceptor = axiosSecure.interceptors.response.use(
(response) => response,
async (error) => {
const originalRequest = error.config;

      // ✅ If 401 and not already retried
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // ✅ Try to refresh token
          const refreshToken = localStorage.getItem('refresh-token');
          const res = await axios.post('/api/auth/refresh', { refreshToken });

          if (res.data.success) {
            const newAccessToken = res.data.data.accessToken;

            // Update stored token
            localStorage.setItem('access-token', newAccessToken);
            setToken(newAccessToken);

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axiosSecure(originalRequest);
          }
        } catch (refreshError) {
          // Refresh failed → Logout
          logout();
          navigate('/login');
        }
      }

      return Promise.reject(error);
    }

);

return () => {
axiosSecure.interceptors.response.eject(responseInterceptor);
};
}, [token, logout, navigate, axiosSecure]);

Step 4: Refresh endpoint
// app/api/auth/refresh/route.js
export async function POST(req) {
const { refreshToken } = await req.json();

if (!refreshToken) {
return ApiResponse.unauthorized('Refresh token required');
}

try {
const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
const { payload } = await jwtVerify(refreshToken, secret);

    // ✅ Check it's a refresh token
    if (payload.type !== 'refresh') {
      return ApiResponse.unauthorized('Invalid token type');
    }

    // ✅ Issue new access token
    const newAccessToken = await new SignJWT({
      id: payload.id,
      email: payload.email,
      role: payload.role,
      type: 'access'
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('15m')
      .sign(secret);

    return ApiResponse.success({ accessToken: newAccessToken });

} catch (error) {
return ApiResponse.unauthorized('Invalid or expired refresh token');
}
}
