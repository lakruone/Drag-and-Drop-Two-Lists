import React from 'react'
import './List.css'
import {
    SortableContext,
    verticalListSortingStrategy
  } from "@dnd-kit/sortable";
import Item from '../item/Item';
import { useDroppable } from '@dnd-kit/core';


const List = ({items, id, listName}) => {

  const { setNodeRef } = useDroppable({id})
  return (
      <SortableContext
        id={id}
        items={items.map(i => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className='list'>
          <h2>{listName}</h2>
          {items.map(item => (
              <Item id={item.id} title={item.title} key={item.id}/>
          ))}
        </div>
      </SortableContext>
  )
}

export default List