"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uuidv7 } from "uuidv7";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TaskSchema } from "@/schema/taskSchema";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Maincontent } from "@/components/Maincontent";
import React from "react";
import { taskStore } from "@/lib/zustandStore";
// export type Tasks = {
//   title: "";
//   description?: "";
//   priority: "";
//   status: "";
// };

function page() {
  // let [tasks, setTasks] = useRecoilState(tasksSelector);
  const { tasks, setTasks } = taskStore();
  const toast = useToast();
  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "To-Do",
    },
  });

  const onSubmit = async (data: z.infer<typeof TaskSchema>) => {
    try {
      const newTask = {
        id: uuidv7(),
        title: data.title,
        description: data.title || "",
        priority: data.priority || "Medium",
        status: data.status || "To-Do",
      };
      localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
      // window.dispatchEvent(new Event("storage"));
      setTasks([...tasks, newTask]);
      // const response = await axios.post("/api/create-task", newTask);
    } catch (error) {
      console.log("Error in creating task");
      toast.toast({
        title: "Failed creating task",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-screen-2xl p-3" data-theme="black">
      <div className="flex flex-row justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="default"
              className="bg-white text-black py-3 px-5 rounded-lg font-medium hover:bg-white"
            >
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create a new task</DialogTitle>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  name="title"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="title" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="To-Do">To-Do</SelectItem>
                          <SelectItem value="In-Progress">
                            In-progress
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  name="priority"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <Button
                  variant="default"
                  type="submit"
                  className="my-2 bg-white text-black py-3 px-5 rounded-lg font-medium hover:bg-white"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        <div className="flex flex-row">
          
          <Button
            variant="destructive"
            className="bg-red-600 text-white rounded-[5px]"
            onClick={() => {
              signOut({ callbackUrl: `${window.location.origin}` });
              toast.toast({
                title: "You have been signed out successfully.",
                variant: "default",
              });
            }}
          >
            <LogOut />
          </Button>
        </div>
      </div>
      <div>
        <Maincontent />
      </div>
    </div>
  );
}

export default page;
