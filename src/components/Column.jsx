import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";

export default function Column({ column, cards }) {
  return (
    <div className="bg-gray-100 rounded-lg p-3 w-64 flex-shrink-0 sm:w-72 md:w-80">
      <h3 className="text-lg font-bold mb-3">{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className="min-h-[150px]"
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
