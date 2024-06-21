class Item {
  constructor(parentTile, name, x, y, sizeX, sizeY) {
    this.parentTile = parentTile;
    this.name = name;
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;

    this.sizeMultiplier = 0.65;

    this.color = "white";

    this.velocity = {
      x: 0,
      y: 0,
    };

    this.update();
  }
  async jump(newTile, speed) {
    if (this.jumping) return;

    this.jumping = true;
    let e = setInterval(() => {
      let xDif = newTile.x - this.x;
      let yDif = newTile.y - this.y;

      let distance = Math.sqrt(xDif * xDif + yDif * yDif);
      this.velocity.x = (xDif / distance) * speed;
      this.velocity.y = (yDif / distance) * speed;

      this.x += this.velocity.x;
      this.y += this.velocity.y;

      if (distance < 0.01) {
        this.x = newTile.x;
        this.y = newTile.y;
        this.jumping = false;
        this.setNewParent(newTile);
        clearInterval(e);
      }
    }, speed);
  }
  setNewParent(newTile) {
    this.parentTile = newTile;
    if (!this.parentTile.items) return;
    // console.log(this.parentTile);
    if (this.parentTile instanceof Machine) {
      if (this.parentTile.slots.input.length < this.parentTile.slots.maxInput) {
        this.parentTile.addInput(this);
      }
    } else if (this.parentTile instanceof Chest) {
      this.parentTile.items.push(this);
    } else {
      this.parentTile.items.push(this);
    }
  }
  async update(deltaTime) {}
  render(deltaTime) {
    this.update(deltaTime);
    if (this.parentTile instanceof Machine || this.parentTile instanceof Chest) return;
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
      this.name,
      this.x * this.sizeX + this.sizeX / 2,
      this.y * this.sizeY + this.sizeY / 2
    );
  }
  // change accel and veloctiy to smoothly go to another tile
}
