import axios from "axios";

const baseUrl = 'https://crud-in-rails-api.herokuapp.com/api/tareas'

export function fetchTodos() {
  return {
    type: 'FETCH_TODOS',
    payload: axios.get(baseUrl)
              .then(response => ({todos : response.data}) )
  } 
}

export function createTodo(todo) {
  return {
    type: 'CREATE_TODO',
    payload: axios.post(baseUrl,todo)
              .then(response => ({ todo: response.data  }))
              .catch(function (error) {
                console.log(error);
              })
    }
}
export function updateTodo(todo) {
  return function(dispatch) {
    dispatch({type: "UPDATE_TODO_PENDING" , payload: { id: todo.id } }); 
    axios.put(`${baseUrl}/${todo.id}`, todo)
      .then((response) => {
        dispatch({type: "UPDATE_TODO_FULFILLED", payload: {todo: response.data}})
      })
      .catch((err) => {
        dispatch({type: "UPDATE_TODO_REJECTED", payload: err})
      })
  }
} 
export function deleteTodo(id) {
  return function(dispatch) {
    dispatch({type: "DELETE_TODO_PENDING" , payload: { id } }); 
    axios.delete(`${baseUrl}/${id}`)
      .then((response) => {
        dispatch({type: "DELETE_TODO_FULFILLED", payload: { id }})
      })
      .catch((err) => {
        dispatch({type: "DELETE_TODO_REJECTED", payload: err})
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