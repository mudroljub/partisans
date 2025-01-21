export const platno = document.getElementById('platno')
export const ctx = platno.getContext('2d')

const resize = () => {
  platno.width = window.innerWidth * devicePixelRatio | 0
  platno.height = window.innerHeight * devicePixelRatio | 0
  ctx.scale(devicePixelRatio, devicePixelRatio)
}

resize()

window.onresize = resize
