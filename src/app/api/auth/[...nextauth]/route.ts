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
        // console.log(account);

        let user = await UserModel.findOne({ email: profile.email }).select("_id name email");

        if (!user) {
          user = await UserModel.create({
            id: account?.providerAccountId,
            email: profile.email,
            name: profile.name,
          });
          // console.log("hi ", account?.providerAccountId);

          if (!user) {
            console.error("Failed to register new user");
            return false;
          }
        }
        if (account) {
          account.userId = (user as any)._id.toString();
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // This prevents authentication
      }
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        // console.log("user here ", user);
        // console.log("token here ", token);
        // console.log("account here ", account);
        // console.log("profile here ", profile);
        token.email = user.email;
        token._id = account?.userId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user){
          session.user.email = token.email;
          session.user._id = token._id as string;
        } 
      }

      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
