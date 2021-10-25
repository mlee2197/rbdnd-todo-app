import initialData from './initial-data';
import Column from './components/Column';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';

function App() {
  const [ tasks, setTasks ] = useState(initialData.tasks);
  const [ columns, setColumns ] = useState(initialData.columns);
  const [ columnOrder, setColumnOrder ] = useState(initialData.columnOrder);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // check if the drop location was outside the field
    if (!destination) {
      return;
    }
    // check if the destination is different from the source
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // create new array with updated order
    const column = columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
    console.log(newColumn);
    // set new state
    setColumns(prev => ({
      ...prev,
      [newColumn.id]: newColumn,
    }))
  }

  return (
    <DragDropContext
      //onDragStart
      //onDragUpdate
      onDragEnd={onDragEnd}
    >
      {
        columnOrder.map((columnId) => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map((taskId)=> tasks[taskId]);
          return <Column key={column.id} column={column} tasks={columnTasks}/>;
        })
      }
    </DragDropContext>
  );
}

export default App;
