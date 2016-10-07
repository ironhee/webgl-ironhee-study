import {
  PerspectiveCamera
} from 'three'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  CAMERA_RADIUS
} from './config'

// Camera
const camera = new PerspectiveCamera(
  30,
  SCREEN_WIDTH / SCREEN_HEIGHT,
  1,
  10000
)
camera.position.x = CAMERA_RADIUS
camera.position.y = CAMERA_RADIUS * 0.8
camera.position.z = CAMERA_RADIUS

export default camera
