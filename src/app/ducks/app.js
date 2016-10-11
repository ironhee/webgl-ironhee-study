import _ from 'lodash'
import {
  Vector2,
  Vector3
} from 'three'
import scene from '../scene'
import Box from '../meshes/Box'
import { getIntersects } from '../raycaster'
import { BOX_SIZE } from '../config'
import store from '../store'

// Constants
export const ADD_MODE = 'add'
export const REMOVE_MODE = 'remove'

// Actions
export const NONE = 'app/NONE'
export const RENDER = 'app/RENDER'
export const MOUSEMOVE = 'app/MOUSEMOVE'
export const REFRESH_FOCUS = 'app/REFRESH_FOCUS'
export const FOCUS_BOX = 'app/FOCUS_BOX'
export const FOCUSOUT_BOX = 'app/FOCUSOUT_BOX'
export const ADD_BOX = 'app/ADD_BOX'
export const REMOVE_BOX = 'app/REMOVE_BOX'
export const CHANGE_MODE = 'app/CHANGE_MODE'

// Action Creators
export const mousemove = (position) => ({ type: MOUSEMOVE, position })
export const focusBox = (box) => ({ type: FOCUS_BOX, box })
export const focusoutBox = () => ({ type: FOCUSOUT_BOX })
export const addBox = (position) => ({ type: ADD_BOX, position })
export const removeBox = (box) => ({ type: REMOVE_BOX, box })
export const changeMode = (mode) => ({ type: CHANGE_MODE, mode })
export const click = (position) => {
  const { app: { mode, mousePosition } } = store.getState()
  const intersects = getIntersects(mousePosition)
  if (intersects.length === 0) return { type: NONE }
  const intersect = intersects[0]
  switch (mode) {
    case REMOVE_MODE:
      return removeBox(intersect.object)
    case ADD_MODE:
      const position = new Vector3()
      position.copy(intersect.point)
      position.add(intersect.face.normal)
      position.divideScalar(BOX_SIZE).floor().multiplyScalar(BOX_SIZE).addScalar(BOX_SIZE / 2)
      return addBox(position)
    default:
      return { type: NONE }
  }
}
export const refreshFocus = () => {
  const { app: { mousePosition } } = store.getState()
  const intersects = getIntersects(mousePosition)
  if (intersects.length === 0) {
    return focusoutBox()
  } else {
    const intersect = intersects[0]
    return focusBox(intersect.object)
  }
}

// Reducer
const INITIAL_STATE = {
  mode: ADD_MODE,
  focusedBox: null,
  mousePosition: new Vector2(),
  boxes: {}
}
const appReducer = (state = INITIAL_STATE, action) => {
  const { mode, box, position } = action
  const { focusedBox } = state

  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        mode
      }
    case MOUSEMOVE:
      return {
        ...state,
        mousePosition: position
      }
    case ADD_BOX:
      const newBox = new Box()
      newBox.position.copy(position)
      scene.add(newBox)
      return {
        ...state,
        boxes: _.set(state.boxes, newBox.id, newBox)
      }
    case REMOVE_BOX:
      scene.remove(box)
      return {
        ...state,
        boxes: _.unset(state.boxes, box.id)
      }
    case FOCUS_BOX:
      if (focusedBox) focusedBox.removeHighlight()
      box.highlight()
      return {
        ...state,
        focusedBox: box
      }
    case FOCUSOUT_BOX:
      if (!focusedBox) return state
      focusedBox.removeHighlight()
      return {
        ...state,
        focusedBox: null
      }
    default:
      return state
  }
}
export default appReducer
