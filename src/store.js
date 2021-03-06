import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk' 
// import promiseMiddleware from 'redux-promise-middleware' 

import rootReducer from './reducers'

const middleware = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, middleware )

export default store