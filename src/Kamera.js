import Vector from './Vector.js'

export default class Kamera extends Vector {
  constructor() {
    super(0, -.9, -2)
    this.rotation = 0
  }
}

export const kamera = new Kamera()