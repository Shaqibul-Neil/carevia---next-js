import { ApiResponse } from "@/lib/apiResponse";
import { registerUser } from "@/modules/user/userService";

// POST /api/users - User Registration
export async function POST(request) {
  try {
    //parse request body
    const body = await request.json();
    //call service
    const result = await registerUser(body);
    //handle response
    if (!result.success) {
      //validation error
      if (result.errors) return ApiResponse.validationError(result.errors);
      //other error
      return ApiResponse.error(result.message, 400);
    }
    //success response
    return ApiResponse.created(result.data, result.message);
  } catch (error) {
    console.error("POST /api/users error:", error);
    return ApiResponse.error("Internal server error", 500);
  }
}
