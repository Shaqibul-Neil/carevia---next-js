import { ApiResponse } from "@/lib/apiResponse";
import { getFeaturedServices } from "@/modules/services/servicesService";

export async function GET(params) {
  try {
    const featuredServices = await getFeaturedServices();
    return ApiResponse.success(
      featuredServices,
      "Featured services fetched successfully",
    );
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch featured services",
      500,
      error.message,
    );
  }
}
