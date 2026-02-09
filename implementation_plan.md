# Carevia Enhancement & Dashboard Implementation Plan

## 1. Industry Standard: Next.js vs. Separate React App
**Question:** "Do people build dashboards with Next.js or a separate React app? What is the 99% scenario?"

**The Verdict:**
In the modern web development landscape (2024-2026), if your main website is built with **Next.js**, the **Industry Standard (90%+) is to build the Dashboard INSIDE the same Next.js application.**

### Why? (The "Same App" Advantage)
1.  **Shared UI Components:** You can reuse your buttons, inputs, form logic, and brand styles without publishing a separate npm package.
2.  **Unified Authentication:** Your `cookies` or `JWT` tokens work seamlessly across the landing page and the dashboard. You don't need to handle complex cross-domain auth (e.g., logging in at `carevia.com` and redirecting to `app.carevia.com`).
3.  **Server Actions & Data Fetching:** Next.js (App Router) allows you to fetch dashboard data directly on the server, offering better security and performance than a client-side (Create React App/Vite) dashboard which exposes API calls in the network tab.
4.  **Deployment:** You deploy ONE project to Vercel/Netlify. No need to manage two pipelines.

### When to use a Separate React App?
*   If your Dashboard is extremely complex (like Figma or Canva-level interactive) and needs fully client-side rendering (CSR).
*   If your team structure disrupts work (e.g., Team A works on Marketing Site, Team B works on App).

---

## 2. User Dashboard (Patient/Family)
*Goal: Provide control over care, payments, and health records.*

### **New Features to Add**
1.  **Care Plan & Health Profile:**
    *   **What:** A digital file for the patient (Age, Blood Group, Allegies, Chronic Conditions, Emergency Contacts).
    *   **Why:** Caregivers need this info before arriving.
2.  **"My Care Team" (Favorites):**
    *   **What:** A list of caregivers they previously booked.
    *   **Action:** "Book Again" button next to their profile.
3.  **Live Visit Tracking (Future Scope):**
    *   **What:** "Caregiver is on the way" status.
4.  **Chat/Inbox:**
    *   **What:** Direct messaging with the assigned caregiver or admin support.

### **Analytics (User Stats)**
*   **Total Care Hours:** "You have received 120 hours of care this year."
*   **Spend Analysis:** A simple chart showing monthly spending on care.
*   **Health Vitals (If applicable):** If caregivers input data (BP, Sugar), show a graph here.

### **Things to Look Out For (Caveats)**
*   **Data Privacy (HIPAA/GDPR):** Health inputs (like "Diabetes") are sensitive. Ensure your database is secure.
*   **Caching:** Do not cache dashboard pages too aggressively. Use `dynamic = 'force-dynamic'` or precise revalidation to show real-time status.

---

## 3. Admin Dashboard (Super Admin)
*Goal: Total operational control and high-level insights.*

### **New Features to Add**
1.  **Service Management:**
    *   Create/Edit/Delete services (e.g., change "Elderly Care" price from $20 to $25).
    *   Toggle "Availability" (Active/Inactive).
2.  **User & Caregiver Management (CRM):**
    *   **Caregivers:** Verify documents (Compliance), Approve/Reject applications, Ban users.
    *   **Users:** View flagged users or disputes.
3.  **Dispute & Refund Center:**
    *   A dedicated view for "Refund Requested" bookings.
    *   Actions: `Approve Refund`, `Reject (with reason)`.

### **Analytics (Admin Stats)**
*   **Financial Health:**
    *   *Total Revenue* (Today, This Week, This Month).
    *   *Revenue by Service Category* (Pie Chart: Nursing vs. Therapy).
*   **Operational Health:**
    *   *Booking Fulfillment Rate:* (Completed Bookings / Total Requests).
    *   *Top Performing Caregivers:* List of caregivers with 5.0 ratings.
*   **User Growth:**
    *   New User Signups vs. Active Users line chart.

### **Things to Look Out For (Caveats)**
*   **Role-Based Access Control (RBAC):** Ensure a "Moderator" cannot delete a "Super Admin". Middleware protection is strictly required.
*   **Pagination:** Do not load "All Bookings" at once. If you have 10,000 bookings, it will crash. Implement Server-Side Pagination.

---

## 4. Caregiver Dashboard (The Missing Link)
*Context: You likely need a 3rd role: The Caregiver.*

### **Features**
*   **My Schedule:** Calendar view of assigned jobs.
*   **Earnings Wallet:** Total earned, Pending clearance.
*   **Job Requests:** Accept/Reject incoming booking offers.

---

## 5. Career Page & Job Portal Implementation
*Goal: A mini "Applicant Tracking System" (ATS).*

### **Page Structure (Public)**
1.  **Hero Section:** "Join the Future of Care".
2.  **Benefits:** Why work with Carevia? (Insurance, Flexible hours).
3.  **Open Positions:** List of cards (e.g., "Senior Nurse", "Physiotherapist").
4.  **Job Details (Dynamic Route):** `/careers/[jobId]`.
5.  **Application Form:**
    *   Inputs: Name, Phone, Experience Years.
    *   **Upload:** Resume/CV (PDF). *Use Cloudinary or AWS S3*.

### **Admin Side (Job Portal)**
*   **Applicants Table:** Columns -> Name, Role, Status, Resume Link.
*   **Status Management:** Dropdown to change status -> `Pending` -> `Interview Scheduled` -> `Hired` -> `Rejected`.

### **Things to Do (Implementation Steps)**
1.  **Database:** Create `JobPosting` and `JobApplication` collections.
2.  **File Upload:** Implement a file upload utility (don't store files in MongoDB directly, store the URL).
3.  **Email Automation (Nice to have):** Send an auto-email when someone applies: "We received your application".

### **Caveats & Risks**
*   **Spam:** People might spam fake applications. Add a CAPTCHA or rate limit.
*   **File Size:** Restrict upload size to 2MB to save bandwidth/storage.

---

## 6. Summary: Database Schema Additions (Proposed)

```json
// HealthProfile (User)
{
  "userId": "ObjectId",
  "bloodGroup": "String",
  "conditions": ["String"],
  "emergencyContact": "String"
}

// JobApplication
{
  "jobId": "ObjectId",
  "name": "String",
  "email": "String",
  "resumeUrl": "String",
  "status": "Enum['Pending', 'Reviewed', 'Hired']",
  "appliedAt": "Date"
}
```
