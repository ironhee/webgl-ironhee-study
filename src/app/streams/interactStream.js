import {
  Vector2
} from 'three'
import Rx from 'rx-dom'
import scene from '../scene'
import camera from '../camera'
import raycaster from '../raycaster'

function getPositionFromMouseEvent (event) {
  const { clientX, clientY } = event

  return new Vector2(
    (clientX / window.innerWidth) * 2 - 1,
    -1 * (clientY / window.innerHeight) * 2 + 1
  )
}

function getPositionFromTouchEvent (event) {
  const { changedTouches } = event
  const { clientX, clientY } = changedTouches[0]

  return new Vector2(
    (clientX / window.innerWidth) * 2 - 1,
    -1 * (clientY / window.innerHeight) * 2 + 1
  )
}

function getIntersects (position) {
  raycaster.setFromCamera(position, camera)
  return raycaster.intersectObjects(scene.children)
}

const clickStream = Rx.DOM.click(document.body)
const touchStream = Rx.DOM.touchstart ? Rx.DOM.touchstart(document.body) : new Rx.Subject()

const interactStream = clickStream
  .map(getPositionFromMouseEvent)
  .merge(touchStream.map(getPositionFromTouchEvent))
  .throttle(250)
  .map(getIntersects)
  .filter(intersects => intersects.length > 0)
  .map(intersects => intersects[0])

export default interactStream
