import dbConnect from "@/utils/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Task, UserModel } from "@/model/User.schema";
import mongoose from "mongoose";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  const { title, description, status, priority } = await req.json();
  try {
    const userId = new mongoose.Types.ObjectId(user._id);
    const currUser = await UserModel.findById(userId);
    if (!currUser) {
      return Response.json(
        {
          success: false,
          message: "Can't find user",
        },
        { status: 401 }
      );
    }
    const newTask = { title, description, status, priority };
    currUser.tasks?.push(newTask as Task);
    await currUser.save();
    return Response.json(
      {
        success: true,
        message: "New task created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("An unexpected error occurred");
    return Response.json(
      {
        success: false,
        message: "Error creating message",
      },
      { status: 401 }
    );
  }
}
