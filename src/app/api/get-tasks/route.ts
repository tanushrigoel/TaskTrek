import dbConnect from "@/utils/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  await dbConnect();
  const session = getServerSession(authOptions);
//   const user:User = session?.user as User;
}
