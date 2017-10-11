import React, { Component } from 'react'  
import TodoItem from './TodoItem'

class TodoList extends Component { 
  render(){
    const { todos, ...rest } = this.props 
    return ( 
      <div className="Todo-List">
        <ul>
          {this.props.todos.map(todo => 
            <TodoItem key={todo.id}  {...todo} {...rest} /> 
          )} 
        </ul>
      </div>   
    )
  }
} 

export default TodoList