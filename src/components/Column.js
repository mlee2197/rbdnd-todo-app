import React from 'react'
import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

export default function Column({ column, tasks }) {
    return (
        <Container>
            <Title>{column.title}</Title>
            <Droppable droppableId={column.id}>
                {
                    (provided, snapshot)=>(
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            { tasks.map((task,index) => <Task key={task.id} task={task} index={index}/>) }
                            { provided.placeholder }
                        </TaskList>
                    )
                }
                
            </Droppable>
        </Container>
    )
}

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 3px;
`;

const Title = styled.h3`
    padding: 8px;
`;

const TaskList = styled.div`
    padding: 8px;
    border: 2px solid blue;
    background-color: ${ ({isDraggingOver}) => (isDraggingOver ? 'skyBlue' : 'white') };
    transition: all 0.25s;
`;