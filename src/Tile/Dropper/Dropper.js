class Dropper extends Tile {
  constructor(type, x, y, size) {
    super(type, x, y, size);
    this.color = "gray";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * this.size,
      this.y * this.size,
      this.size,
      this.size
    );
  }
  setColor() {
    this.color = "red";
  }
}
