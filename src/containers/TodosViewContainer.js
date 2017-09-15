import { connect } from 'react-redux'
import {
  createTodo,
  fetchTodos,
} from '../actions/todos' 
import { setFilter } from '../actions/filter'
import { 
  getCreatingStatus, 
  getAllFilters,
  getFilter
} from '../reducers'
import { getFetchingStatus } from '../reducers'
import TodosView from '../components/TodosView'

function mapStateToProps(state) {
  const isBusy = getFetchingStatus(state) 
  return {
    isBusy, 
    isCreating: getCreatingStatus(state),  
    availableFilters: getAllFilters(state),
    currentFilter: getFilter(state),
  }
} 

export default connect(
  mapStateToProps,
  {fetchTodos,createTodo,setFilter}
)(TodosView)