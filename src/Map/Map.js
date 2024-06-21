class Map {
  constructor(sizeX, sizeY, droppers = 1) {
    this.map = new Array(sizeY + 2)
      .fill(null)
      .map(() => new Array(sizeX + 2).fill(null))
      .map((row, y) =>
        row.map((tile, x) => {
          if (y === 0 || y === sizeY + 1 || x === 0 || x === sizeX + 1) {
            return new Tile("empty", x, y, sizeX + 2, sizeY + 2);
          }
          return new Tile("ground", x, y, sizeX + 2, sizeY + 2);
        })
      );
    // this.addRandomDroppers(sizeX, sizeY, droppers);
  }

  render() {
    this.map.forEach((row, y) => {
      row.forEach((tile, x) => {
        if (tile) {
          tile.draw();
        }
      });
    });
  }

  set(arr, x, y) {
    if (arr instanceof Tile) this.map[x][y] = arr;
    else this.map = arr;
  }
  get() {
    return this.map;
  }
  addRandomDroppers(sizeX, sizeY, num) {
    let sum = sizeX * 2 + sizeY * 2;
    for (let i = 0; i < num; i++) {
      let x = Math.floor(Math.random() * sum);
      if (x < sizeX) {
        // top
        this.map[0][x + 1] = new Dropper(
          "dropper",
          x + 1,
          0,
          sizeX + 2,
          sizeY + 2,
          "down"
        );
      } else if (x < sizeX + sizeY) {
        // right
        let e = x % sizeX;
        this.map[e + 1][sizeX + 1] = new Dropper(
          "dropper",
          sizeX + 1,
          e + 1,
          sizeX + 2,
          sizeY + 2,
          "left"
        );
      } else if (x < sizeX * 2 + sizeY) {
        // bottom
        let e = sizeX - (x - sizeX - sizeY);
        this.map[sizeY + 1][e] = new Dropper(
          "dropper",
          e,
          sizeY + 1,
          sizeX + 2,
          sizeY + 2,
          "up"
        );
      } else if (x < sizeX * 2 + sizeY * 2) {
        // left
        let e = sizeY - (x - sizeX * 2 - sizeY);
        this.map[e][0] = new Dropper(
          "dropper",
          0,
          e,
          sizeX + 2,
          sizeY + 2,
          "right"
        );
      }
    }
  }
  resetDroppers() {
    this.addRandomDroppers(5, 5, 4);
  }
}
