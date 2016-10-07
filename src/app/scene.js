import {
  Scene,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'
import {
  BOX_SIZE
} from './config'
import Box from './meshes/Box'

const scene = new Scene()

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

const directionalLight3 = new DirectionalLight(0x404040)
directionalLight3.position.x = Math.random() - 0.5
directionalLight3.position.y = Math.random() - 0.5
directionalLight3.position.z = Math.random() - 0.5
directionalLight3.position.normalize()
scene.add(directionalLight3)

// Box Meshes
const box1 = new Box()
const box2 = new Box()
const box3 = new Box()
const box4 = new Box()
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

export default scene
