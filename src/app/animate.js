import Stats from 'stats.js'
import {
  FRAME_INTERVAL,
  CAMERA_RADIUS,
  CAMERA_ANGLE_INTERVAL
} from './config'
import scene from './scene'
import camera from './camera'
import renderer from './renderer'

// Attach stats
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

let startTime = null
let cameraAngle = 0
function animate (timestamp) {
  if (!startTime) { startTime = timestamp }
  let progress = timestamp - startTime

  if (progress > FRAME_INTERVAL) {
    startTime = null
    render()
  }
  window.requestAnimationFrame(animate)
}

function render () {
  cameraAngle += CAMERA_ANGLE_INTERVAL
  camera.position.x = Math.sin(cameraAngle) * CAMERA_RADIUS
  camera.position.z = Math.cos(cameraAngle) * CAMERA_RADIUS
  camera.lookAt(scene.position)
  camera.updateMatrixWorld()
  renderer.render(scene, camera)
  stats.update()
}

export default animate
