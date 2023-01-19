import React , { Component } from 'react';
import TodoList from './TodoListComponent';
import TodoForm from './TodoFormComponent';
import Header from './HeaderComponent';
import CompletedList from './CompletedComponent';

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            todos: JSON.parse(localStorage.getItem('todos')) || []
        };

        this.onComplete = this.onComplete.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.onEditItem = this.onEditItem.bind(this);
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

        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    onDeleteItem(id){
        const newTodos = this.state.todos.filter((todo) => 
            Number(todo.id) !== Number(id)
        );

        this.setState({
            todos: newTodos
        });

        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    async addTodo(item){
        const newItem = {... item, id: new Date().getTime(), completed: false}
        
        await this.setState({
            todos: [...this.state.todos, newItem]
        });
        
        localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }

    onEditItem({id, task, date, priority}){

        const newTodos = this.state.todos.map((todo) => {
            return Number(todo.id) === Number(id) ?
            {...todo, task, date, priority}
            :
            {...todo}
        });

        this.setState({
            todos: newTodos
        });

        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    render(){
        
        return(
            <div className='todo-container container'>
                <div className='row'>
                    <div className='offset-lg-3 offset-md-2 col-md-8 col-lg-6'>
                        <Header />
                    </div>
                </div>
                <div className='row'>
                    <div className='offset-lg-3 offset-md-2 col-md-8 col-lg-6'>
                        <TodoForm
                            addTodo={this.addTodo}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='offset-lg-3 offset-md-2 col-md-8 col-lg-6'>
                        <h2>ToDo</h2>
                        <TodoList
                            todos={this.state.todos}
                            onComplete={this.onComplete}
                            onDeleteItem={this.onDeleteItem}
                            onEditItem={this.onEditItem}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='offset-lg-3 offset-md-2 col-md-8 col-lg-6'>
                        <h2>Completed</h2>
                        <CompletedList
                            todos={this.state.todos}
                            onComplete={this.onComplete}
                            onDeleteItem={this.onDeleteItem}
                            onEditItem={this.onEditItem}
                        />
                    </div>
                </div>
                
                
            </div>
        );
    }
}

export default Main;