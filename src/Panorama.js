import { platno, ctx } from './platno.js'

export default class Panorama {
  constructor() {
    this.slika = new Image()
    this.slika.src = 'slike/planine.png'
    this.bojaNeba = '#403'
    this.bojaTla = '#030'
    this.granicaTla = platno.height * 0.55
    this.rotacija = 0
    this.faktorPomeranja = 500
  }

  get bgOffsetX() {
    return (this.rotacija * this.faktorPomeranja + this.slika.width) % this.slika.width
  }

  rotate(ugao) {
    this.rotacija += ugao
  }

  render() {
    if (!this.slika.complete) return

    ctx.fillStyle = this.bojaNeba
    ctx.fillRect(0, 0, platno.width, this.granicaTla)

    for (let x = this.bgOffsetX - this.slika.width; x < window.innerWidth; x += this.slika.width)
      ctx.drawImage(this.slika, x, this.granicaTla - this.slika.height, this.slika.width, this.slika.height)

    ctx.fillStyle = this.bojaTla
    ctx.fillRect(0, this.granicaTla, platno.width, platno.height)
  }
}
