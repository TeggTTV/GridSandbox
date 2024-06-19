class Item {
  constructor(name, x, y, sizeX, sizeY) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.sizeMultiplier = 0.65;

    this.color = "white";

    this.velocity = {
      x: 0,
      y: 0
    };
    this.acceleration = {
      x: 0,
      y: 0
    };
  }
  update() {
    // this.velocity.x += this.acceleration.x;
    // this.velocity.y += this.acceleration.y;

    // this.x += this.velocity.x;
    // this.y += this.velocity.y;

    // this.acceleration.x *= friction;
    // this.acceleration.y *= friction;

    // this.velocity.x *= friction;
    // this.velocity.y *= friction;
  }
  render() {
    this.update();
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x * this.sizeX + this.sizeX * ((1 - this.sizeMultiplier) / 2),
      this.y * this.sizeY + this.sizeY * ((1 - this.sizeMultiplier) / 2),
      this.sizeX * this.sizeMultiplier,
      this.sizeY * this.sizeMultiplier
    );
    // draw text dead center of box
    ctx.fillStyle = "black";
    ctx.font = "15px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      this.name,
      this.x * this.sizeX + this.sizeX / 2,
      this.y * this.sizeY + this.sizeY / 2
    );
  }
  // change accel and veloctiy to smoothly go to another tile
  jump(newPosX, newPosY) {
    this.x = newPosX;
    this.y = newPosY;
  }
}
