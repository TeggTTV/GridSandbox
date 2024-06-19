let map = new Map(5, 5);

function init() {
  render();
}

function render() {
  requestAnimationFrame(render);

  map.render();
  entites.forEach((e) => e.render());

}
