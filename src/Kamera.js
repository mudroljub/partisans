import Vector from './Vector.js'

export class Kamera extends Vector {
  constructor() {
    super(0, -.9, -2)
  }
}

export const kamera = new Kamera