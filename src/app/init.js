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
import interactStream from './streams/interactStream'
import Mode from './components/Mode'
import Box from './meshes/Box'

export default function init () {
  ReactDOM.render(
    <Provider store={store}>
      <Mode />
    </Provider>,
    document.body
  )

  document.body.appendChild(renderer.domElement)
  window.requestAnimationFrame(animate)

  interactStream
    .filter(() => store.getState().app.mode === REMOVE_MODE)
    .subscribe((intersect) => {
      scene.remove(intersect.object)
    })

  interactStream
    .filter(() => store.getState().app.mode === ADD_MODE)
    .subscribe((intersect) => {
      const newBox = new Box()
      newBox.position.copy(intersect.point)
      newBox.position.add(intersect.face.normal)
      newBox.position.divideScalar(BOX_SIZE).floor().multiplyScalar(BOX_SIZE).addScalar(BOX_SIZE / 2)
      scene.add(newBox)
    })
}
