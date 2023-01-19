import React from 'react';

export default function TodoList({todos, onComplete, onDeleteItem}) {

    const todoList = todos.map((todo) => {
        return (
            <TodoItem
                key={todo.id}
                todo={todo}
                onComplete={onComplete}
                onDeleteItem={onDeleteItem}
            />
        )
    });

    return (
        <>
            {todoList}
        </>    
    );
}

function TodoItem({todo, onComplete, onDeleteItem}){
    
    function getStyle() {
        return {
            textDecoration: todo.completed ? 
                'line-through' : 'none',
            margin: '20px',
            border: '1px solid #ffffff',
            backgroundColor: '#CCF7E3'
        }
    }

    return (
        <div style={getStyle()}>
            <input
                type='checkbox'
                checked = {todo.completed}
                onChange = {() => onComplete(todo.id)}
            />
            {todo.task}
            <button className = 'delete-btn' onClick={() => onDeleteItem(todo.id)}>Delete</button>    
        </div>
    );
}