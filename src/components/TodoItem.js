import React,{ Component } from 'react'
import BounceLoader from 'halogen/BounceLoader'
import classNames from 'classnames'
import '../styles/TodoItem.css'

class TodoItem extends Component {

  static defaultProps = {
    selectedTodo: {}
  }

  state = {
    editable: false
  }

  _onChangeCheckbox = (e) => {
    e.stopPropagation()
    const { id, activo, updateTodo, selectTodo } = this.props 
    updateTodo({id: id, activo: !activo})
    selectTodo(id)
  }
  
  _onClickTodo = () => {
    const { id, selectTodo } = this.props
    selectTodo(id)
    this.setState({editable: true})
    setTimeout(() => {
      this.titleRef.focus()
    }, 0)
  }  
  _onBlurContentEditable = () => {
    const { id, updateTodo, titulo } = this.props
    const titleRef  = this.titleRef
    const titleText = titleRef.innerText.trim()

    if (titleText.length && titleText !== titulo) {
      updateTodo({id: id, titulo: titleText})
      this.setState({editable: false})
      titleRef.innerText = titleText
    } else {
      titleRef.innerText = titulo
    }
  }
  _onKeyUpContentEditable = (e) => {
    if (e.charCode === 13) {
      e.preventDefault()
      this.titleRef.blur()
    }
  }

  render(){ 
    const { id, titulo, activo, deleteTodo, updating, deleting, selectedTodo  } = this.props
    const processing = updating || deleting
    const active = selectedTodo.id === id 
    const todoClass = classNames('todo-item', 'animated', {
      active,
      updating,
      deleting
    })
    return(
      <li className={todoClass} key={id} onClick={this._onClickTodo}> 
        <section className="left">
          {updating
            ? (
              <BounceLoader
                className="loading"
                color="#fac801"
                size="18px"
              />
            ): (
              <input
                type="checkbox"
                checked={activo}
                onClick={this._onChangeCheckbox}
                disabled={processing}
              />
          )} 
          <div 
            contentEditable={this.state.editable}
            className={classNames('title', { activo })} 
            onBlur={this._onBlurContentEditable} 
            onKeyPress={this._onKeyUpContentEditable}
            ref={ node => { this.titleRef = node }}
            spellCheck={false}
          >  
            {titulo}
          </div>
        </section>
        {deleting
          ? (
            <BounceLoader
              className="loading"
              color="#fc635d"
              size="18px"
            />
          ): (
            <div
              className="delete-icon"
              onClick={() => deleteTodo(id)}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </div>
          )} 
      </li>  
    )
  }
}

export default TodoItem 
 