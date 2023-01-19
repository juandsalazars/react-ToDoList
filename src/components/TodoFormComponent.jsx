import React, { useState } from 'react';
import { useTransition } from 'react';
import {Form, Button, Collapse, Input, FormGroup, Label, ButtonGroup} from 'reactstrap';

export default function TodoForm({addTodo}) {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() < 9 ? `0${currentDate.getMonth()+1}` : currentDate.getMonth()+1;
    const currentDay = currentDate.getDate() < 10 ? `0${currentDate.getDate()}` : currentDate.getDate();

    const [userInput, setUserInput] = useState('');
    const [isAddTaskOpen, setAddTaskOpen] = useState(false);
    const [date, setDate] = useState(`${currentYear}-${currentMonth}-${currentDay}`);
    const [priority, setPriority] = useState('low');

    function handleOnChange(e, setter) {
        setter(e.currentTarget.value);
    }

    function priorityClick(e, prioritySelected){
        e.preventDefault();
        setPriority(prioritySelected);        
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(userInput.trim() !== ''){
            const newItem = {
                task: userInput,
                date: date,
                priority: priority
            } 

            addTodo(newItem);
            setUserInput('');
            setDate(`${currentYear}-${currentMonth}-${currentDay}`);
            setPriority('low');
            setAddTaskOpen(false);
        }
    }

    return (
        <div
            className="container clearfix m-20"
            onFocus={() => setAddTaskOpen(true)}
            onBlur={() => setAddTaskOpen(false)}
        >
            <Form
                className='row'
                onSubmit={handleSubmit}
            >
                <Input
                    className='col-12'
                    type="text"
                    value={userInput}
                    onChange={(e) => handleOnChange(e, setUserInput)}
                    placeholder="Add your task"
                />

                <Collapse isOpen={isAddTaskOpen} className="row">
                    <FormGroup className="col-6 mt-3">
                        <Label htmlFor="Date">Date</Label>
                        <Input type="date" id="date" name="date" value={date}
                            onChange={(e) => handleOnChange(e, setDate)}
                            className="w-100"
                        />
                    </FormGroup>
                    <FormGroup className="col-12 mt-3">
                        <Label htmlFor="Priority">Priority</Label>
                        <br />
                        <ButtonGroup className='btn-group-toggle' role='group' data-toggle="buttons">
                            <Button className={priority === 'low' ? 'btn-success active':'btn-success'}
                                onClick={(e) => priorityClick(e, 'low')}>Low</Button>
                            <Button className={priority === 'medium' ? 'btn-warning text-white active':'btn-warning text-white'}
                                onClick={(e) => priorityClick(e, 'medium')}>Medium</Button>
                            <Button className={priority === 'high' ? 'btn-danger active':'btn-danger'}
                                onClick={(e) => priorityClick(e, 'high')}>High</Button>
                        </ButtonGroup>
                    </FormGroup>

                    <Button className="col-3 offset-9 mt-3 btn-info align-self-center">Add ToDo</Button>

                </Collapse>

            </Form>

        </div>    
    );
}