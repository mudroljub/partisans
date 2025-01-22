import Vector from './Vector.js'
import { ctx } from './platno.js'

const camera = new Vector(0, -.9, -2)

export default class Sprite {
  constructor(src, { x, y, z, skalar = 2 } = {}) {
    this.position = new Vector(x, y, z)
    this.skalar = skalar
    this.slika = new Image()
    this.slika.onload = () => {
      this.sirina = this.slika.naturalWidth * this.skalar
      this.visina = this.slika.naturalHeight * this.skalar
    }
    this.slika.src = src
  }

  rotate(ang) {
    const cos = Math.cos(ang)
    const sin = Math.sin(ang)
    this.position.x = this.position.x * cos - this.position.z * sin
    this.position.z = this.position.x * sin + this.position.z * cos
  }

  outOfBounds(z, x, y, sirina, visina) {
    return z <= camera.z || x < 0 || y < 0 || x >= window.innerWidth - sirina || y >= window.innerHeight - visina
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
    const X_OFFS = this.sirina / 6
    if (this.outOfBounds(this.position.z, P.x + X_OFFS, P.y, this.sirina * SZ, this.visina * SZ)) return

    ctx.drawImage(this.slika, P.x + X_OFFS, P.y, this.sirina * SZ, this.visina * SZ)
  }
}
