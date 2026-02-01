import { ApiResponse } from "@/lib/apiResponse";
import { getSingleServiceDetails } from "@/modules/services/servicesService";

export async function GET(params) {
  try {
    console.log(params);
    const serviceDetails = await getSingleServiceDetails(params.slug);
    console.log(serviceDetails);
    return ApiResponse.success(
      serviceDetails,
      "Service details fetched successfully",
    );
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch service details",
      500,
      error.message,
    );
  }
}
