import { ApiResponse } from "@/lib/apiResponse";
import authenticate from "@/lib/authenticate";
import { addMessage, getMessagesForRoom } from "@/modules/chat/chatService";

//POST NEW CHAT MESSAGE
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

//GET CHAT MESSAGES
export async function GET(req) {
  try {
    //Authenticate user and admin
    const auth = await authenticate();
    if (!auth || auth?.user) {
      return ApiResponse.unauthorized("Authentication required");
    }
    //get room id from req obj url sent as search params
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    //security check: if the user really exist in this room
    //admin has access to all rooms
    //user can access room with their own id
    //user id is used as room id
    const user = auth.user;
    if (user.role !== "admin" && !roomId.includes(user.id)) {
      return ApiResponse.forbidden("Access denied");
    }

    //call service
    const result = await getMessagesForRoom(roomId);
    if (result.success) {
      return ApiResponse.success(result.data, "Messages fetched successfully");
    } else {
      return ApiResponse.error(result.error, 400);
    }
  } catch (error) {
    return ApiResponse.error("Failed to fetch messages", 500, error.message);
  }
}

//PATCH CHAT MESSAGES TO CHANGE STATUS
