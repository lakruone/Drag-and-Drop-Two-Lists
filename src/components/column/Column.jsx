import React from 'react'
import './Column.css'
import {
    SortableContext,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
import Item from '../item/Item';
import { useDroppable } from '@dnd-kit/core';


const Column = ({items, id}) => {

  const { setNodeRef } = useDroppable({id})
  return (
      <SortableContext
        id={id}
        items={items.map(i => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='column'>
          {items.map(item => (
              <Item id={item.id} title={item.title} key={item.id}/>
          ))}
        </div>
      </SortableContext>
  )
}

export default Column