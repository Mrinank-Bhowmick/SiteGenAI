import { User } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";

type userItemProps = { user: User };

const UserItem = (props: userItemProps) => {
  const { user } = props;
  const { id, email, name } = user;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-blue-200 p-4 rounded-sm flex justify-between text-black"
    >
      <div className="flex flex-col">
        <div className="font-bold">{name}</div>
        <div className="text-sm">{email}</div>
      </div>
      <h1>Right</h1>
    </div>
  );
};

export default UserItem;
