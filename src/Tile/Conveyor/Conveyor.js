class Conveyor extends Tile {
  constructor(type, x, y, sizeX, sizeY, facing = "down") {
    super(type, x, y, sizeX, sizeY);
    this.color = "gray";
    this.facing = facing;
    this.items = [];

    this.moveInterval = 200;

    this.moving = false;
    this.canMove = false;
    this.isAccepting = true;
    this.startMoving();
  }
  async startMoving() {
    this.dropping = true;
    while (this.dropping) {
      await wait(this.moveInterval);
      this.moveItem();
    }
  }
  async moveItem() {
    let moveTile;
    switch (this.facing) {
      case "down":
        moveTile = map.get()[this.y + 1][this.x];
        break;
      case "up":
        moveTile = map.get()[this.y - 1][this.x];
        break;
      case "left":
        moveTile = map.get()[this.y][this.x - 1];
        break;
      case "right":
        moveTile = map.get()[this.y][this.x + 1];
        break;
    }

    if(!moveTile.isAccepting) {
      this.canMove = false;
      this.isAccepting = false;
      return;
    }

    if (moveTile instanceof Tile) {
      if(moveTile instanceof Machine) {
        // check if machine has input on that side
        if(moveTile.inputs.includes(getOppDir(this.facing))) {
          // check if machine has room
          if(moveTile.slots.input.length < moveTile.slots.maxInput) {
            this.canMove = true;

            let item = this.items.pop();
            if (item) {
              await wait(this.moveInterval / 2);
              item.jump(moveTile, 1 / 60);
            }
          }
        }
        // check if machine has room
      } else {
        // just throwing item onto the ground
        this.canMove = true;

        let item = this.items.pop();
        if (item) {
          await wait(this.moveInterval / 2);
          item.parentTile = moveTile;
          item.jump(moveTile, 1 / 60);
        }
      }
    }
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
}