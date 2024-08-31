import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

type componentList = {
  list: string[];
  setRenderComponents: Dispatch<SetStateAction<string[]>>;
};

const SortableItem = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
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
      className="bg-slate-700 p-4 ml-4 mr-4"
    >
      {children}
    </div>
  );
};

const RearrangeComponents = (props: componentList) => {
  const { list, setRenderComponents } = props;

  useEffect(() => {
    setRenderComponents(list);
  }, [list, setRenderComponents]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRenderComponents((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={list}>
          {list.map((element) => (
            <SortableItem key={element} id={element}>
              {element}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default RearrangeComponents;
