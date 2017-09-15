import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import './styles/app.css'
import 'font-awesome/css/font-awesome.min.css'

render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
