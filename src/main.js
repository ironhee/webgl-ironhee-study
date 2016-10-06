import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PlaneGeometry,
  BoxBufferGeometry,
  MeshLambertMaterial,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Raycaster,
  AmbientLight,
  DirectionalLight
} from 'three'
import Stats from 'stats.js'
import Rx from 'rx-dom'

const FPS = 60
const FRAME_INTERVAL = 1000 / FPS
const DEVICE_PIXEL_RATIO = window.devicePixelRatio
const SCREEN_WIDTH = window.innerWidth
const SCREEN_HEIGHT = window.innerHeight
const CAMERA_RADIUS = 100
const CAMERA_ANGLE_INTERVAL = (2 * Math.PI) / 720
const BOX_SIZE = 10

// Attach stats
const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

// Scene...
const scene = new Scene()

const camera = new PerspectiveCamera(
  30,
  SCREEN_WIDTH / SCREEN_HEIGHT,
  1,
  10000
)
camera.position.x = CAMERA_RADIUS
camera.position.y = CAMERA_RADIUS * 0.8
camera.position.z = CAMERA_RADIUS

// Lights
const ambientLight = new AmbientLight(0x606060)
scene.add(ambientLight)

const directionalLight1 = new DirectionalLight(0xffffff)
directionalLight1.position.x = Math.random() - 0.5
directionalLight1.position.y = Math.random() - 0.5
directionalLight1.position.z = Math.random() - 0.5
directionalLight1.position.normalize()
scene.add(directionalLight1)

const directionalLight2 = new DirectionalLight(0x808080)
directionalLight2.position.x = Math.random() - 0.5
directionalLight2.position.y = Math.random() - 0.5
directionalLight2.position.z = Math.random() - 0.5
directionalLight2.position.normalize()
scene.add(directionalLight2)

// Box Meshes
const boxMaterial = new MeshLambertMaterial({
  // color: Math.random() * 0xffffff
  color: 0x00ffff,
  overdraw: 0.5
})
const box1 = new Mesh(new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE), boxMaterial)
const box2 = new Mesh(new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE), boxMaterial)
const box3 = new Mesh(new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE), boxMaterial)
const box4 = new Mesh(new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE), boxMaterial)
box1.geometry.translate(-BOX_SIZE / 2, BOX_SIZE / -2, -BOX_SIZE / 2)
box2.geometry.translate(BOX_SIZE / 2, BOX_SIZE / -2, -BOX_SIZE / 2)
box3.geometry.translate(BOX_SIZE / 2, BOX_SIZE / -2, BOX_SIZE / 2)
box4.geometry.translate(-BOX_SIZE / 2, BOX_SIZE / -2, BOX_SIZE / 2)
scene.add(box1)
scene.add(box2)
scene.add(box3)
scene.add(box4)

// Ground
const plane = new Mesh(
  new PlaneGeometry(BOX_SIZE * 10, BOX_SIZE * 10, 10, 10),
  new MeshBasicMaterial({ color: 0x555555, wireframe: true })
)
plane.geometry.translate(0, 0, BOX_SIZE)
plane.geometry.rotateX(Math.PI / 180 * 90)
scene.add(plane)

// Renderer
const renderer = new WebGLRenderer()
renderer.setClearColor(0xf0f0f0)
renderer.setPixelRatio(DEVICE_PIXEL_RATIO)
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
renderer.sortObjects = false
document.body.appendChild(renderer.domElement)

const raycaster = new Raycaster()

// ANIMATE
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

window.requestAnimationFrame(animate)
var obs = Rx.Observable.return(animate, Rx.Scheduler.requestAnimationFrame)

obs.subscribe(function (x) {
  // Scheduled using requestAnimationFrame
  console.log(x);
});

const touchStream = Rx.DOM.touchstart(document.body)

const multiClickStream = touchStream
  .timeInterval()
  .filter(x => x.interval < 300)
  .map(x => x.value)

// Same as above, but detects single clicks
const singleClickStream = touchStream
  .timeInterval()
  .filter(x => x.interval > 300)
  .map(x => x.value)

function getTouchPosition (event) {
  const { changedTouches } = event
  const { clientX, clientY } = changedTouches[0]

  return new Vector2(
    (clientX / window.innerWidth) * 2 - 1,
    -1 * (clientY / window.innerHeight) * 2 + 1
  )
}

function getTouchedIntersects (position) {
  raycaster.setFromCamera(position, camera)
  return raycaster.intersectObjects(scene.children)
}

multiClickStream
  .map(getTouchPosition)
  .map(getTouchedIntersects)
  .filter(intersects => intersects.length > 0)
  .map(intersects => intersects[0])
  .subscribe((intersect) => {
    scene.remove(intersect.object)
  })

singleClickStream
  .map(getTouchPosition)
  .map(getTouchedIntersects)
  .filter(intersects => intersects.length > 0)
  .map(intersects => intersects[0])
  .subscribe((intersect) => {
    const newBox = new Mesh(new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE), boxMaterial)
    newBox.position.copy(intersect.point)
    newBox.position.add(intersect.face.normal)
    newBox.position.divideScalar(BOX_SIZE).floor().multiplyScalar(BOX_SIZE).addScalar(BOX_SIZE / 2)
    scene.add(newBox)
  })
