function initWebGL (canvas) {
  let gl = null

  gl = canvas.getContext('webgl') ||
    canvas.getContext('experimental-webgl')

  return gl
}

const canvas = document.createElement('canvas')
canvas.setAttribute('width', 640)
canvas.setAttribute('height', 640)
document.getElementsByTagName('body')[0].appendChild(canvas)

const gl = initWebGL(canvas)
gl.clearColor(0.0, 0.0, 0.0, 0.3)
gl.enable(gl.DEPTH_TEST)
gl.depthFunc(gl.LEQUAL)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
gl.viewport(0, 0, canvas.width, canvas.height)
