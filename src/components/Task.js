import React from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

export default function Task({ task, index }) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <Container
                    {...provided.draggableProps}
                    ref = {provided.innerRef}
                    isDragging={snapshot.isDragging}
                >
                    <Handle {...provided.dragHandleProps}/>
                    {task.content}
                </Container>
            )}
        </Draggable>
    )
}

const Container = styled.div`
    display: flex;
    padding: 8px;
    border: 1px solid green;
    margin: 8px 0;
    background-color: ${props => (props.isDragging ? 'limeGreen' : 'white')};

`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;