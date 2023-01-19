import React , { Component } from 'react';
import TodoList from './TodoListComponent';
import TodoForm from './TodoFormComponent';
import todos from '../assets/todos.json'

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos: todos
        };

        this.onComplete = this.onComplete.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    onComplete(id){
        const newTodos = this.state.todos.map((todo) => {
            return Number(todo.id) === Number(id) ?
            {...todo, completed: !todo.completed}
            :
            {...todo}
        });

        this.setState({
            todos: newTodos
        });
    }

    onDeleteItem(id){
        const newTodos = this.state.todos.filter((todo) => 
            Number(todo.id) !== Number(id)
        );

        this.setState({
            todos: newTodos
        });
    }

    addTodo(newTodo){
        const newItem = {id: +new Date(), task: newTodo, completed: false}
        this.setState({
            todos: [...todos, newItem]
        });
    }

    render(){
        
        return(
            <>
                <TodoForm addTodo={this.addTodo}/>
                <TodoList todos={this.state.todos} onComplete={this.onComplete} onDeleteItem={this.onDeleteItem} />
            </>
        );
    }
}

export default Main;