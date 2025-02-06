import mongoose, { Schema, Document } from "mongoose";

export interface Task extends Document {
  title: string;
  description?: string;
  priority: string;
  status: string;
}

const taskSchema: Schema<Task> = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["To-Do", "In-progress"],
      default: "To-Do",
    },
  },
  { timestamps: true }
);

export const TaskModel =
  (mongoose.models.Task as mongoose.Model<Task>) ||
  mongoose.model("Task", taskSchema);

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  tasks?: Task[];
}

const userSchema: Schema<User> = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    avatar: {
      type: String,
    },
    tasks: [taskSchema],
  },
  { timestamps: true }
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);
