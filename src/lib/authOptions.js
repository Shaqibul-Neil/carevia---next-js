import { findUserByEmail } from "@/modules/user/userRepository";
import { loginUser, saveOAuthUser } from "@/modules/user/userService";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
          //console.error("Authorize error:", error.message);
          // Throw error so NextAuth returns it in result.error
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
      if (account.provider === "google") {
        // Save OAuth user (Google)
        await saveOAuthUser(user, account);
      }
      return true;
    },
    // Redirect Callback
    // async redirect({ url, baseUrl }) {
    //   // Redirect to home after login
    //   return baseUrl;
    // },
    // Session Callback - Add user data to session
    async session({ session, token, user }) {
      //Always add data from token for security purposes.
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.provider = token.provider;
      }
      return session;
    },
    // JWT Callback - Add user data to token
    async jwt({ token, user, account, profile, isNewUser }) {
      // Initial sign in - add user data to token from database
      if (user) {
        const dbUser = await findUserByEmail(user.email.toLowerCase());
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.email = dbUser.email;
          token.name = dbUser.firstName
            ? `${dbUser.firstName} ${dbUser.lastName || ""}`.trim()
            : dbUser.email;
          token.role = dbUser.role;
          token.image = dbUser.image;
          token.provider = dbUser.provider;
        }
      }
      return token;
    },
  },
};

/**Why take user from db in jwt callback? */
/*
In the JWT callback, we fetch the user from the database using `dbConnect(collections.USERS).findOne({ email: user.email.toLowerCase() })`.

Here's why we do this:

1. **Security**: The `user` object passed to the JWT callback comes from the OAuth provider (e.g., Google) or the Credentials provider. It may contain limited information and might not be fully trusted.

2. **Complete User Data**: The database contains the complete user profile, including:
   - `_id`: The unique identifier in your MongoDB database
   - `role`: The user's role (admin, provider, user)
   - `provider`: The authentication provider(s) used
   - `image`: The user's profile image URL
   - Other profile information

3. **Consistency**: By fetching from the database, we ensure that the session token contains the same user data that's stored in your database, providing consistency across your application.

4. **Authorization**: The `role` and `provider` information from the database is crucial for authorization decisions throughout your application. Without it, you wouldn't be able to determine if a user is an admin, provider, or regular user.

In summary, fetching the user from the database in the JWT callback ensures that your session token contains complete, consistent, and trusted user information for proper authorization and application functionality.
*/

/**The Overall Logic (Step-by-Step Flow)
Unique Identity: The system ensures one email belongs to only one user. No matter if you use Google or a Password, you will have only one account.
Automatic Linking: If a user first logs in with Google and later tries to register with a Password (or vice-versa), the system "Links" them instead of creating a second user.
Authentication Gatekeeper: We use 
authOptions.js
 to manage the login flow and ensure the database is always updated before the user enters the app.
File-wise Breakdown
1. User Repository (
userRepository.js
)
What it does: This is the "Database Manager." It doesn't know about business logic; it only performs DB actions.
Key Functions:
updateUser
: Updates existing user info (like adding a password to a Google user).
addProviderToUser
: Uses $addToSet to add "google" or "Credentials" to the user's provider array without duplicates.
2. User Service (
userService.js
)
What it does: This is the "Brain" of the operation where business logic lives.
Key Functions:
registerUser
: When someone signs up with a password:
It checks if the email exists. If the user only has "google" provider, it Updates that user with a password and adds "Credentials" to their list.
saveOAuthUser
: This is specifically for Google login:
When a user clicks "Google Sign-in," this function checks if they exist. If yes, it just adds "google" to their provider list. If no, it creates a brand new user profile.
3. Auth Options (
authOptions.js
)
What it does: This is the "Controller" for NextAuth. It coordinates between the Providers and our Services.
Key Callbacks:
signIn
: This runs first. For Google users, it calls 
saveOAuthUser
. This ensures that before the login is complete, the user is already saved/updated in the database.
jwt
: This runs second. It takes the user's email, goes to the database, and fetches the Full Profile (Role, Image, Provider list). It stores this info inside an encrypted "Token."
session
: This runs third. it takes the info from the "Token" and passes it to the Frontend so you can use it in your React components (like session.user.role).
Why did we do it this way? (Reasoning)
Single Source of Truth: By fetching the user from the database in the 
jwt
 callback, we ensure that if an Admin changes a user's role, the user gets the update immediately upon their next login.
Clean Data: Using a provider: [] array is much better than having multiple rows for the same person. It keeps your database clean and easy to manage.
Industry Standard Security: We only fetch data from the DB during the "Initial Login" (the if (user) check in the JWT). This makes the app fast and secure because we don't hit the database on every single page refresh.
How they interact (The Sequence)
User Clicks Google Login ⮕ authOptions (signIn) ⮕ userService (saveOAuthUser) ⮕ userRepository (Checks/Updates DB) ⮕ authOptions (jwt) ⮕ Fetch full profile from DB ⮕ authOptions (session) ⮕ User is Logged In! */
