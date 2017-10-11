import { fetchTodos, createTodo, updateTodo, deleteTodo} from '../../actions/todos'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'  
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mockStore = configureMockStore([thunk]) 
const baseUrl = 'https://crud-in-rails-api.herokuapp.com/api/tareas'

describe('Todos Actions', () => { 
  const testTodos = [
    { _id: 1, titulo: 'Todo 1', activo: true },
    { _id: 2, titulo: 'Todo 3', activo: true },
    { _id: 3, titulo: 'Todo 2', activo: true }
  ]
  const testTodo = { _id: 4, titulo: 'new Todo', activo: true }

  it('calls request and success actions if the fetching todos  was successful', () => {   
    const mockAdapter = new MockAdapter(axios)      
    mockAdapter.onGet(baseUrl).reply(200, testTodos) 
    
    const store = mockStore()   
    const expectedActions = [
      { type: 'FETCH_TODOS_REQUEST' },
      { type: 'FETCH_TODOS_SUCCESS', payload: { todos: testTodos } },
    ]  

    return store.dispatch(fetchTodos())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions) 
      }) 
  })

  it('calls request and failure actions if the fetching todos was not successful', () => {    
    const mockAdapter = new MockAdapter(axios)
    mockAdapter.onGet(baseUrl).reply(400)
    
    const store = mockStore() 
    const expectedActions = [
      { type: 'FETCH_TODOS_REQUEST' },
      { type: 'FETCH_TODOS_FAILURE' },
    ]
    return store.dispatch(fetchTodos())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions) 
      }) 
  }) 

  it('calls request and success actions if the create todo was successful', () => {
    const mockAdapter = new MockAdapter(axios)     
    mockAdapter.onPost(baseUrl,testTodo).reply(200, { id: testTodo._id, ...testTodo })

    const store = mockStore() 
    const expectedActions = [
      { type: 'CREATE_TODO_REQUEST' },
      { type: 'CREATE_TODO_SUCCESS', payload: { todo: { id: testTodo._id, ...testTodo} }},
      { type: 'SELECT_TODO', payload: { id: testTodo._id } }
    ]

    return store.dispatch(createTodo(testTodo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('call request and failure actions if create todo was not successful', () => {
    const mockAdapter = new MockAdapter(axios)     
    mockAdapter.onPost(baseUrl,testTodo).reply(400)

    const store = mockStore()
    const expectedActions = [
      { type: 'CREATE_TODO_REQUEST' },
      { type: 'CREATE_TODO_FAILURE'}
    ]

    return store.dispatch(createTodo(testTodo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
  
  it('calls request and success actions if the update todo was successful', () => {
    const updatedTodo = {id: testTodo._id, ...testTodo, activo: false }
    const mockAdapter = new MockAdapter(axios)     
    mockAdapter.onPut(`${baseUrl}/${updatedTodo.id}`).reply(200, updatedTodo)

    const store = mockStore() 
    const expectedActions = [
      { type: 'UPDATE_TODO_REQUEST', payload: { id: updatedTodo.id }},
      { type: 'UPDATE_TODO_SUCCESS', payload: { todo: updatedTodo }}
    ]

    return store.dispatch(updateTodo(updatedTodo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('calls request and failure actions if the update todo was not successful', () => {
    const updatedTodo = {id: testTodo._id, ...testTodo, activo: false }
    const mockAdapter = new MockAdapter(axios)    
    mockAdapter.onPut(`${baseUrl}/${updatedTodo.id}`).reply(400)

    const store = mockStore() 
    const expectedActions = [
      { type: 'UPDATE_TODO_REQUEST', payload: { id: updatedTodo.id }},
      { type: 'UPDATE_TODO_FAILURE'}
    ]

    return store.dispatch(updateTodo(updatedTodo))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

   it('calls request and success actions if the delete todo was successful', () => { 
    const mockAdapter = new MockAdapter(axios)     
    mockAdapter.onDelete(`${baseUrl}/${testTodo._id}`).reply(200)

    const store = mockStore() 
    const expectedActions = [
      { type: 'DELETE_TODO_REQUEST', payload: { id: testTodo._id }},
      { type: 'DELETE_TODO_SUCCESS', payload: { id: testTodo._id }}
    ]

    return store.dispatch(deleteTodo(testTodo._id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

})