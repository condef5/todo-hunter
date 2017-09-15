import React,{ Component } from 'react' 
import TodoListContainer from '../containers/TodoListContainer'
import TodosViewHeader from './TodosViewHeader'
import Loading from './Loading'
import '../styles/TodosViewFooter.css'

const TodosViewMain = ({ isBusy }) => (
  <div id="todos-view-main">
    {isBusy
      ? <Loading color="#5dcff3" />
      : <TodoListContainer />}
    </div>
 )

const TodosViewFooter = () => (
	<footer id="todos-view-footer">
		Development by devAcademy
	</footer>
) 
 
class TodosView extends Component {
	componentWillMount(){
    this.props.fetchTodos()
  }
  render(){
  	const { isBusy, createTodo, isCreating} = this.props
    return(
			<div className="todos-view"> 
				<TodosViewHeader createTodo={createTodo} isCreating={isCreating} />
			  <TodosViewMain isBusy={isBusy} />
			  <TodosViewFooter />
			</div> 
    )
  }
} 
export default TodosView 

