export default class Vector {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  rotate(ang) {
    const cos = Math.cos(ang)
    const sin = Math.sin(ang)
    this.x = this.x * cos - this.z * sin
    this.z = this.x * sin + this.z * cos
  }
}
