import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label,
    Input, ButtonGroup} from 'reactstrap';

export default function CompletedList({todos, onComplete, onDeleteItem, onEditItem}) {

    let todoList =[];

    if (todos.length !== 0) {
        todoList = todos.map((todo) => {
            return (
                todo.completed ?
                <CompletedItem
                    key={todo.id}
                    todo={todo}
                    onComplete={onComplete}
                    onDeleteItem={onDeleteItem}
                    onEditItem={onEditItem}
                />
                :
                null
            )
        });
    }

    return (
        <>
            {todoList}
        </>    
    );
}

function CompletedItem({todo, onComplete, onDeleteItem, onEditItem}){

    const [isModalOpen, setModalOpen] = useState(false);
    const [taskname, setTaskname] = useState(todo.task);
    const [date, setDate] = useState(todo.date);
    const [priority, setPriority] = useState(todo.priority);

    function handleOnChange(e, setter) {
        setter(e.currentTarget.value);
    }

    function priorityClick(e, prioritySelected){
        e.preventDefault();
        setPriority(prioritySelected);        
    }
    
    function getStyle() {
        let bgColor = '';

        switch(todo.priority){
            case 'low':
                bgColor = 'linear-gradient(to right, rgb(204, 255, 204, 1), rgb(204, 255, 204, 0))';
                break;
            
            case 'medium':
                bgColor = 'linear-gradient(to right, rgb(255, 255, 179, 1), rgb(182, 229, 229, 0))';
                break;

            case 'high':
                bgColor = 'linear-gradient(to right, rgb(255, 153, 153, 1), rgb(255, 153, 153, 0))';
                break;
        }

        return {
            margin: '20px',
            backgroundImage: bgColor
        }
    }

    function checkForm(e) {
        e.preventDefault();

        if (taskname.trim() === '') {
            alert("Task name can't be empty")
        }
        else {

            const editedItem = {
                ...todo,
                task: taskname, 
                date: date, 
                priority: priority
            }

            onEditItem(editedItem);
        }

        setModalOpen(!isModalOpen);
        
    }

    return (
        <div className='row todo-task-container' style={getStyle()}>
            <input
                className='col-1 mw-1 mh-1'
                type='checkbox'
                checked = {todo.completed}
                onChange = {() => onComplete(todo.id)}
            />
            <div className='col-3 col-sm-6 text-start todo-task align-self-center'>{todo.task}</div>
            <div className='col-3 col-sm-2 text-start align-self-center '>{todo.date}</div>
            <Button className="fa fa-edit col-2 col-sm-1 btn-outline-muted h-100 align-self-center" onClick={() => setModalOpen(!isModalOpen)} />   
            <Button className="col-3 col-sm-2 btn-danger h-100 align-self-center" onClick={() => onDeleteItem(todo.id)}>
                Delete
            </Button>

            <Modal isOpen={isModalOpen} toggle={() => setModalOpen(!isModalOpen)}>
                <ModalHeader toggle={() => setModalOpen(!isModalOpen)}>{todo.task}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={checkForm}>
                        <FormGroup>
                            <Label htmlFor="taskname">Task name</Label>
                            <Input type="text" id="taskname" name="taskname" value={taskname}
                                onChange={(e) => handleOnChange(e, setTaskname)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="Date">Date</Label>
                            <Input type="date" id="date" name="date" value={date}
                                onChange={(e) => handleOnChange(e, setDate)}
                            />
                        </FormGroup>
                        <FormGroup>
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
                        <Button type="submit" value="submit" className="bg-primary align-self-end">
                            Save
                        </Button>
                    </Form>
                </ModalBody>
            </Modal>    
        </div>
    );
}