import { getServerSession } from "next-auth";
import { verifyJWT } from "./verifyJWT";
import { authOptions } from "./authOptions";

const authenticate = async (req) => {
  try {
    // TRY 1: Try NextAuth session first (for same-origin)
    const session = await getServerSession(authOptions);
    if (session?.user) {
      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          role: session.user.role,
        },
        authMethod: "NextAuth Session",
      };
    }
    // TRY 2: Try JWT token (for cross-origin dashboard)
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      //console.log("❌ No session and no auth header");
      return null;
    }
    //  Note: verifyJWT is async when using jose
    const decoded = await verifyJWT(authHeader);
    if (!decoded) {
      //console.log("❌ Invalid JWT token");
      return null;
    }
    return {
      user: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
      authMethod: "JWT Token",
    };
  } catch (error) {
    console.error("[authenticate] Error:", error);
    return null;
  }
};
export default authenticate;
