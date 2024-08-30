"use client";
import React, { useEffect, useState } from "react";
import UserItem from "./user-item";
import { User } from "@/types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

const dummyData: User[] = [
  { id: 100, name: "John Doe", email: "john.doe@example.com", age: 30 },
  { id: 200, name: "Jane Smith", email: "jane.smith@example.com", age: 25 },
  {
    id: 333,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    age: 28,
  },
  { id: 4, name: "Bob Brown", email: "bob.brown@example.com", age: 35 },
];

const UserList = () => {
  const [userData, setUserData] = useState<User[]>(dummyData);
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setUserData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };
  return (
    <div className="max-w-2xl mx-auto grid gap-2 my-10">
      <h2 className="font-bold mb-4">User List</h2>
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={(e) => handleDragEnd(e)}
      >
        <SortableContext items={userData}>
          {userData.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default UserList;
