import { ApiResponse } from "@/lib/apiResponse";
import { getAllServices } from "@/modules/services/servicesService";

//get all services
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchTerm = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const division = searchParams.get("division") || "";
    const rating = searchParams.get("rating") || "";
    const priceSort = searchParams.get("priceSort") || "";
    const page = searchParams.get("page") || 1;

    const result = await getAllServices({
      searchTerm,
      category,
      division,
      rating,
      priceSort,
      page,
    });
    const { success, ...rest } = result;
    return ApiResponse.success(rest, "All services fetched successfully");
  } catch (error) {
    return ApiResponse.error(
      "Failed to fetch all services",
      500,
      error.message,
    );
  }
}
