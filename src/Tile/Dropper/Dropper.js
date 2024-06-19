class Dropper extends Tile {
  constructor(type, x, y, sizeX, sizeY, facing = "down") {
    super(type, x, y, sizeX, sizeY);
    this.color = "gray";
    this.facing = facing;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * this.sizeX,
      this.y * this.sizeY,
      this.sizeX,
      this.sizeY
    );
    // draw text dead center of box
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.facing,
      this.x * this.sizeX + this.sizeX / 2,
      this.y * this.sizeY + this.sizeY / 2
    );

  }
  setColor() {
    this.color = "red";
  }
}
