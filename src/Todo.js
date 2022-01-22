import React, { Component } from "react";

import './Todo.css';

class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.task,
            isEditing: false,
            isCompleted: false
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleRemove(evt) {
        this.props.removeTodo(this.props.id);
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.updateTodo(this.props.id, this.state.task);
        this.setState({isEditing: !(this.state.isEditing)});
    }

    handleEdit(evt) {
        this.setState({isEditing: !(this.state.isEditing)});
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleComplete(evt) {
        this.props.completeTodo(this.props.id);
    }

    render() {
        if(this.state.isEditing) {
            return (
                <div className='Todo'>
                    <form class='Todo-Edit-Form' onSubmit={this.handleSubmit}>

                        <input
                            type='text'
                            placeholder='Update Todo'
                            id='task'
                            name='task'
                            value={this.state.task}
                            onChange={this.handleChange}
                        />
                        <button>Save</button>
                    </form>
                </div>
            )
        }
        else {
            return(
                <div className='Todo'>
                    <li
                        className={ this.props.isCompleted ? 'Todo-Completed' : 'Todo-Incomplete' }
                        onClick={this.handleComplete}
                    >
                        {this.props.task}
                    </li>
                    <div className='Todo-Buttons'>
                        <button onClick={this.handleEdit}>
                            <i class='fas fa-pen' />
                        </button>
                        <button onClick={this.handleRemove}>
                            <i className='fas fa-trash'/>
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export default Todo;