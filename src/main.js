let map = new Map(5, 5);
map.set(new Dropper("dropper", 1, 0, 7, 7), 1, 0);
map.set(new Conveyor("conveyor", 1, 1, 7, 7, "down"), 1, 1);
map.set(new Conveyor("conveyor", 1, 2, 7, 7, "down"), 2, 1);
map.set(new Conveyor("conveyor", 1, 3, 7, 7, "right"), 3, 1);
map.set(
  new Machine(
    "machine",
    2,
    3,
    7,
    7,
    ["up", "right", "down", "left"],
    ["right", "up"]
  ),
  3,
  2
);
// map.set(
//   new Machine(
//     "machine",
//     3,
//     3,
//     7,
//     7,
//     ["up", "right", "down", "left"],
//     ["right"]
//   ),
//   3,
//   3
// );
map.set(new Chest("chest", 3, 3, 7, 7, 5), 3, 3);
map.set(new Chest("chest", 2, 2, 7, 7, 5), 2, 2);

console.log(map.get(1, 1));

function init() {
  render();
}

let deltaTime = 0;
let lastTime = 0;
function render() {
  const now = Date.now();
  deltaTime = now - lastTime;
  lastTime = now;
  requestAnimationFrame(render);

  ctx.fillRect(0, 0, width, height);

  map.render();

  entities.forEach((e) => e.render());
}
