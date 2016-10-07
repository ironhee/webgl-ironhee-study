// Constants
export const ADD_MODE = 'ADD_MODE'
export const REMOVE_MODE = 'REMOVE_MODE'

// Actions
const CHANGE_MODE = 'app/CHANGE_MODE'

// Reducer
const initialState = {
  mode: ADD_MODE
}
export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_MODE:
      return Object.assign({}, state, { mode: action.mode })
    default: return state
  }
}

// Action Creators
export function changeMode (mode) {
  return {
    type: CHANGE_MODE,
    mode
  }
}
