const { dbConnect, collections } = require("@/lib/dbConnect");

const messageCollection = () => dbConnect(collections.MESSAGES);

//Add chat to the database
export const createMessage = async (messageData) => {
  // Add server-side timestamp for accurate sorting
  const startTime = Date.now();
  const withTimeStamp = { ...messageData, createdAt: startTime };
  return await messageCollection().insertOne(withTimeStamp);
};

//Get chat by room id (Sorted!)
export const messagesByRoomId = async (id) => {
  return await messageCollection()
    .find({ roomId: id })
    .sort({ createdAt: 1 })
    .toArray();
};

//Mark all unread messages from OTHERS as read for room
export const markMessagesAsRead = async (roomId, userId) => {
  // Update all messages in this room WHERE sender is NOT me AND status is 'unread'
  const filter = {
    roomId: roomId,
    senderId: { $ne: userId }, //not equal to my user id
    status: "unread",
  };
  const update = {
    $set: { status: "read" },
  };

  return await messageCollection().updateMany(filter, update);
};
