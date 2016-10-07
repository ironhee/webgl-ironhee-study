import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Mesh
} from 'three'
import {
  BOX_SIZE
} from '../config'

const material = new MeshLambertMaterial({
  // color: Math.random() * 0xffffff
  color: 0x00ffff,
  overdraw: 0.5
})

class Box extends Mesh {
  constructor (geometry = new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE)) {
    super(geometry, material)
  }
}

export default Box
