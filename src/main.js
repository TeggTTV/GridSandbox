let size = 6;

let map = new Map(size);
// map.set(
//   new Array(size + 2)
//     .fill(null)
//     .map(() => new Array(size + 2).fill(null))
//     .map((row, y) => row.map((tile, x) => {
//       if (y === 0 || y === size + 1 || x === 0 || x === size + 1) {
//         return new Tile('empty', x, y, size + 2);
//       }
//       return new Tile('ground', x, y, size + 2);
//     })),
//   0,
//   0
// );

function init() {
  render();
}

function render() {
  requestAnimationFrame(render);

  map.render();
}
