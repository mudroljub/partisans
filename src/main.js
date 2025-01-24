import { elements } from './data.js'
import Predmet from './Predmet.js'
import Panorama from './Panorama.js'
import { camera } from './Camera.js'

const sensitivity = 0.02
const sprites = []
let deltaRot = 0

const randSpread = range => range * (Math.random() - Math.random())

/* INIT */

const pozadina = new Panorama()

const createSprites = el => {
  for (let i = 0; i < el.number; ++i) {
    const origin = el.origin ?? { x: 0, y: 0, z: 0 }
    const range = el.range ?? { x: 10, y: 0, z: 10 }
    const x = origin.x + randSpread(range.x)
    const y = origin.y + randSpread(range.y)
    const z = origin.z + randSpread(range.z)
    sprites.push(new Predmet(el.urls[i % el.urls.length], { x, y, z }))
  }
}

elements.forEach(createSprites)
loop()

/* LOOP */

function loop() {
  requestAnimationFrame(loop)
  camera.rotation += deltaRot

  pozadina.render()

  sprites
    .sort((a, b) => b.polozaj.z - a.polozaj.z)
    .forEach(s => s.render())
}

/* EVENTS */

document.addEventListener('mousemove', e => {
  const MOUSE_X = e.clientX - window.innerWidth / 2
  deltaRot = (-MOUSE_X / window.innerWidth) * sensitivity
})
