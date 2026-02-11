import { jwtVerify } from "jose";

export const verifyJWT = async (token) => {
  try {
    if (!token) {
      //console.log("No token Provided");
      return null;
    }

    //Remove Bearer
    const cleanToken = token.startsWith("Bearer ")
      ? token.slice(7).trim()
      : token.trim();

    //validate token format
    if (!cleanToken || cleanToken.split(".").length !== 3) {
      //console.error("❌ Invalid token format");
      return null;
    }

    //convert secret
    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    //verify and decode jwt
    const { payload } = await jwtVerify(cleanToken, secret);
    // console.log("✅ JWT verified successfully:", payload, payload.email);
    return { id: payload.id, email: payload.email, role: payload.role };
  } catch (error) {
    if (error.code === "ERR_JWT_EXPIRED") {
      console.error("❌ JWT expired");
    } else if (error.code === "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      console.error("❌ Invalid JWT signature");
    } else {
      console.error("❌ JWT verification error:", error.message);
    }
    return null;
  }
};
