"use client";
import React, { useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Card } from "./ui/card";
import { taskStore } from "@/lib/zustandStore";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

interface DraggableTaskProps {
  task: Task;
}

interface DroppableContainerProps {
  id: UniqueIdentifier;
  tasks: Task[];
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="p-4 mb-2 cursor-grab bg-[#1e2837] hover:bg-[#2a374a] border-[#2d3748] text-gray-100 transition-colors">
        <h3 className="font-semibold text-gray-100">{task.title}</h3>
        <p className="text-sm text-gray-300">{task.description}</p>
      </Card>
    </div>
  );
};

const DroppableContainer: React.FC<DroppableContainerProps> = ({
  id,
  tasks,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 rounded-lg min-h-[200px] ${
        isOver ? "bg-[#1e2837]" : "bg-[#171f2e]"
      } border border-[#2d3748] transition-colors`}
    >
      <h2 className="text-lg font-bold mb-4 text-gray-100">{id.toString()}</h2>
      {tasks.map((task) => (
        <DraggableTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export function Maincontent() {
  const { tasks, setTasks, updateTaskStatus, deleteTask } = taskStore();

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [setTasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && over.id === "Delete Task") {
      deleteTask(active.id.toString());
    }

    if (over && active.id !== over.id) {
      updateTaskStatus(active.id.toString(), over.id.toString());
    }
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const containers = ["To-Do", "In-Progress", "Done", "Delete Task"];

  return (
    <main className="container mx-auto p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {containers.map((container) => (
            <DroppableContainer
              key={container}
              id={container}
              tasks={tasks.filter((task) => task.status === container)}
            />
          ))}
        </div>
      </DndContext>
    </main>
  );
}
