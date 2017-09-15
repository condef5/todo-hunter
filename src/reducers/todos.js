import { combineReducers } from 'redux'
import { putProcessingStatus } from './helpers'

function isFetching(state = false, action) {
  switch (action.type) {
    case "FETCH_TODOS_PENDING":
      return true
    case "FETCH_TODOS_REJECTED":
    case "FETCH_TODOS_FULFILLED":
      return false
    default:
      return state
  }
}

function isCreating(state = false, action) {
  switch (action.type) {
    case 'CREATE_TODO_PENDING':
      return true
    case 'CREATE_TODO_REJECTED':
    case 'CREATE_TODO_FULFILLED':
      return false
    default:
      return state
  }
}


function todos(state = [] , action) {
  switch(action.type) { 
    case "FETCH_TODOS_FULFILLED":
      return action.payload.todos
    case 'CREATE_TODO_FULFILLED':
      return [action.payload.todo, ...state]
    case 'UPDATE_TODO_FULFILLED': 
      const { todo } = action.payload
      return state.map(_todo => {
        if (_todo.id === todo.id) {
          return todo
        }
        return _todo
      }) 
    case 'DELETE_TODO_FULFILLED':
      return state.filter(todo =>
        todo.id !== action.payload.id
      )
    default: 
      return state
  }
} 

function updating(state = [], action) {
  switch(action.type) {
    case 'UPDATE_TODO_PENDING':
      return [...state, action.payload.id]
    case 'UPDATE_TODO_REJECTED':
      return state.filter(id => id !== action.payload.id)
    case 'UPDATE_TODO_FULFILLED':
      return state.filter(id => id !== action.payload.todo.id)
    default:
      return state
  }
}

function deleting(state = [], action) {
  switch(action.type) {
    case 'DELETE_TODO_PENDING':
      return [...state, action.payload.id]
    case 'DELETE_TODO_REJECTED':
    case 'DELETE_TODO_FULFILLED': 
      return state.filter(id => id !== action.payload.id)
    default: 
      return state
  }
}

function selectedTodoId(state = 0, action) {
  switch(action.type) {
    case 'SELECT_TODO':
      return action.payload.id
    case 'DELETE_TODO_FULFILLED':
      return state === action.payload.id ? 0 : state
    default:
      return state
  }
}

export default combineReducers({
  todos,
  isFetching,
  isCreating,
  updating,
  deleting,
  selectedTodoId 
})

// Funciones que sirven como helpers para acceder al state

export function getAllTodos({ todos, updating, deleting }) {
  return putProcessingStatus(todos, updating, deleting)
}

export function getSelectedTodo({ todos, selectedTodoId }) {
  return todos.find(todo => todo.id === selectedTodoId)
}

export function getFetchingStatus({ isFetching }) {
  return isFetching
}

export function getCreatingStatus({ isCreating }) {
  return isCreating
}