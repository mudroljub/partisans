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

  rotate(ugao) {
    const cos = Math.cos(ugao)
    const sin = Math.sin(ugao)
    this.polozaj.x = this.polozaj.x * cos - this.polozaj.z * sin
    this.polozaj.z = this.polozaj.x * sin + this.polozaj.z * cos
  }

  outOfBounds(z, x, y, sirina, visina) {
    return z <= kamera.z || x < 0 || y < 0 || x >= window.innerWidth - sirina || y >= window.innerHeight - visina
  }

  project() {
    const dz = window.innerHeight / (kamera.z - this.polozaj.z)
    const x = (kamera.x + this.polozaj.x) * dz + window.innerWidth / 2
    const y = (kamera.y + this.polozaj.y) * dz + window.innerHeight / 2
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
    if (this.outOfBounds(this.polozaj.z, P.x + X_OFFS, P.y, this.sirina * SZ, this.visina * SZ)) return

    ctx.drawImage(this.slika, P.x + X_OFFS, P.y, this.sirina * SZ, this.visina * SZ)
  }
}
