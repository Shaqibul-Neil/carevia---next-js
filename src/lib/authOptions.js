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
        const { email, password } = credentials || {};
        if (!email || !password) return null;
        // Call login service
        const user = await loginUser(email, password);
        if (user) {
          console.log(user);
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
     // Sign In Callback - Handle OAuth user creation
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      //Always add data from token for security purposes.
      if (token) {
        session.role = token.role;
      }
      return session;
    },
     // JWT Callback - Add user data to token
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};
