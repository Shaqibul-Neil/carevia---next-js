import bcrypt from "bcryptjs";
import { createUser, findUserByEmail } from "./userRepository";
import { userRegistrationSchema } from "@/lib/formSchema/userSchema";

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
  //2. Check if user already exists
  const existingUser = await findUserByEmail(data.email.toLowerCase().trim());
  if (existingUser) return { success: false, message: "User already exists" };
  // 3. Hash password
  const encryptedPassword = await bcrypt.hash(data.password, 12);
  // 4. Create new user object
  const newUser = {
    ...data,
    email: data.email.toLowerCase().trim(),
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

// ==========================================
// Login user
// ==========================================

// ==========================================
// Save OAuth user (Google login)
// ==========================================
