import {
  BoxBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  TextureLoader,
  NearestFilter,
  LinearMipMapLinearFilter
} from 'three'
import {
  BOX_SIZE
} from '../config'

const boxTexture = new TextureLoader().load('assets/box.jpg')
boxTexture.magFilter = NearestFilter
boxTexture.minFilter = LinearMipMapLinearFilter

class Box extends Mesh {
  constructor (options = {}) {
    const {
      geometry = new BoxBufferGeometry(BOX_SIZE, BOX_SIZE, BOX_SIZE),
      material = new MeshLambertMaterial({ map: boxTexture })
    } = options
    geometry.computeBoundingSphere()
    super(geometry, material)
    this.basicColor = this.material.color.getHex()
    this.highlightColor = 0xff0000
  }

  highlight () {
    this.material.color.setHex(this.highlightColor)
  }

  removeHighlight () {
    this.material.color.setHex(this.basicColor)
  }
}

export default Box
