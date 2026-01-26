import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    // Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        // email: { label: "Email", type: "email" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return null;
      },
    }),
  ],
};
