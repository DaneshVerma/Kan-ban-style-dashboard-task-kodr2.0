import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import JobCard from "./Jobcard";

export default function Column({ column, cards }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-64 flex-shrink-0">
      <h3 className="text-xl font-bold mb-4">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="min-h-[200px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <JobCard job={card} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
