import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import renderer from './renderer'
import App from './components/App'

export default function init () {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body
  )

  document.body.appendChild(renderer.domElement)
}
