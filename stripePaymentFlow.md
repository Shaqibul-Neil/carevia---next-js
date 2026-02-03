Step 1: User fills booking form
        ↓
Step 2: POST /api/create-checkout-session
        - Validates all data
        - Calculates price server-side
        - Creates Stripe Checkout Session
        - Returns checkout URL
        ↓
Step 3: User redirected to Stripe Checkout
        ↓
Step 4: User completes payment on Stripe
        ↓
Step 5: Stripe redirects to: /payment/success?session_id=xxx
        ↓
Step 6: Payment Success Page loads
        ↓
Step 7: useEffect automatically calls POST /api/payment/confirm
        - Retrieves session from Stripe
        - Verifies payment_status === "paid"
        - Checks for duplicate (prevents double booking)
        - Verifies user authorization
        - Creates booking in database
        - Creates payment record in database
        ↓
Step 8: Success page displays booking details

Complete Webhook Flow


Step 1: User completes payment on Stripe
        ↓
Step 2: Stripe sends webhook to /api/payment/webhook
        ↓
Step 3: Webhook endpoint verifies signature
        ├─ Invalid → Return 400 (reject)
        └─ Valid → Continue
        ↓
Step 4: Extract event type
        ├─ checkout.session.completed → Process
        ├─ payment_intent.succeeded → Log
        └─ payment_intent.payment_failed → Log
        ↓
Step 5: Idempotency check
        ├─ Already processed → Return 200 (success)
        └─ Not processed → Continue
        ↓
Step 6: Create booking in database
        ↓
Step 7: Create payment record
        ↓
Step 8: Return 200 OK to Stripe
        ↓
Step 9: User redirected to success page
        ↓
Step 10: Success page polls /api/payment/verify
        ├─ Not processed yet → Keep polling
        └─ Processed → Display booking details