import React from 'react'
import './Item.css'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities';

const Item = ({id, title}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }


  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className='Item'
    >
      {title}
    </div>
  )
}

export default Item