window.onload = init;

window.onresize = function () {
  width = canvas.width = window.innerHeight / 2;
  height = canvas.height = window.innerHeight / 2;
};

window.addEventListener("keydown", function (e) {
  if (e.key.toLowerCase() === "shift") {
    e.preventDefault();
    keys[e.key.toLowerCase()] = true;
  } else {
    keys[e.key.toLowerCase()] = true;
  }
});

window.addEventListener("keyup", function (e) {
  if (e.key.toLowerCase() === "shift") {
    e.preventDefault();
    keys[e.key.toLowerCase()] = false;
  } else {
    keys[e.key.toLowerCase()] = false;
  }
});

canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

canvas.addEventListener("mousedown", function (e) {
  mouse.down = true;
});
