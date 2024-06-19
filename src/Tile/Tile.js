class Tile {
  constructor(type, x, y, sizeX, sizeY) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.sizeX = width / sizeX;
    this.sizeY = height / sizeY;

    this.type = type;
    this.color = 'white';

    this.setColor();
  }
  draw() {
    if(this.type === 'empty') return;
    ctx.fillStyle = "lightgray";
    ctx.fillRect(
      this.x * this.sizeX,
      this.y * this.sizeY,
      this.sizeX,
      this.sizeY
    );
    // draw text dead center of box
    ctx.fillStyle = 'black';
    ctx.font = '15px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      this.type,
      this.x * this.sizeX + this.sizeX / 2,
      this.y * this.sizeY + this.sizeY / 2
    );

  }
  setColor() {
    // switch(this.type) {
    //   case 'ground':
    //     this.color = 'gray';
    //     break;
    //   case 'water':
    //     this.color = 'blue';
    //     break;
    //   case 'tree':
    //     this.color = 'green';
    //     break;
    //   default:
    //     this.color = 'white';
    // }
  }
}