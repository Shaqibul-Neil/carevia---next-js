/* src/lib/emailTemplate.js */

export const generatePaymentReceiptEmail = (data) => {
  const {
    userName,
    serviceName,
    bookingDate,
    slot,
    trackingId,
    totalPrice,
    amountPaid,
    dueAmount,
    transactionId,
  } = data;

  // Format currency
  const formatCurrency = (amount) => `$${Number(amount).toFixed(2)}`;

  // Format Date
  const formattedDate = new Date(bookingDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isDue = Number(dueAmount) > 0;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Reset & Basics */
    body { margin: 0; padding: 0; background-color: #f4f4f4; font-family: Helvetica, Arial, sans-serif; }
    table { border-collapse: collapse; width: 100%; }
    
    /* Responsive */
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .receipt-box { padding: 10px !important; }
    }
  </style>
</head>
<body style="background-color: #f4f4f4; margin: 0; padding: 20px;">
  
  <!-- Main Container Table -->
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center">
        
        <!-- Email Wrapper -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" class="container" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #22c55e; padding: 30px; color: #ffffff;">
              <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">CAREVIA</h1>
              <p style="margin: 5px 0 0; opacity: 0.9;">Booking Confirmation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <h2 style="font-size: 18px; margin-bottom: 20px; color: #166534;">Hi ${userName},</h2>
              
              <div style="margin-bottom: 30px; color: #555; line-height: 1.6;">
                Thank you for choosing Carevia! We have successfully received your payment.
                <br/>
                <span style="font-size: 12px; color: #64748b;">Transaction ID: #${transactionId}</span>
                <br/><br/>
                One of our professional caregivers has been notified and will be in touch shortly (usually within 2 hours).
              </div>

              <!-- Receipt Box Table -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 25px;">
                <!-- Receipt Header -->
                <tr>
                  <td style="background-color: #f8fafc; padding: 15px 20px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #1e293b; font-size: 13px;">
                    <table width="100%">
                      <tr>
                        <td align="left">Receipt ID:</td>
                        <td align="right">#${trackingId}</td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Service Name -->
                <tr>
                  <td align="center" style="padding: 15px; font-size: 18px; font-weight: 600; color: #0f172a;">
                    Service: ${serviceName}
                  </td>
                </tr>

                <!-- Details -->
                <tr>
                  <td style="padding: 0 20px 5px;">
                    
                    <!-- Date Row -->
                    <table width="100%" style="margin-bottom: 5px;">
                      <tr>
                        <td align="left" style="font-size: 12px; text-transform: uppercase; color: #64748b;">Date</td>
                        <td align="right" style="font-size: 12px; color: #475569;">${formattedDate}</td>
                      </tr>
                    </table>

                    <!-- Slot Row (Conditional) -->
                    ${
                      slot
                        ? `
                    <table width="100%" style="margin-bottom: 5px;">
                      <tr>
                        <td align="left" style="font-size: 12px; text-transform: uppercase; color: #64748b;">Time Slot</td>
                        <td align="right" style="font-size: 12px; color: #475569;">${slot}</td>
                      </tr>
                    </table>`
                        : ""
                    }
                    
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding: 0 20px;">
                    <div style="border-top: 1px solid #e2e8f0; margin: 10px 0;"></div>
                  </td>
                </tr>

                <!-- Pricing Rows -->
                <tr>
                  <td style="padding: 0 20px;">
                    
                    <!-- Total Amount -->
                    <table width="100%" style="margin-bottom: 5px;">
                      <tr>
                        <td align="left" style="font-size: 14px; color: #475569;">Total Amount</td>
                        <td align="right" style="font-size: 14px; color: #475569;">${formatCurrency(totalPrice)}</td>
                      </tr>
                    </table>

                    <!-- Paid Amount -->
                    <table width="100%" style="margin-bottom: 5px;">
                      <tr>
                        <td align="left" style="font-size: 14px; color: #475569;">Amount Paid</td>
                        <td align="right" style="font-size: 14px; color: #475569;">${formatCurrency(amountPaid)}</td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- Total Row -->
                <tr>
                  <td style="background-color: #f0fdf4; padding: 10px 20px; color: #166534; font-weight: bold;">
                    <table width="100%">
                      <tr>
                        <td align="left" style="font-size: 14px;">${isDue ? "Remaining Due" : "Payment Status"}</td>
                        <td align="right" style="font-size: 14px;">${isDue ? formatCurrency(dueAmount) : "Fully Paid ✅"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Due Alert -->
              ${
                isDue
                  ? `
              <div style="background-color: #fff7ed; border: 1px solid #fed7aa; color: #c2410c; padding: 15px; border-radius: 6px; margin-top: 20px; font-size: 14px;">
                <strong>⚠️ Payment Reminder:</strong> You have a due balance of <strong>${formatCurrency(dueAmount)}</strong>. 
                <br/><br/>
                Please clear this due before the service starts.
              </div>
              `
                  : ""
              }

              <!-- Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.DASHBOARD_URL || "#"}/dashboard/bookings" style="display: inline-block; background-color: #22c55e; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Booking Details</a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px; font-size: 12px; color: #94a3b8; background-color: #f8fafc; border-top: 1px solid #e2e8f0;">
              <p style="margin: 5px 0;">Need help? Contact us at support@carevia.com</p>
              <p style="margin: 5px 0;">&copy; ${new Date().getFullYear()} Carevia Services. All rights reserved.</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};
