import { loginUser } from "@/modules/user/userService";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // ==========================================
  // Authentication Providers
  // ==========================================
  providers: [
    // Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials || {};
          // Validate input
          if (!email || !password) {
            throw new Error("Email and Password are required");
          }
          // Call login service
          const user = await loginUser(email, password);
          // If no user found or password mismatch
          if (!user) {
            throw new Error("Invalid email or password");
          }
          // Check if user is active
          if (user.isActive === false) {
            throw new Error("Your account has been deactivated");
          }
          // Return user object for NextAuth (must have id)
          const userData = {
            id: user._id.toString(),
            email: user.email,
            name: user.firstName
              ? `${user.firstName} ${user.lastName || ""}`.trim()
              : user.email,
            role: user.role,
            image: user.image || null,
          };
          return userData;
        } catch (error) {
          console.error("Authorize error:", error.message);
          // Throw error so NextAuth returns it in result.error
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  // ==========================================
  // Session Configuration
  // ==========================================
  session: {
    // which is used to look up the session in the database.
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // ==========================================
  // Custom Pages
  // ==========================================
  // pages: {
  //   signIn: "/login",
  // },

  // ==========================================
  // Callbacks
  // ==========================================
  callbacks: {
    // Sign In Callback - Handle OAuth user creation
    async signIn({ user, account, profile, email, credentials }) {
      // Allow sign in
      return true;
    },
    // Redirect Callback
    async redirect({ url, baseUrl }) {
      // Redirect to home after login
      return baseUrl;
    },
    // Session Callback - Add user data to session
    async session({ session, token, user }) {
      //Always add data from token for security purposes.
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
    // JWT Callback - Add user data to token
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in - add user data to token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
  },
};
