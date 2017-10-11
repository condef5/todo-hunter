import { combineReducers } from 'redux'
import { putProcessingStatus } from './helpers'

export function isFetching(state = false, action) {
  switch (action.type) {
    case "FETCH_TODOS_REQUEST":
      return true
    case "FETCH_TODOS_FAILURE":
    case "FETCH_TODOS_SUCCESS":
      return false
    default:
      return state
  }
}

export function isCreating(state = false, action) {
  switch (action.type) {
    case 'CREATE_TODO_REQUEST':
      return true
    case 'CREATE_TODO_FAILURE':
    case 'CREATE_TODO_SUCCESS':
      return false
    default:
      return state
  }
}

export function todos(state = [] , action) {
  switch(action.type) { 
    case "FETCH_TODOS_SUCCESS":
      return action.payload.todos
    case 'CREATE_TODO_SUCCESS':
      return [action.payload.todo, ...state]
    case 'UPDATE_TODO_SUCCESS': 
      const { todo } = action.payload
      return state.map(_todo => {
        if (_todo.id === todo.id) {
          return todo
        }
        return _todo
      }) 
    case 'DELETE_TODO_SUCCESS':
      return state.filter(todo =>
        todo.id !== action.payload.id
      )
    default: 
      return state
  }
} 

export function updating(state = [], action) {
  switch(action.type) {
    case 'UPDATE_TODO_REQUEST':
      return [...state, action.payload.id]
    case 'UPDATE_TODO_FAILURE':
      return state.filter(id => id !== action.payload.id)
    case 'UPDATE_TODO_SUCCESS':
      return state.filter(id => id !== action.payload.todo.id)
    default:
      return state
  }
}

export function deleting(state = [], action) {
  switch(action.type) {
    case 'DELETE_TODO_REQUEST':
      return [...state, action.payload.id]
    case 'DELETE_TODO_FAILURE':
    case 'DELETE_TODO_SUCCESS': 
      return state.filter(id => id !== action.payload.id)
    default: 
      return state
  }
}

function selectedTodoId(state = 0, action) {
  switch(action.type) {
    case 'SELECT_TODO':
      return action.payload.id
    case 'DELETE_TODO_SUCCESS':
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

// PUBLIC HELPER FUNCIONS

export function getAllTodos({ todos, updating, deleting }, { filter }) {
  const filteredTodos = filterTodos(todos, filter)
  return putProcessingStatus(filteredTodos, updating, deleting)
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

/*  PRIVATE HELPER FUNCTIONS */

function filterTodos(todos, filter) {
  switch (filter) {
    case 'COMPLETED':
      return todos.filter(todo => todo.activo)
    case 'ACTIVE':
      return todos.filter(todo => !todo.activo)
    default:
      return todos
  }
}