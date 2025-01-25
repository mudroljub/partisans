import Vector from './Vector.js'

export class Kamera extends Vector {
  constructor() {
    super(0, -.9, -2)
    this.rotacija = 0
  }
}

export const kamera = new Kamera