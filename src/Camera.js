import Vector from './Vector.js'

export default class Camera extends Vector {
  constructor() {
    super(0, -.9, -2)
    this.rotation = 0
  }
}

export const camera = new Camera()