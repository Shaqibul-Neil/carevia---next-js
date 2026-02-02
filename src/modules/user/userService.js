import bcrypt from "bcryptjs";
import {
  addProviderToUser,
  createUser,
  findUserByEmail,
  updateUser,
  updateUserLastLogin,
} from "./userRepository";
import { userRegistrationSchema } from "@/lib/formSchema";

// ==========================================
// Validate user data
// ==========================================
export const validateUserData = async (payload) => {
  const parsed = userRegistrationSchema.safeParse(payload);

  if (!parsed.success) {
    // Format errors for frontend
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));

    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }
  return { success: true, data: parsed.data };
};

// ==========================================
// Register new user
// ==========================================
export const registerUser = async (payload) => {
  //1. Validate
  const validation = await validateUserData(payload);
  if (!validation.success) return validation;
  const data = validation.data;
  const email = data.email.toLowerCase().trim();

  // 2. Hash password
  const encryptedPassword = await bcrypt.hash(data.password, 12);

  //3. Check if user already exists
  const existingUser = await findUserByEmail(data.email.toLowerCase().trim());

  if (existingUser) {
    //if provider array includes Credentials then
    if (existingUser.provider.includes("Credentials"))
      return { success: false, message: "User already exists" };
    //if provider array doesn't include Credentials but includes other providers then link Credentials to existing user
    const updatedData = {
      password: encryptedPassword,
      firstName: existingUser.firstName || data.firstName,
      lastName: existingUser.lastName || data.lastName,
      image: existingUser.image || data.image,
    };
    //update the user information
    await updateUser(email, updatedData);
    //add Credentials to provider array
    await addProviderToUser(email, "Credentials");
    return {
      success: true,
      message: "Account linked with Credentials successfully",
      data: {
        _id: existingUser._id.toString(),
        email: existingUser.email,
        role: existingUser.role,
      },
    };
  }

  // 4.If it is a new user completely Create new user object
  const newUser = {
    ...data,
    provider: ["Credentials"],
    email: email,
    password: encryptedPassword,
    role: "user",
    isVerified: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString(),
  };

  // 5. Save to database
  const createdUser = await createUser(newUser);
  if (!createdUser) return { success: false, message: "Failed to create user" };

  //6. Remove Password
  const { password, ...safeUser } = createdUser;
  return {
    success: true,
    message: "Registration Successful",
    data: { ...safeUser, _id: safeUser._id.toString() },
  };
};

// ==========================================
// Login user
// ==========================================
export const loginUser = async (email, password) => {
  if (!email || !password) return null;

  // 1. Find user
  const user = await findUserByEmail(email.toLowerCase().trim());
  if (!user) return null;

  //2. Match password
  const isPasswordOk = await bcrypt.compare(password, user.password);
  if (!isPasswordOk) return null;

  // 3. Update last login
  await updateUserLastLogin(user.email.toLowerCase().trim());

  // 4. Return user without password
  const { password: _, ...safeUser } = user;
  return safeUser;
};

// ==========================================
// Save OAuth user (Google login)
// ==========================================
export const saveOAuthUser = async (user, account) => {
  try {
    //console.log( account);
    if (!user || !user.email) return false;
    const email = user.email.toLowerCase().trim();
    // 1. Check if user exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      //if provider list doesn't include provider then add it
      if (!existingUser.provider.includes(account.provider)) {
        //add provider to user
        await addProviderToUser(email, account.provider);
      }
      //update user last login information if user exists and then return true
      await updateUserLastLogin(email);
      return true;
    }
    //2. if completely new user then create user
    const newUser = {
      firstName: user.name?.split(" ")[0] || "",
      lastName: user.name?.split(" ").slice(1).join(" ") || "",
      email: email,
      image: user.image,
      provider: [account.provider],
      role: "user",
      isVerified: true,
      isActive: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    const result = await createUser(newUser);
    return result ? true : false;
  } catch (error) {
    return false;
  }
};
