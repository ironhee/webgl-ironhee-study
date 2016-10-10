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

camera.position.x = CAMERA_RADIUS * 1
camera.position.y = CAMERA_RADIUS * 1.5
camera.position.z = CAMERA_RADIUS * 1

export default camera
