import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "./userRepository";
import { userRegistrationSchema } from "@/lib/formSchema/userSchema";

// ==========================================
// Validate user data
// ==========================================
export const validateUserData = async (payload) => {
  console.log(payload);
  const parsed = userRegistrationSchema.safeParse(payload);
  console.log("parsed---------------------");
  console.log(parsed);
  console.log("parsed---------------------");
  if (!parsed.success) return;
};

// ==========================================
// Register new user
// ==========================================
export const registerUser = async (payload) => {
  //1. Validate
  const validation = await validateUserData(payload);
  //2. Check if user already exists
  const existingUser = await findUserByEmail(payload.email);
  if (existingUser) return { success: false, message: "User already exists" };
  // 3. Hash password
  const encryptedPassword = await bcrypt.hash(payload.password, 12);
  // 4. Create new user object
  const newUser = {
    ...payload,
    email: payload.email.toLowerCase().trim(),
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
  return { success: true, message: "Registration Successful", data: newUser };
};
