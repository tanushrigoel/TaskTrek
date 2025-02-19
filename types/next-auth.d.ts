import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    _id?: string;
  }
}

// import "next-auth";
// import { DefaultSession } from "next-auth";
// declare module "next-auth" {
//   interface User {
//     _id?: string;
//     isVerified?: boolean;
//     isAcceptingMessages?: boolean;
//     username?: string;
//   }
//   interface Session {
//     user: {
//       _id?: string;
//       isVerified?: boolean;
//       isAcceptingMessages?: boolean;
//       username?: string;
//     } & DefaultSession["user"];
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     _id?: string;
//     isVerified?: boolean;
//     isAcceptingMessages?: boolean;
//     username?: string;
//   }
// }
