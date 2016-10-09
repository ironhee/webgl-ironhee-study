import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import {
  BOX_SIZE
} from './config'
import { REMOVE_MODE, ADD_MODE } from './ducks/app'
import scene from './scene'
import animate from './animate'
import renderer from './renderer'
import { getIntersects } from './raycaster'
import Mode from './components/Mode'
import Box from './meshes/Box'
import { clickStream, mousemoveStream } from './streams'

export default function init () {
  ReactDOM.render(
    <Provider store={store}>
      <Mode />
    </Provider>,
    document.body
  )

  document.body.appendChild(renderer.domElement)
  window.requestAnimationFrame(animate)

  clickStream
    .filter(() => store.getState().app.mode === REMOVE_MODE)
    .subscribe((intersect) => {
      scene.remove(intersect.object)
    })

  clickStream
    .filter(() => store.getState().app.mode === ADD_MODE)
    .subscribe((intersect) => {
      const newBox = new Box()
      newBox.position.copy(intersect.point)
      newBox.position.add(intersect.face.normal)
      newBox.position.divideScalar(BOX_SIZE).floor().multiplyScalar(BOX_SIZE).addScalar(BOX_SIZE / 2)
      scene.add(newBox)
    })

  let highlightedBox = null
  mousemoveStream
    .map(getIntersects)
    .subscribe((intersects) => {
      if (intersects.length === 0) {
        if (!highlightedBox) return
        highlightedBox.removeHighlight()
        highlightedBox = null
        return
      } else {
        const intersect = intersects[0]
        if (highlightedBox) highlightedBox.removeHighlight()
        intersect.object.highlight()
        highlightedBox = intersect.object
      }
    })
}
