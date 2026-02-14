import { success } from "zod";
import {
  createMessage,
  markMessagesAsRead,
  messagesByRoomId,
} from "./chatRepository";

//Add Messages
export const addMessage = async (messageData) => {
  try {
    if (messageData.text && messageData.roomId) {
      const message = await createMessage(messageData);
      return {
        success: true,
        data: { ...messageData, _id: message.insertedId.toString() },
      };
    } else {
      return { success: false, error: "Validation failed" };
    }
  } catch (error) {
    console.error("[create message] Error:", error.message);
    return {
      success: false,
      error: error.message || "Failed to create message",
      messages: [],
    };
  }
};

//  Get Messages for a Room
export const getMessagesForRoom = async (roomId) => {
  try {
    if (!roomId) return { success: false, error: "Invalid Request" };
    const messages = await messagesByRoomId(roomId);
    return { success: true, data: messages };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to fetch messages",
    };
  }
};

//  Mark Messages as Read
export const markAsRead = async (roomId, userId) => {
  try {
    if (!roomId || !userId) return { success: false, error: "Invalid Request" };
    const messages = await markMessagesAsRead(roomId, userId);
    return { success: true, data: messages };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Failed to update messages",
    };
  }
};
