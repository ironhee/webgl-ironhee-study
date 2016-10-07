import {
  WebGLRenderer
} from 'three'
import {
  DEVICE_PIXEL_RATIO,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from './config'

const renderer = new WebGLRenderer()
renderer.setClearColor(0xf0f0f0)
renderer.setPixelRatio(DEVICE_PIXEL_RATIO)
renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT)
renderer.sortObjects = false

export default renderer
