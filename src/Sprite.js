import Vector from './Vector.js'
import { ctx } from './platno.js'

const randSpread = range => range * (Math.random() - Math.random())

const cameraPos = { x: 0, y: -.9, z: -2 }
const camera = new Vector(cameraPos.x, cameraPos.y, cameraPos.z)

export default class Sprite {
  constructor(src, { origin, range } = {}) {
    const x = origin.x + randSpread(range.x)
    const y = origin.y + randSpread(range.y)
    const z = origin.z + randSpread(range.z)
    this.position = new Vector(x, y, z)

    this.image = new Image()
    this.image.src = src

    this.skalar = 2
    this.xl = this.image.naturalWidth * this.skalar
    this.yl = this.image.naturalHeight * this.skalar
  }

  rotate(ang) {
    this.position.rotate(ang)
  }

  outOfBounds(z, x, y, xl, yl) {
    return z <= camera.z || x < 0 || y < 0 || x >= window.innerWidth - xl || y >= window.innerHeight - yl
  }

  project() {
    const dz = window.innerHeight / (camera.z - this.position.z)
    const x = (camera.x + this.position.x) * dz + window.innerWidth / 2
    const y = (camera.y + this.position.y) * dz + window.innerHeight / 2
    return {
      x,
      y,
      dz,
    }
  }

  render() {
    const P = this.project()
    const SZ = P.dz / window.innerHeight
    const X_OFFS = this.xl / 6
    if (this.outOfBounds(this.position.z, P.x + X_OFFS, P.y, this.xl * SZ, this.yl * SZ)) return

    ctx.drawImage(this.image, P.x + X_OFFS, P.y, this.xl * SZ, this.yl * SZ)
  }
}
