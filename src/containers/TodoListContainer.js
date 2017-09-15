import { connect } from 'react-redux'
import {  
  fetchTodos,
  updateTodo,
  deleteTodo, 
  selectTodo
} from '../actions/todos'
import { getAllTodos,getSelectedTodo } from '../reducers'
import TodoList from '../components/TodoList'

function mapStateToProps(state) {
  return {
    todos: getAllTodos(state),
    selectedTodo: getSelectedTodo(state)
  }
}
 
export default connect(
  mapStateToProps,
  { 
    fetchTodos,
    updateTodo, 
    deleteTodo,
    selectTodo
  }
)(TodoList)