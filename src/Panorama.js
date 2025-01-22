import { platno, ctx } from './platno.js'

export default class Panorama {
  constructor() {
    this.slika = new Image()
    this.slika.src = 'slike/planine.png'
  }

  render(worldRot) {
    const scaledWidth = window.innerWidth * 2
    const scaledHeight = window.innerHeight * 0.4
    const bgOffsetX = (worldRot / Math.PI * 2) * 100 % scaledWidth

    ctx.fillStyle = '#403'
    ctx.fillRect(0, 0, platno.width, 300)

    ctx.fillStyle = '#030'
    ctx.fillRect(0, 300, platno.width, platno.height)

    for (let x = bgOffsetX - scaledWidth; x < window.innerWidth; x += scaledWidth)
      ctx.drawImage(this.slika, x, 100, scaledWidth, scaledHeight)
  }
}