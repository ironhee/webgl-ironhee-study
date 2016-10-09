import _ from 'lodash'
import {
  Scene,
  AmbientLight,
  DirectionalLight
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

// Box Meshes
const XWIDTH = 4
const ZWIDTH = 4
_.times(XWIDTH, (x) => {
  _.times(ZWIDTH, (z) => {
    const box1 = new Box()
    box1.geometry.translate(BOX_SIZE * (x - XWIDTH / 2) + BOX_SIZE / 2, BOX_SIZE / 2, BOX_SIZE * (z - ZWIDTH / 2) + BOX_SIZE / 2)
    scene.add(box1)
  })
})

export default scene
