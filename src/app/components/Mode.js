import React from 'react'
import { connect } from 'react-redux'
import { changeMode, ADD_MODE, REMOVE_MODE } from '../ducks/app'

class Mode extends React.Component {
  render () {
    const { mode, dispatch } = this.props

    const style = {
      position: 'fixed',
      top: 0,
      right: 0
    }
    return (
      <div id='control' style={style}>
        <span>MODE: { mode }</span>
        <button onClick={() => dispatch(changeMode(ADD_MODE))}>ADD</button>
        <button onClick={() => dispatch(changeMode(REMOVE_MODE))}>REMOVE</button>
      </div>
    )
  }
}

export default connect(
  (state) => state.app
)(Mode)
