# Payment Gateway Solutions for Bangladesh

## 📱 Bangladesh Payment Gateway Options

### 1. SSLCommerz (সবচেয়ে জনপ্রিয়)

- ✅ বাংলাদেশী সব ব্যাংক card support করে
- ✅ bKash, Nagad, Rocket সব MFS support করে
- ✅ International card ও accept করে
- ✅ Stripe এর মতোই API আছে
- ✅ Government approved
- 🌐 **Website:** https://sslcommerz.com

**Supported Payment Methods:**

```javascript
- Visa/Mastercard (Local & International)
- bKash
- Nagad
- Rocket
- Upay
- MCash
- Bank Transfer
- Mobile Banking
```

---

### 2. AamarPay

- ✅ All major MFS (bKash, Nagad, Rocket)
- ✅ Card payments
- ✅ Easy integration
- 🌐 **Website:** https://aamarpay.com

---

### 3. Shurjopay

- ✅ Bank Asia এর payment gateway
- ✅ MFS + Card support
- ✅ Good API documentation
- 🌐 **Website:** https://shurjopay.com.bd

---

### 4. Portwallet

- ✅ bKash, Nagad integration
- ✅ Card payment
- 🌐 **Website:** https://portwallet.com

---

### 5. Bkash Merchant API (Direct)

- ✅ শুধু bKash payment
- ✅ Most popular in BD
- ✅ Direct integration
- 🌐 **Website:** https://developer.bka.sh

---

## 🎨 UI Design - Multiple Payment Options

### Option 1: Payment Method Selection (Recommended)

```jsx
// BookingForm.jsx

const [paymentMethod, setPaymentMethod] = useState("card"); // card, bkash, nagad, rocket

// In your form:
<div className="space-y-4">
  <h3 className="font-semibold">Select Payment Method</h3>

  {/* Payment Method Tabs */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    <button
      type="button"
      onClick={() => setPaymentMethod("card")}
      className={`p-4 border-2 rounded-xs ${
        paymentMethod === "card"
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-200"
      }`}
    >
      <CreditCard className="mx-auto mb-2" />
      <span>Card Payment</span>
      <p className="text-xs text-gray-500">Visa/Mastercard</p>
    </button>

    <button
      type="button"
      onClick={() => setPaymentMethod("bkash")}
      className={`p-4 border-2 rounded-xs ${
        paymentMethod === "bkash"
          ? "border-pink-500 bg-pink-50"
          : "border-gray-200"
      }`}
    >
      <img src="/bkash-logo.png" className="h-8 mx-auto mb-2" />
      <span>bKash</span>
    </button>

    <button
      type="button"
      onClick={() => setPaymentMethod("nagad")}
      className={`p-4 border-2 rounded-xs ${
        paymentMethod === "nagad"
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200"
      }`}
    >
      <img src="/nagad-logo.png" className="h-8 mx-auto mb-2" />
      <span>Nagad</span>
    </button>

    <button
      type="button"
      onClick={() => setPaymentMethod("rocket")}
      className={`p-4 border-2 rounded-xs ${
        paymentMethod === "rocket"
          ? "border-purple-500 bg-purple-50"
          : "border-gray-200"
      }`}
    >
      <img src="/rocket-logo.png" className="h-8 mx-auto mb-2" />
      <span>Rocket</span>
    </button>
  </div>

  {/* Single Submit Button */}
  <button
    type="submit"
    className="w-full py-3 bg-emerald-600 text-white rounded-xs"
  >
    {paymentMethod === "card" && "Pay with Card"}
    {paymentMethod === "bkash" && "Pay with bKash"}
    {paymentMethod === "nagad" && "Pay with Nagad"}
    {paymentMethod === "rocket" && "Pay with Rocket"}
  </button>
</div>;
```

---

### Option 2: Separate Payment Buttons

```jsx
<div className="space-y-3">
  <h3 className="font-semibold">Choose Payment Method</h3>

  {/* Card Payment */}
  <button
    type="button"
    onClick={() => handlePayment("card")}
    className="w-full p-4 border-2 border-emerald-500 rounded-xs flex items-center justify-between hover:bg-emerald-50"
  >
    <div className="flex items-center gap-3">
      <CreditCard className="text-emerald-600" />
      <div className="text-left">
        <p className="font-semibold">Card Payment</p>
        <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
      </div>
    </div>
    <ArrowRight />
  </button>

  {/* bKash */}
  <button
    type="button"
    onClick={() => handlePayment("bkash")}
    className="w-full p-4 border-2 border-pink-500 rounded-xs flex items-center justify-between hover:bg-pink-50"
  >
    <div className="flex items-center gap-3">
      <img src="/bkash-logo.png" className="h-8" />
      <div className="text-left">
        <p className="font-semibold">bKash</p>
        <p className="text-xs text-gray-500">Mobile Payment</p>
      </div>
    </div>
    <ArrowRight />
  </button>

  {/* Nagad */}
  <button
    type="button"
    onClick={() => handlePayment("nagad")}
    className="w-full p-4 border-2 border-orange-500 rounded-xs flex items-center justify-between hover:bg-orange-50"
  >
    <div className="flex items-center gap-3">
      <img src="/nagad-logo.png" className="h-8" />
      <div className="text-left">
        <p className="font-semibold">Nagad</p>
        <p className="text-xs text-gray-500">Mobile Payment</p>
      </div>
    </div>
    <ArrowRight />
  </button>
</div>
```

