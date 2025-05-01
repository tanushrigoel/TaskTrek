// import dbConnect from "@/utils/dbConnect";
// import { getServerSession, User } from "next-auth";
// // import { authOptions } from "../auth/[...nextauth]/route";
// import { UserModel } from "@/model/User.schema";
// import mongoose from "mongoose";

// export async function GET(req: Request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);
//   const user: User = session?.user as User;
//   if (!session || !user) {
//     return Response.json(
//       {
//         success: false,
//         message: "Not authenticated",
//       },
//       { status: 401 }
//     );
//   }
//   try {
//     const userId = new mongoose.Types.ObjectId(user._id);
//     const Alltasks = await UserModel.aggregate([
//       { $match: { _id: userId } },
//       { $unwind: "$tasks" },
//       { $sort: { "tasks.createdAt": -1 } },
//       { $group: { _id: "$_id", tasks: { $push: "$tasks" } } },
//     ]);
//     if (Alltasks.length == 0) {
//       return Response.json(
//         {
//           success: false,
//           message: "Can't find user",
//         },
//         { status: 401 }
//       );
//     }
//     return Response.json(
//       {
//         success: true,
//         message: Alltasks[0].tasks,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log("An unexpected error occurred");
//     return Response.json(
//       {
//         success: false,
//         message: "Can't fetch messages",
//       },
//       { status: 401 }
//     );
//   }
// }
