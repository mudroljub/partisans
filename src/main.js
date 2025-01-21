import Vector from "./Vector.js"
import { elements } from "./data.js"

const mountains = document.getElementById('sky-box')
const canvas = document.getElementById('platno')
const ctx = canvas.getContext('2d')

const randSpread = range => range * (Math.random() - Math.random())

const totalImages = elements.reduce((acc, el) => acc + el.urls.length, 0)
const sprites = []
const sensitivity = 0.04
const cameraPos = { x: 0, y: -.9, z: -2 }

let width, height
let worldRot = 0
let dWorldRot = 0
let loadedImages = 0

/* CLASSES */

const camera = new Vector(cameraPos.x, cameraPos.y, cameraPos.z)

class Sprite {
  constructor(el) {
    const origin = el.origin ? el.origin : { x: 0, y: 0, z: 0 }
    const range = el.range ? el.range : { x: 10, y: 0, z: 10 }
    const x = origin.x + randSpread(range.x)
    const y = origin.y + randSpread(range.y)
    const z = origin.z + randSpread(range.z)
    this.v = new Vector(x, y, z)

    this.image = new Image()
    this.image.src = el.urls[(Math.random() * el.urls.length) | 0]

    this.size = 2
    this.xl = this.image.naturalWidth * this.size
    this.yl = this.image.naturalHeight * this.size
  }

  rotate(ang) {
    this.v.rotate(ang)
  }

  outOfBounds(z, x, y, xl, yl) {
    return z <= camera.z || x < 0 || y < 0 || x >= width - xl || y >= height - yl
  }

  project() {
    const dz = height / (camera.z - this.v.z)
    const px = (camera.x + this.v.x) * dz
    const py = (camera.y + this.v.y) * dz
    return {
      x: px + width / 2,
      y: py + height / 2,
      dz,
      z: this.v.z
    }
  }

  render() {
    const P = this.project()
    const SZ = P.dz / height
    const X_OFFS = this.xl / 6
    if (this.outOfBounds(P.z, P.x + X_OFFS, P.y, this.xl * SZ, this.yl * SZ)) return

    ctx.beginPath()
    ctx.drawImage(this.image, P.x + X_OFFS, P.y, this.xl * SZ, this.yl * SZ)
    ctx.closePath()
  }
}

/* FUNCTIONS */

const resize = () => {
  width = window.innerWidth
  height = window.innerHeight
  canvas.width = width * devicePixelRatio | 0
  canvas.height = height * devicePixelRatio | 0
  ctx.scale(devicePixelRatio, devicePixelRatio)
}

const createSprites = el => {
  for (let i = 0; i < el.number; ++i)
    sprites.push(new Sprite(el))
}

const loadImages = el => el.urls.forEach(url => {
  const img = new Image()
  img.src = url
  img.addEventListener('load', () => {
    if (++loadedImages == totalImages) init()
  })
})

/* INIT */

resize()
elements.forEach(loadImages)

function init() {
  elements.forEach(createSprites)
  loop()
}

/* LOOP */

function loop() {
  requestAnimationFrame(loop)

  ctx.clearRect(0, 0, width, height)
  worldRot += dWorldRot

  mountains.style.backgroundPosition = -((worldRot / Math.PI) * 2) * 100 + '%'

  sprites.sort((a, b) => b.v.z - a.v.z).forEach(s => {
    s.rotate(dWorldRot)
    s.render()
  })
}

/* EVENTS */

document.addEventListener('mousemove', e => {
  const MOUSE_X = e.clientX - width / 2
  dWorldRot = (-MOUSE_X / width) * sensitivity
})

window.onresize = resize
