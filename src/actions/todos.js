import axios from "axios";

const baseUrl = 'https://crud-in-rails-api.herokuapp.com/api/tareas'

export function fetchTodos() { 
  return function(dispatch) {
    dispatch({type: "FETCH_TODOS_REQUEST"}); 
    return axios.get(baseUrl)
      .then((response) => {
        dispatch({type: "FETCH_TODOS_SUCCESS", payload: {todos: response.data}})
      })
      .catch((err) => {
        dispatch({type: "FETCH_TODOS_FAILURE" })
      })
  }
}

export function createTodo(todo) {
  return function(dispatch) {
    dispatch({type: "CREATE_TODO_REQUEST"}); 
    return axios.post(baseUrl, todo)
      .then((response) => {
        dispatch({type: "CREATE_TODO_SUCCESS", payload: {todo: response.data}})
        dispatch(selectTodo(response.data.id)); 
      })
      .catch((err) => {
        dispatch({type: "CREATE_TODO_FAILURE"})
      })
  } 
}
export function updateTodo(todo) {
  return function(dispatch) {
    dispatch({type: "UPDATE_TODO_REQUEST" , payload: { id: todo.id } }); 
    return axios.put(`${baseUrl}/${todo.id}`, todo)
      .then((response) => {
        dispatch({type: "UPDATE_TODO_SUCCESS", payload: {todo: response.data}})
      })
      .catch((err) => {
        dispatch({type: "UPDATE_TODO_FAILURE"})
      })
  }
} 
export function deleteTodo(id) {
  return function(dispatch) {
    dispatch({type: "DELETE_TODO_REQUEST" , payload: { id } }); 
    return axios.delete(`${baseUrl}/${id}`)
      .then((response) => {
        dispatch({type: "DELETE_TODO_SUCCESS", payload: { id }})
      })
      .catch((err) => {
        dispatch({type: "DELETE_TODO_FAILURE"})
      })
  }
}  

export function selectTodo(id) {
  return {
    type: 'SELECT_TODO',
    payload: {
      id
    }
  }
}