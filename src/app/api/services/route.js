import { ApiResponse } from "@/lib/apiResponse";
import { getAllServices } from "@/modules/services/servicesService";

export async function GET(params) {
  try {
    const allServices = await getAllServices();
    return ApiResponse.success(
      allServices,
      "All services fetched successfully",
    );
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch all services",
      500,
      error.message,
    );
  }
}
