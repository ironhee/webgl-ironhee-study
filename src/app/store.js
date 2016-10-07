import { createStore, combineReducers } from 'redux'
import app from './ducks/app'

const store = createStore(
  combineReducers({ app })
)

export default store
