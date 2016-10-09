import {
  Raycaster
} from 'three'
import camera from './camera'
import scene from './scene'

const raycaster = new Raycaster()

export function getIntersects (position) {
  raycaster.setFromCamera(position, camera)
  return raycaster.intersectObjects(scene.children)
}

export default raycaster
