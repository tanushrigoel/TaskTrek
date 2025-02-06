import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import { UserModel } from "@/model/User.schema";
import dbConnect from "@/utils/dbConnect";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      await dbConnect();
      try {
        if (!profile?.email) {
          return false;
        }
        console.log(account);
        

        const user = await UserModel.findOne({ email: profile.email });

        if(!user) {
          const newUser = await UserModel.create({
            id: account?.providerAccountId,
            email: profile.email,
            name: profile.name,
          });
          console.log("hi ",account?.providerAccountId);
          

          if (!newUser) {
            console.error("Failed to register new user");
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // This prevents authentication
      }
    },
    async jwt({ token, user, account, profile }) {
      if (profile?.email) {
        const dbUser = await UserModel.findOne({ email: profile.email });
        if (!dbUser) {
          console.error("User not found in database");
          return token; // Avoid throwing an error here
        }
        token.id = dbUser.id.toString();
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
