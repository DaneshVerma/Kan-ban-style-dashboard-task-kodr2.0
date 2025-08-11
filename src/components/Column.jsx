import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Jobcard from "./Jobcard";

export default function Column({ column, cards }) {
  return (
    <div className='bg-gray-100 rounded-lg p-3 w-full'>
      <h3 className='text-lg font-bold mb-3'>{column.title}</h3>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            className='min-h-[150px]'
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
                    <Jobcard job={card} />
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
