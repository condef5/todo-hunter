import React from 'react'
import classNames from 'classnames'
import '../styles/TodosViewHeader.css'

const TodosViewHeader = ({ createTodo, isCreating }) => (
	<header id="todos-view-header">
		<section className="left">
			<h4>TODOS</h4>
		</section>
		<a 
			className={classNames('add-todo', {
          processing: isCreating
        })}
			href="#" 
			onClick={(e) =>{ 
				e.preventDefault(); 
				var todo = {'titulo': 'new Todo', descripcion: "Something", prioridad: 1, activo: false} 
				createTodo(todo) 
			}} 
		>
        <i className="fa fa-plus" aria-hidden="true"></i>
    </a>
	</header>
)
export default TodosViewHeader