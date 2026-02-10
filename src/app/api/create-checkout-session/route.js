import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
import { bookingFormSchema } from "@/lib/formSchema";
import { stripe } from "@/lib/stripe";
import { validateWithSchema } from "@/lib/validation";
import { findSingleService } from "@/modules/services/serviceRepository";
import { getServerSession } from "next-auth";

export async function POST(request) {
  try {
    //1. Check authentication
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session) {
      return ApiResponse.unauthorized();
    }

    //2.Get booking data
    const payload = await request.json();
    //Extract serviceId and totalPrice BEFORE validation
    const { serviceId, totalPrice, ...formData } = payload;
    // Validate serviceId and totalPrice manually
    if (!serviceId || typeof serviceId !== "string") {
      return ApiResponse.badRequest("Service ID is required");
    }
    if (!totalPrice || typeof totalPrice !== "number" || totalPrice <= 0) {
      return ApiResponse.badRequest("Invalid total price");
    }

    //3. validate required data
    const validation = validateWithSchema(bookingFormSchema, payload);
    if (!validation.success) {
      return ApiResponse.validationError(validation.errors);
    }
    // Use Validated data
    const {
      bookingDate,
      durationType,
      quantity,
      division,
      district,
      address,
      paymentOption,
      slot,
    } = validation.data;

    //4. Verify service exists & get REAL price from database
    const service = await findSingleService(serviceId);
    if (!service) return ApiResponse.notFound("Service not found");

    // 5. CRITICAL: Calculate price from DATABASE, not from frontend!
    const pricePerUnit =
      durationType === "hours" ? service.price.perHour : service.price.perDay;
    if (!pricePerUnit || pricePerUnit <= 0) {
      return ApiResponse.error("Invalid service pricing");
    }
    // Calculate base price
    let actualTotalPrice = pricePerUnit * quantity;

    // Add extra charge if outside coverage (same as frontend)
    const isOutsideCoverage =
      division &&
      !service.locationCoverage.supportedDivisions.includes(division);

    if (isOutsideCoverage) {
      actualTotalPrice += 500; // Travel fee for outside coverage areas
    }

    // 6. Verify frontend price matches backend calculation
    if (Math.abs(actualTotalPrice - totalPrice) > 0.01) {
      return ApiResponse.badRequest(
        "Price mismatch. Please refresh and try again",
      );
    }

    // 7. Validate duration type matches service
    if (!["hours", "days"].includes(durationType)) {
      return ApiResponse.badRequest("Invalid duration type");
    }

    //8. Validate quantity
    if (quantity < 1 || quantity > 1000) {
      return ApiResponse.badRequest("Invalid quantity");
    }

    //9. Validate payment option
    if (!["half", "full"].includes(paymentOption)) {
      return ApiResponse.badRequest("Invalid payment option");
    }

    //10. Calculate amount (use verified price)
    let amountToPay = actualTotalPrice;
    let dueAmount = 0;
    if (paymentOption === "half") {
      amountToPay = actualTotalPrice / 2;
      dueAmount = actualTotalPrice / 2;
    }

    //6.Create booking data
    const bookingData = {
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      serviceId,
      serviceName: service.serviceName,
      serviceImage: service.image || "",
      bookingDate: new Date(bookingDate).toISOString(),
      slot: slot || "N/A",
      durationType,
      quantity: quantity.toString(), //metadata requirement
      division,
      district,
      address: address || "",
      paymentOption,
      totalPrice: actualTotalPrice.toString(), //backend calculated price
      amountPaid: amountToPay.toString(),
      dueAmount: dueAmount.toString(),
    };

    // 7. Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: Math.round(amountToPay * 100),
            product_data: {
              name: bookingData.serviceName,
              images: bookingData.serviceImage
                ? [bookingData.serviceImage]
                : [],
              description: `${bookingData.durationType === "hours" ? "Hourly" : "Daily"} Services - ${bookingData.quantity} ${bookingData.durationType} ${bookingData.paymentOption === "half" ? `- Due Amount: $${bookingData.dueAmount}` : ""}`,
            },
          },
          quantity: 1,
        },
      ],
      customer_email: session.user.email,
      mode: "payment",
      metadata: bookingData,
      branding_settings: {
        display_name: "Carevia",
        button_color: "#059669",
      },
      success_url: `${process.env.NEXTAUTH_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/booking/${bookingData.serviceId}`,
    });

    // 9. Return checkout URL
    return ApiResponse.success(
      { sessionId: checkoutSession.id, url: checkoutSession.url },
      "Checkout session created successfully",
    );
  } catch (error) {
    return ApiResponse.error(
      error.message || "Failed to create checkout session",
      500,
    );
  }
}
