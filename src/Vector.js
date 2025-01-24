export default class Vector {
  constructor(x, y, z) {
    this.x = x
    this.y = y
    this.z = z
  }

  rotate(ugao) {
    const cos = Math.cos(ugao)
    const sin = Math.sin(ugao)
    this.x = this.x * cos - this.z * sin
    this.z = this.x * sin + this.z * cos
  }
}
