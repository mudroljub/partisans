import Sprite from './Sprite.js'
import { elements } from './data.js'
import { platno, ctx } from './platno.js'

const bgImage = new Image()
bgImage.src = 'slike/planine.png'

const totalImages = elements.reduce((acc, el) => acc + el.urls.length, 0)
const sensitivity = 0.02
const sprites = []

let worldRot = 0
let dWorldRot = 0
let loadedImages = 0

/* INIT */

const createSprites = el => {
  for (let i = 0; i < el.number; ++i) {
    const origin = el.origin ?? { x: 0, y: 0, z: 0 }
    const range = el.range ?? { x: 10, y: 0, z: 10 }
    sprites.push(new Sprite(el.urls[i % el.urls.length], { origin, range }))
  }
}

const loadImages = el => el.urls.forEach(url => {
  const img = new Image()
  img.src = url
  img.addEventListener('load', () => {
    if (++loadedImages < totalImages) return

    elements.forEach(createSprites)
    loop()
  })
})

elements.forEach(loadImages)

/* LOOP */

function loop() {
  requestAnimationFrame(loop)

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
  worldRot += dWorldRot * 10

  const scaledWidth = window.innerWidth * 2
  const scaledHeight = window.innerHeight * 0.4
  const bgOffsetX = (worldRot / Math.PI * 2) * 100 % scaledWidth

  ctx.fillStyle = '#403'
  ctx.fillRect(0, 0, platno.width, 300)

  ctx.fillStyle = '#030'
  ctx.fillRect(0, 300, platno.width, platno.height)

  for (let x = bgOffsetX - scaledWidth; x < window.innerWidth; x += scaledWidth)
    ctx.drawImage(bgImage, x, 100, scaledWidth, scaledHeight)

  sprites
    .sort((a, b) => b.position.z - a.position.z)
    .forEach(s => {
      s.rotate(dWorldRot)
      s.render()
    })
}

/* EVENTS */

document.addEventListener('mousemove', e => {
  const MOUSE_X = e.clientX - window.innerWidth / 2
  dWorldRot = (-MOUSE_X / window.innerWidth) * sensitivity
})
