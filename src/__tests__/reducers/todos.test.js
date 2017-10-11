import { todos } from '../../reducers/todos'

describe('Todos reducer', () => {
  const testTodos = [
    { id: 1, titulo: 'Todo 1', activo: true },
    { id: 2, titulo: 'Todo 3', activo: true },
    { id: 3, titulo: 'Todo 2', activo: true }
  ]
  const testTodo = { id: 4, titulo: 'new Todo', activo: true }

  it('returns proper initial state', () =>{
    expect(todos(undefined, {})).toEqual([]);
  })

  it('reducer for fetch todos', () =>{ 
    expect(todos([], {
      type: 'FETCH_TODOS_SUCCESS',
      payload: {todos: testTodos}
    })).toEqual(testTodos)
  })
  
  it('reducer for create todo', () => { 
    expect(todos(testTodos, {
      type: 'CREATE_TODO_SUCCESS',
      payload: {todo: testTodo}
    })).toEqual([
      testTodo,
      ...testTodos
    ])
  })

  it('reducer for update todo', () => {
    const state = [...testTodos, testTodo]
    const updateTodo = {...testTodo, titulo: 'update task'} 

    expect(todos(state, {
      type: 'UPDATE_TODO_SUCCESS',
      payload: {todo: updateTodo}
    })).toEqual([
      ...testTodos,
      updateTodo
    ])
  })
  
  it('reducer for delete todo', () => { 
    const todosBeforeDelete = [...testTodos, testTodo]
    expect(todos(todosBeforeDelete, {
      type: 'DELETE_TODO_SUCCESS',
      payload: {id: testTodo.id}
    })).toEqual(testTodos)
  }) 
})