---

## 🔧 Backend Implementation

### Using SSLCommerz (Recommended)

**Installation:**

```bash
npm install sslcommerz-lts
```

**Configuration:**

```javascript
// src/lib/sslcommerz.js
import SSLCommerzPayment from "sslcommerz-lts";

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD;
const is_live = false; // true for production

export const sslcommerz = new SSLCommerzPayment(
  store_id,
  store_passwd,
  is_live,
);
```

**API Route:**

```javascript
// src/app/api/create-payment-session/route.js
import { sslcommerz } from "@/lib/sslcommerz";

export async function POST(request) {
  const { paymentMethod, bookingData, totalPrice } = await request.json();

  const data = {
    total_amount: totalPrice,
    currency: "BDT",
    tran_id: `TXN_${Date.now()}`, // unique transaction id
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
    fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/fail`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
    ipn_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/ipn`,

    // Customer info
    cus_name: session.user.name,
    cus_email: session.user.email,
    cus_phone: bookingData.phone,
    cus_add1: bookingData.address,
    cus_city: bookingData.district,
    cus_country: "Bangladesh",

    // Product info
    product_name: bookingData.serviceName,
    product_category: "Service",
    product_profile: "general",

    // Shipping info (same as customer)
    shipping_method: "NO",
  };

  try {
    const apiResponse = await sslcommerz.init(data);

    if (apiResponse.status === "SUCCESS") {
      return Response.json({
        success: true,
        url: apiResponse.GatewayPageURL, // Redirect user here
      });
    }
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
```

---

## 💳 Stripe in Bangladesh

### Current Status:

- ❌ Stripe **directly** Bangladesh support করে না
- ❌ Bangladeshi bank account দিয়ে Stripe account খোলা যায় না
- ⚠️ কিছু workaround আছে (not recommended):
  - Foreign company registration
  - Payoneer/Wise virtual account
  - Third-party resellers

### Why Not Use Stripe in BD:

1. ❌ Against Stripe ToS
2. ❌ Account ban হতে পারে
3. ❌ Fund hold হতে পারে
4. ❌ Legal issues

---

## ✅ Recommended Solution for Bangladesh

### Best Approach:

**Dual Gateway System**

```javascript
// For International Customers:
- Use Stripe (Card payments)

// For Bangladesh Customers:
- Use SSLCommerz (Card + MFS)
  OR
- Use bKash Merchant API (bKash only)
  + Nagad Merchant API (Nagad only)
```

### Implementation:

```jsx
// BookingForm.jsx
const [customerLocation, setCustomerLocation] = useState("BD"); // BD or INTL

const handlePayment = async (paymentMethod) => {
  const endpoint =
    customerLocation === "BD"
      ? "/api/create-sslcommerz-session" // SSLCommerz
      : "/api/create-stripe-session"; // Stripe

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({
      paymentMethod,
      bookingData,
      totalPrice,
    }),
  });

  const data = await response.json();
  window.location.href = data.url; // Redirect to payment gateway
};
```

---

## 📊 Comparison

| Feature               | SSLCommerz | Stripe       | bKash Direct  |
| --------------------- | ---------- | ------------ | ------------- |
| **BD Support**        | ✅ Yes     | ❌ No        | ✅ Yes        |
| **MFS (bKash/Nagad)** | ✅ Yes     | ❌ No        | ✅ bKash only |
| **Card Payment**      | ✅ Yes     | ✅ Yes       | ❌ No         |
| **International**     | ✅ Yes     | ✅ Yes       | ❌ No         |
| **Setup Difficulty**  | Easy       | Easy         | Medium        |
| **Transaction Fee**   | 2-3%       | 2.9% + $0.30 | 1.5%          |
| **Settlement Time**   | T+2 days   | 7 days       | T+1 day       |

---

## 🎯 Recommendations

### For Production (Bangladesh):

```
Primary: SSLCommerz (All payment methods)
Backup: Direct bKash API (Most popular)
```

### For Learning/Portfolio:

```
Keep Stripe (Shows international standard)
+ Add SSLCommerz (Shows BD market knowledge)
```

---

## 📝 Summary

### Key Questions & Answers:

**Q1: Stripe + bKash দুইটা button রাখবো?**

- ✅ হ্যাঁ, payment method selection UI দিন
- ✅ User choose করবে কোনটা দিয়ে pay করবে

**Q2: BD তে Stripe allowed না?**

- ❌ No, directly না
- ✅ Use **SSLCommerz** instead (same features + MFS)

**Q3: International + BD both support করে এমন কিছু?**

- ✅ **SSLCommerz** - Best option
- ✅ International card + BD MFS দুইটাই support করে

---

## 🚀 Next Steps

1. SSLCommerz account create করুন
2. Sandbox API credentials নিন
3. Payment method selection UI add করুন
4. SSLCommerz integration করুন

---

## 📚 Resources

- [SSLCommerz Documentation](https://developer.sslcommerz.com/)
- [bKash Merchant API](https://developer.bka.sh/)
- [Nagad Developer Portal](https://developer.nagad.com.bd/)
- [AamarPay Integration Guide](https://aamarpay.readme.io/)
