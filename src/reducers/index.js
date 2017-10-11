import { combineReducers } from "redux" 
import todos, * as todosSelectors from './todos'
import filter, * as filterSelectors from './filter'

const rootReducer = combineReducers({ 
  todos,
  filter
})

// FUNTIONS HELPERS TODOS
export function getAllTodos({ todos, filter }) {
  return todosSelectors.getAllTodos(todos, filter)
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

// FUNCTION HELPERS FILTERS 

export function getFilter({ filter }) {
  return filterSelectors.getFilter(filter)
}

export function getAllFilters({ filter }) {
  return filterSelectors.getAllFilters(filter)
}

export default rootReducer