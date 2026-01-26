const { dbConnect, collections } = require("@/lib/dbConnect");

const usersCollection = () => dbConnect(collections.USERS);

// Find user by email
export const findUserByEmail = async (email) => {
  return await usersCollection().findOne({ email });
};

// Create new user
export const createUser = async (userData) => {
  const result = await usersCollection().insertOne(userData);
  return result.acknowledged ? { ...userData, _id: result.insertedId } : null;
};
