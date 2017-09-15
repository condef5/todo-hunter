import { combineReducers } from "redux" 
import todos, * as todosSelectors from './todos'

const rootReducer = combineReducers({ 
  todos
})

// Funciones que sirven como helpers para acceder al state todos usando destructuring
export function getAllTodos({ todos }) {
  return todosSelectors.getAllTodos(todos)
}

export function getSelectedTodo({ todos }) {
  return todosSelectors.getSelectedTodo(todos)
}

export function getFetchingStatus({ todos }) {
  return todosSelectors.getFetchingStatus(todos)
}

export function getCreatingStatus({ todos }) {
  return todosSelectors.getCreatingStatus(todos)
}

export default rootReducer