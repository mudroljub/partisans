import Sprite from './Sprite.js'
import { elements } from './data.js'
import { ctx } from './platno.js'

const mountains = document.getElementById('sky-box')

const totalImages = elements.reduce((acc, el) => acc + el.urls.length, 0)
const sprites = []
const sensitivity = 0.04

let worldRot = 0
let dWorldRot = 0
let loadedImages = 0

/* INIT */

const createSprites = el => {
  for (let i = 0; i < el.number; ++i)
    sprites.push(new Sprite(el))
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
  worldRot += dWorldRot

  mountains.style.backgroundPosition = -((worldRot / Math.PI) * 2) * 100 + '%'

  sprites.sort((a, b) => b.v.z - a.v.z).forEach(s => {
    s.rotate(dWorldRot)
    s.render()
  })
}

/* EVENTS */

document.addEventListener('mousemove', e => {
  const MOUSE_X = e.clientX - window.innerWidth / 2
  dWorldRot = (-MOUSE_X / window.innerWidth) * sensitivity
})
