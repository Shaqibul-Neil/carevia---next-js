import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";
import { addMessage } from "@/modules/chat/chatService";

export async function POST(req) {
  try {
    const auth = await authenticate(req);
    if (!auth || !auth.user) {
      return ApiResponse.unauthorized("Authentication required");
    }
    const { user } = auth;
    const body = await req.json();
    const messageData = {
      ...body,
      senderId: user.id,
    };
    const result = await addMessage(messageData);
    if (result.success) {
      return ApiResponse.success(result.data, "Message sent successfully");
    } else {
      return ApiResponse.error(result.error, 400);
    }
  } catch (error) {
    return ApiResponse.error("Internal Server Error", 500);
  }
}
