import {
  PerspectiveCamera
} from 'three'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from './config'

// Camera
const camera = new PerspectiveCamera(
  30,
  SCREEN_WIDTH / SCREEN_HEIGHT,
  1,
  10000
)

export default camera
