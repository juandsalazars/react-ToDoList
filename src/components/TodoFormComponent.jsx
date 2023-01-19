import React, { useState } from 'react';

export default function TodoForm({addTodo}) {

    const [userInput, setUserInput] = useState('');

    function handleOnChange(e) {
        setUserInput(e.currentTarget.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(userInput.trim() !== ''){
            addTodo(userInput);
            setUserInput('');
        }
    }

    return (
        <div style={{margin: 20}}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userInput}
                    onChange={handleOnChange}
                />
                <button>Add todo</button>
            </form>
        </div>    
    );
}