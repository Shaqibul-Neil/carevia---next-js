import { ApiResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/authOptions";
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
      date,
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
      !date ||
      !durationType ||
      !quantity ||
      !division ||
      !district ||
      !paymentOption ||
      !totalPrice
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
      date: new Date(date),
      durationType,
      quantity: Number(quantity),
      paymentOption,
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
  } catch (error) {}
}
