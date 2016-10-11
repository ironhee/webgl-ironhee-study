import React from 'react'
import { connect } from 'react-redux'
import Stats from 'stats.js'
import Rx from 'rx-dom'
import { Vector2 } from 'three'
import {
  ADD_MODE,
  REMOVE_MODE,
  changeMode,
  click,
  mousemove,
  refreshFocus
} from '../ducks/app'
import {
  FRAME_INTERVAL
} from '../config'
import scene from '../scene'
import camera from '../camera'
import renderer from '../renderer'

class Mode extends React.Component {

  componentDidMount () {
    const {
      onClick,
      onMousemove,
      onRefreshFocus
    } = this.props

    // Attach stat
    const stats = new Stats()
    stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(stats.dom)

    // Click
    const mouseClickStream = Rx.DOM.click(window)
      .map(getPositionFromMouseEvent)
    const touchStream = Rx.DOM.touchstart
      ? Rx.DOM.touchstart(window).map(getPositionFromTouchEvent) : new Rx.Subject()
    const clickStream = Rx.Observable.merge(
      mouseClickStream,
      touchStream
    )
    clickStream
      .throttle(250)
      .subscribe((position) => onClick(position))

    // Mousemove
    Rx.DOM.mousemove(window)
      .throttle(50)
      .map(getPositionFromMouseEvent)
      .subscribe((position) => onMousemove(position))

    // Render
    let startTime = null
    function onFrame (timestamp) {
      if (!startTime) { startTime = timestamp }
      let progress = timestamp - startTime
      if (progress > FRAME_INTERVAL) {
        startTime = null
        camera.lookAt(scene.position)
        camera.updateMatrixWorld()
        onRefreshFocus(timestamp)
        renderer.render(scene, camera)
      }
      stats.update()
      window.requestAnimationFrame(onFrame)
    }
    window.requestAnimationFrame(onFrame)
  }

  shouldComponentUpdate (props) {
    return this.props.mode !== props.mode
  }

  render () {
    const { onClickMode, mode } = this.props

    const style = {
      position: 'fixed',
      top: 0,
      right: 0
    }
    return (
      <div id='control' style={style}>
        <span>MODE: { mode }</span>
        <button onClick={() => onClickMode(ADD_MODE)}>ADD</button>
        <button onClick={() => onClickMode(REMOVE_MODE)}>REMOVE</button>
      </div>
    )
  }
}

export default connect(
  (state) => state.app,
  (dispatch) => ({
    onClick: (position) => {
      dispatch(click(position))
    },
    onMousemove: (position) => {
      dispatch(mousemove(position))
    },
    onRefreshFocus: (timestamp) => {
      dispatch(refreshFocus(timestamp))
    },
    onClickMode: (mode) => {
      dispatch(changeMode(mode))
    }
  })
)(Mode)

// Helpers
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
