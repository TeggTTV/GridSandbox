class Chest extends Tile {
  constructor(type, x, y, sizeX, sizeY, maxItems) {
    super(type, x, y, sizeX, sizeY);
    this.color = "orange";
    this.items = [];
    this.maxItems = maxItems;
    this.isAccepting = true;

    this.inputs = ["up", "down", "left", "right"];
  }
  update() {
    this.isAccepting = this.items.length < this.maxItems - 1;
  }
  draw() {
    this.update();
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
      this.items.length + "/" + this.maxItems,
      this.x * this.sizeX + this.sizeX / 2,
      this.y * this.sizeY + this.sizeY / 2
    );
  }
}