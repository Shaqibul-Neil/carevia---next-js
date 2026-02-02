import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { stripe } from "@/lib/stripe";
import { createBooking } from "@/modules/booking/bookingService";
import { findSingleService } from "@/modules/services/serviceRepository";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    //1. Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return ApiResponse.unauthorized();
    }

    //2.Get booking data
    const payload = await request.json();
    const {
      serviceId,
      bookingDate,
      durationType,
      quantity,
      division,
      district,
      address,
      paymentOption,
      totalPrice,
    } = payload;

    //3. validate required data
    if (
      !serviceId ||
      !bookingDate ||
      !durationType ||
      !quantity ||
      !division ||
      !district ||
      !paymentOption ||
      !totalPrice ||
      !address
    ) {
      return ApiResponse.badRequest("Missing required field");
    }

    //4. Verify service exists
    const service = await findSingleService(serviceId);
    if (!service) return ApiResponse.error("Service not found", 404);

    //5. Calculate amount based on payment option
    let amountToPay = totalPrice;
    let dueAmount = 0;
    if (paymentOption === "half") {
      amountToPay = totalPrice / 2;
      dueAmount = totalPrice / 2;
    }

    //6.Create pending booking
    const bookingData = {
      userId: session.user.id,
      serviceId,
      serviceName: service.serviceName,
      serviceImage: service.image,
      bookingDate: new Date(bookingDate),
      durationType,
      quantity: Number(quantity),
      paymentOption,
      division,
      district,
      address: address || "",
      totalPrice,
      amountToPay,
      dueAmount: paymentOption === "half" ? dueAmount : 0,
    };
    const bookingResult = await createBooking(bookingData);
    if (!bookingResult.success) {
      return ApiResponse.badRequest(
        bookingResult.message || "Failed to create booking",
        bookingResult.errors,
      );
    }
    const bookingId = bookingResult.bookingId;

    // 7. Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bookingData.serviceName,
              images: bookingData.serviceImage
                ? [bookingData.serviceImage]
                : [],
              description: `${bookingData.durationType === "hour" ? "Hourly" : "Daily"} Services - ${bookingData.quantity} ${bookingData.durationType} - Due: $${bookingData.paymentOption === "half" && bookingData.dueAmount}`,
            },
            unit_amount: Math.round(bookingData.amountToPay * 100),
          },

          quantity: 1,
        },
      ],
      client_reference_id: bookingId,
      customer_email: session.user.email,
      mode: "payment",
      metadata: {
        bookingId: bookingId,
        userId: session.user.id,
        serviceId: serviceId,
        paymentOption: paymentOption,
        totalPrice: totalPrice.toString(),
        dueAmount: dueAmount.toString(),
      },
      success_url: `${process.env.NEXTAUTH_URL}/payment-success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/booking/${bookingData.serviceId}`,
    });
    console.log("checkoutSession", checkoutSession);
    // 8. Update booking with Stripe session ID
    // 9. Return checkout URL
    return ApiResponse.success(
      { url: checkoutSession.url },
      "Checkout session created successfully",
    );
  } catch (error) {
    console.error("[create-checkout-session] Error:", error.message);
    return ApiResponse.error(
      error.message || "Failed to create checkout session",
      500,
    );
  }
}
