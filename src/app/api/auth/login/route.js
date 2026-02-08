import { ApiResponse } from "@/lib/apiResponse";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { findUserByEmail } from "@/modules/user/userRepository";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    //1.find the user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return ApiResponse.notFound("User not found. Please create an account");
    }
    //2.check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return ApiResponse.unauthorized("Invalid credentials. Please try again");
    }
    //3.create token using NexAuth secret
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);
    const alg = "HS256";

    const token = await new jose.SignJWT({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(secret);

    //4.Success response
    const responseData = {
      token,
      user: { name: user.name, email: user.email, role: user.role },
    };
    return ApiResponse.success(responseData, "Successfully logged in");
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return ApiResponse.error(
      "Something went wrong during login",
      500,
      error.message,
    );
  }
}
