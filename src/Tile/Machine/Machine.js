class Machine extends Tile {
  constructor(type, x, y, sizeX, sizeY, inputs, outputs) {
    super(type, x, y, sizeX, sizeY);
    this.color = "gray";
    this.inputs = inputs;
    this.outputs = outputs;
    this.slots = {
      input: [],
      output: [],
      maxInput: 1,
      maxOutput: 1,
    };
    this.items = [];

    this.moveInterval = 1000;
    this.isAccepting = true;
  }
  convert() {
    let output = this.slots.input[0];
    this.slots.input = [];
    this.addOutput(output);
  }
  addInput(item) {
    this.slots.input.push(item);
    if (this.slots.input.length === this.slots.maxInput) {
      this.convert();
    }
  }
  addOutput(item) {
    this.slots.output.push(item);
    this.moveItem();
  }
  // async startMoving() {
  //   this.dropping = true;
  //   while (this.dropping) {
  //     await wait(this.moveInterval);
  //     this.moveItem();
  //   }
  // }

  async moveItem() {
    let moveTiles = [];
    this.outputs.forEach((output) => {
      switch (output) {
        case "down":
          moveTiles.push(map.get()[this.y + 1][this.x]);
          break;
        case "up":
          moveTiles.push(map.get()[this.y - 1][this.x]);
          break;
        case "left":
          moveTiles.push(map.get()[this.y][this.x - 1]);
          break;
        case "right":
          moveTiles.push(map.get()[this.y][this.x + 1]);
          break;
      }
    });
    for(let i = 0; i < moveTiles.length; i++) {
      if(moveTiles[i].isAccepting) {
        this.canMove = true;
        let item = this.slots.output.pop();
        if (item) {
          await wait(this.moveInterval / 2);
          item.jump(moveTiles[i], 1 / 60);
        }
        return;
      }
    }
    this.canMove = false;
    this.isAccepting = false;
    // if (!moveTile.isAccepting) {
    //   this.canMove = false;
    //   this.isAccepting = false;
      
    // }
    // this.machineMoveLogic(moveTile);
  }

  async machineMoveLogic(moveTile) {
    if (moveTile instanceof Machine) {
      // check if machine has input on that side
      if (moveTile.inputs.includes(getOppDir(chosenOutput))) {
        // check if machine has r  oom
        if (moveTile.slots.input.length < moveTile.slots.maxInput) {
          this.canMove = true;

          let item = this.slots.output.pop();
          if (item) {
            await wait(this.moveInterval / 2);
            item.jump(moveTile, 1 / 60);
          }
        }
      }
      // check if machine has room
    } else if (moveTile instanceof Chest) {
      if (moveTile.items.length < moveTile.maxItems - 1) {
        this.canMove = true;

        let item = this.slots.output.pop();
        if (item) {
          await wait(this.moveInterval / 2);
          item.parentTile = moveTile;
          item.jump(moveTile, 1 / 60);
        }
      } else {
        this.canMove = false;
        this.isAccepting = false;
      }
    } else {
      // just throwing item onto the ground
      this.canMove = true;

      let item = this.slots.output.pop();
      if (item) {
        await wait(this.moveInterval / 2);
        item.parentTile = moveTile;
        item.jump(moveTile, 1 / 60);
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
      this.type,
      this.x * this.sizeX + this.sizeX / 2,
      this.y * this.sizeY + this.sizeY / 2
    );
  }
  update(deltaTime) {}
}
