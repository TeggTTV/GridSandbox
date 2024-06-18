class Map {
  constructor(size, droppers = 1) {
    this.map = new Array(size + 2)
      .fill(null)
      .map(() => new Array(size + 2).fill(null))
      .map((row, y) =>
        row.map((tile, x) => {
          if (y === 0 || y === size + 1 || x === 0 || x === size + 1) {
            return new Tile("empty", x, y, size + 2);
          }
          return new Tile("ground", x, y, size + 2);
        })
      );
    this.addRandomDroppers(size, droppers);
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
  addRandomDroppers(size, num) {
    for (let i = 0; i < num; i++) {
      let sum = size * 3;
      let x = Math.floor(Math.random() * sum);
      if (x < size) {
        // top
        this.map[0][x + 1] = new Dropper("water", x + 1, 0, size + 2);
      } else if (x < size * 2) {
        // right
        let e = (x % size);
        console.log(e, size + 1);
        this.map[e + 1][size + 1] = new Dropper("water", size + 1, e + 1, size + 2);
      } else if(x < size * 3) {
        // bottom
        let e = size - (x % size);
        this.map[size + 1][e] = new Dropper("water", e, size + 1, size + 2);
      } else if(x < size * 4) {
        // left
        this.map[size - (x % size)][0] = new Dropper("water", 0, size - (x % size), size + 2);
      }
    }
  }
}
