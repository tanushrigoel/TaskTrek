// // "use client";

// import React, { useEffect, useState } from "react";
// import {
//   DndContext,
//   DragEndEvent,
//   UniqueIdentifier,
//   useDraggable,
//   useDroppable,
// } from "@dnd-kit/core";
// import axios from "axios";
// import { Tasks } from "@/app/list/page";
// import { Card } from "./ui/card";
// /**
//  * fetch all the tasks from db
//  * separate them according to status
//  * whenever the task is moved to another div update the status
//  * every 10 seconds update the db
//  *
//  */
// // , id: UniqueIdentifier

// function Droppable(props: { children: React.ReactNode }, id: UniqueIdentifier) {
//   const { isOver, setNodeRef } = useDroppable({ id: id });

//   return (
//     <>
//       <div ref={setNodeRef}>{props.children}</div>
//     </>
//   );
// }

// function Draggable(props: { children: React.ReactNode }) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: "draggable",
//   });
//   const style = transform
//     ? {
//         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
//       }
//     : undefined;
//   return (
//     <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
//       {props.children}
//     </button>
//   );
// }

// // function Drop({ id: UniqueIdentifier }) {

// // }

// export async function Maincontent() {
//   const [tasks, setTasks] = useState<Tasks[]>([]);
//   useEffect(() => {
//     const allTasks = localStorage.getItem("tasks");
//     if (allTasks) {
//       setTasks(JSON.parse(allTasks));
//     }
//   }, []);

//   function handleDragEnd(event: DragEndEvent) {
//     if (event.over && event.over.id === "droppable") {
//       setIsDropped(true);
//     }
//   }

//   const renderTasks = (status: string) => {
//     return tasks
//       .filter((task) => task.status === status)
//       .map((task, index) => (
//         <Draggable>
//           <Card>
//             <h3>{task.title}</h3>
//             <p>{task.description}</p>
//           </Card>
//         </Draggable>
//       ));
//   };

//   const [isDropped, setIsDropped] = useState(false);
//   const draggableMarkup = <Draggable>Drag me</Draggable>;

//   return (
//     <main className="container mt-10 mx-auto p-4">
//       <DndContext onDragEnd={handleDragEnd}>
//         {!isDropped ? draggableMarkup : "null"}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <Droppable id="To-Do">
//             {isDropped ? draggableMarkup : "Drop here"}
//           </Droppable>
//           <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
//           <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
//         </div>
//       </DndContext>
//     </main>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  UniqueIdentifier,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Card } from "./ui/card";

interface Task {
  id: string;
  title: string;
  description: string;
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
      <Card className="p-4 mb-2 cursor-move">
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-600">{task.description}</p>
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
        isOver ? "bg-gray-100" : "bg-gray-50"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">{id.toString()}</h2>
      {tasks.map((task) => (
        <DraggableTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export function Maincontent() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Example Task",
      description: "This is a sample task",
      status: "To-Do",
    },
    {
      id: "2",
      title: "Example Task",
      description: "This is a sample task",
      status: "In Progress",
    },
    // Add more sample tasks as needed
  ]);
  window.addEventListener("storage", () => {
    const Alltasks = localStorage.getItem("tasks");
    if (Alltasks) {
      setTasks(JSON.parse(Alltasks));
    }
  });
  useEffect(() => {
    const Alltasks = localStorage.getItem("tasks");
    if (Alltasks) {
      setTasks(JSON.parse(Alltasks));
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === active.id) {
            return {
              ...task,
              status: over.id.toString(),
            };
          }
          return task;
        })
      );
    }
  };

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    window.dispatchEvent(new Event("storage"));
  }, [tasks]);

  const containers = ["To-Do", "In Progress", "Done"];

  return (
    <main className="container mx-auto p-4">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
