const { dbConnect, collections } = require("@/lib/dbConnect");

const usersCollection = () => dbConnect(collections.USERS);
const bookingsCollection = () => dbConnect(collections.BOOKINGS);

// Find user by email
export const findUserByEmail = async (email) => {
  return await usersCollection().findOne({ email });
};

// Create new user
export const createUser = async (userData) => {
  const result = await usersCollection().insertOne(userData);
  return result.acknowledged ? { ...userData, _id: result.insertedId } : null;
};

//Update user last login
export const updateUserLastLogin = async (email) => {
  const query = { email };
  return await usersCollection().updateOne(query, {
    $set: { lastLoginAt: new Date().toISOString() },
  });
};

//Specific user update
export const updateUser = async (email, updatedData) => {
  const query = { email };
  return await usersCollection().updateOne(query, {
    $set: { ...updatedData, updatedAt: new Date().toISOString() },
  });
};

//Adding new provider in the provider array
export const addProviderToUser = async (email, provider) => {
  const query = { email };
  return await usersCollection().updateOne(query, {
    $addToSet: { provider: provider },
    $set: { updatedAt: new Date().toISOString() },
  });
};

//=========ADMIN ONLY ROUTES=========

// ==========================================
// Find user based on booking for admin
// ==========================================
export const findUserByBooking = async () => {
  return await bookingsCollection()
    .aggregate([
      { $addFields: { userObjectId: { $toObjectId: "$userId" } } }, //string to object id
      {
        $lookup: {
          from: "users", //in which collection to look for
          localField: "userObjectId", //field of this collection that will be looked in the other collection
          foreignField: "_id", // field of the that other collection
          as: "user", //name of the result
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: "$user._id",
          firstName: "$user.firstName",
          lastName: "$user.lastName",
          email: "$user.email",
          image: "$user.image",
          lastLoginAt: "$user.lastLoginAt",
        },
      },
    ])
    .toArray();
};
