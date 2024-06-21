class Dropper extends Tile {
  constructor(type, x, y, sizeX, sizeY, facing = "down") {
    super(type, x, y, sizeX, sizeY);
    this.color = "gray";
    this.facing = facing;
    this.items = [];

    this.dropInterval = 500;
    this.itemToDrop = "Iron";

    this.dropping = false;
    this.startDropping();
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
  async dropItem() {
    let dropTile;
    switch (this.facing) {
      case "down":
        dropTile = map.get()[this.y + 1][this.x];
        break;
      case "up":
        dropTile = map.get()[this.y - 1][this.x];
        break;
      case "left":
        dropTile = map.get()[this.y][this.x - 1];
        break;
      case "right":
        dropTile = map.get()[this.y][this.x + 1];
        break;
    }

    if(!dropTile.isAccepting) {
      return;
    }

    if (dropTile instanceof Tile) {
      let item = new Item(this, this.itemToDrop, this.x, this.y, this.sizeX, this.sizeY);
      entities.push(item);
      await wait(this.dropInterval / 2);
      item.jump(dropTile, 1/60);

    }
  }
  async startDropping() {
    this.dropping = true;
    while (this.dropping) {
      await wait(this.dropInterval);
      this.dropItem();
    }
  }
  stopDropping() {
    this.dropping = false;
  }
  
}
