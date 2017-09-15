import React from 'react'
import classNames from 'classnames'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../styles/TodosViewHeader.css'

const TodosViewHeader = ({ createTodo,isCreating, currentFilter, filters, setFilter }) => (
  <header id="todos-view-header">
    <section className="left">
      <h4>TODOS</h4>
        <Select
          name="form-field-name"
          className="filters"
          value={currentFilter}
          clearable={false}
          searchable={false}
          options={filters.map(f => {
            return {
              value: f,
              label: f[0] + f.slice(1).toLowerCase()
            }
          })}
          onChange={ option => { setFilter(option.value) }}
        />
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