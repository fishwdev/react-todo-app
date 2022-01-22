import React, { Component } from "react";

import './TodoList.css';

import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import uuid from 'uuid/dist/v4';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
        this.update = this.update.bind(this);
        this.complete = this.complete.bind(this);
    }

    create(newTodo) {
        const newTodoWithId = {...newTodo, id: uuid()};
        this.setState({
            todos: [...this.state.todos, newTodoWithId]});
    }

    remove(id) {
        this.setState({
            todos: this.state.todos.filter(task => task.id !== id)
        });
    }

    update(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, task: updatedTask}
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        });
    }

    complete(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, isCompleted: !todo.isCompleted}
            }
            return todo;
        });
        this.setState({
            todos: updatedTodos
        });
    }

    render() {
        const todos = this.state.todos.map(todo => {
            return <Todo
                key={todo.id}
                id={todo.id}
                task={todo.task}
                isCompleted={todo.isCompleted}
                removeTodo={this.remove}
                updateTodo={this.update}
                completeTodo={this.complete}
            />
        });

        return(
            <div className='TodoList'>
                <h1>Todo List
                    <span>React App</span></h1>
                <ul>
                    {todos}
                </ul>
                <NewTodoForm createTodo={this.create}/>
            </div>
        )
    }
}

export default TodoList;