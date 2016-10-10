import { createStore, combineReducers } from 'redux'
import app from './ducks/app'

const rootReducer = combineReducers({
  app
})

const store = createStore(rootReducer)

export default store
