import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { redirect } from "next/navigation";
import { UserModel } from "@/model/User.schema";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        redirect("/global-error");
        return false;
      }
      const user = await UserModel.findOne({
        email: profile.email,
      });
      if (user) {
        const updatedUser = await UserModel.updateOne(
          { email: profile.email },
          { name: profile.name }
        );
      } else {
        const newUser = await UserModel.create({
          id: account?.userId,
          email: profile.email,
          name: profile.name,
        });
        if (!newUser) {
          throw new Error("Failed to register new user");
        }
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
