import Vector from './Vector.js'
import { ctx } from './platno.js'
import { kamera } from './Kamera.js'

export default class Predmet {
  constructor(src, { x, y, z, skalar = 2 } = {}) {
    this.polozaj = new Vector(x, y, z)
    this.skalar = skalar
    this.slika = new Image()
    this.slika.onload = () => {
      this.sirina = this.slika.naturalWidth * this.skalar
      this.visina = this.slika.naturalHeight * this.skalar
    }
    this.slika.src = src
  }

  outOfBounds(z, x, y, sirina, visina) {
    return z <= kamera.z || x < 0 || y < 0 || x >= window.innerWidth - sirina || y >= window.innerHeight - visina
  }

  project() {
    const cos = Math.cos(kamera.rotation)
    const sin = Math.sin(kamera.rotation)
    const rotatedX = this.polozaj.x * cos - this.polozaj.z * sin
    const rotatedZ = this.polozaj.x * sin + this.polozaj.z * cos
    const dz = window.innerHeight / (kamera.z - rotatedZ)
    return {
      dz,
      x: (kamera.x + rotatedX) * dz + window.innerWidth / 2,
      y: (kamera.y + this.polozaj.y) * dz + window.innerHeight / 2,
    }
  }

  render() {
    const P = this.project()
    const SZ = P.dz / window.innerHeight
    const X_OFFS = this.sirina / 6
    if (this.outOfBounds(this.polozaj.z, P.x + X_OFFS, P.y, this.sirina * SZ, this.visina * SZ)) return

    ctx.drawImage(this.slika, P.x + X_OFFS, P.y, this.sirina * SZ, this.visina * SZ)
  }
}
