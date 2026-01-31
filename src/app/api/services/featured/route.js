import { ApiResponse } from "@/lib/apiResponse";
import { findFeaturedServices } from "@/modules/services/serviceRepository";

export async function GET(params) {
  try {
    const featuredServices = await findFeaturedServices();
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
