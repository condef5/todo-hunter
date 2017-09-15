import { connect } from 'react-redux'
import {
  createTodo,
  fetchTodos,
} from '../actions/todos' 
import { 
  getCreatingStatus, 
} from '../reducers'
import { getFetchingStatus } from '../reducers'
import TodosView from '../components/TodosView'

function mapStateToProps(state) {
  const isBusy = getFetchingStatus(state) 
  return {
    isBusy, 
    isCreating: getCreatingStatus(state),
  }
} 

export default connect(
  mapStateToProps,
  {fetchTodos,createTodo}
)(TodosView)