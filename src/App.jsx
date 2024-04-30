import { useState } from 'react'
import './App.css'
import {DndContext, closestCorners} from '@dnd-kit/core';
import List from './components/list/List';
import { arrayMove } from '@dnd-kit/sortable';

function App() {
 
  const [itemList, setItemList] = useState({
    listOne: [
      {id:1, title: 'Item 1'},
      {id:2, title: 'Item 2'},
      {id:3, title: 'Item 3'}
    ],
    listTwo: [
      {id:4, title: 'Item 4'},
      {id:5, title: 'Item 5'},
      {id:6, title: 'Item 6'}
    ]
})

  const findContainer = (id) => {
    if (id in itemList) return id;

    return Object.keys(itemList).find((key) => itemList[key].map(item => item.id).includes(id));
  }

  const findItemIndex = (items, id) => items.findIndex(item => item.id === id);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex =  findItemIndex(itemList[activeContainer], active.id);
    const overIndex = findItemIndex(itemList[overContainer], over.id);

    if (activeIndex !== overIndex) {
      setItemList((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

  }


  const handleDragOver = (event) => {
    const { active, over } = event;

    // Find the containers
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItemList((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = findItemIndex(activeItems,active.id);
      const overIndex = findItemIndex(overItems, over.id);

    

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, overIndex),
          itemList[activeContainer][activeIndex],
          ...prev[overContainer].slice(overIndex, prev[overContainer].length)
        ]
      };
    });
  }

  return (
    <>
     <h3>Drag And Drop List</h3>
     <div className='App'>
     <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      >
        <List id='listOne' items={itemList.listOne} listName='List 1'/>
        <List id='listTwo' items={itemList.listTwo} listName='List 2'/>
     </DndContext>

     </div>
     
    </>
  )
}

export default App
