const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// let width = canvas.width = window.innerHeight / 2;
// let height = canvas.height = window.innerHeight / 2;

let width = canvas.width = 700;
let height = canvas.height = 700;

const keys = {};
const mouse = {
  x: 0,
  y: 0,
  down: false
};

async function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const entities = [];

const friction = .8;

function cubicEaseInOut(t) {
  return t < 0.5 ? 4 * t * t : (t - 1) * (2 - 4 * (t - 1));
}

function getOppDir(dir) {
  switch (dir) {
    case "up":
      return "down";
    case "down":
      return "up";
    case "left":
      return "right";
    case "right":
      return "left";
  }
}

async function moveItemLogic(parent, moveTile) {
  if (moveTile instanceof Tile) {
      if (moveTile instanceof Machine) {
        // check if machine has input on that side
        console.log(parent);
        if (moveTile.inputs.includes(getOppDir(parent.outputs[0]))) {
          // check if machine has room
          if (moveTile.slots.input.length < moveTile.slots.maxInput) {
            parent.canMove = true;

            let item = parent.items.pop();
            if (item) {
              await wait(parent.moveInterval / 2);
              item.jump(moveTile, 1 / 60);
            }
          }
        }
        // check if machine has room
      } else {
        // just throwing item onto the ground
        parent.canMove = true;

        let item = parent.items.pop();
        if (item) {
          await wait(parent.moveInterval / 2);
          item.parentTile = moveTile;
          item.jump(moveTile, 1 / 60);
        }
      }
    }
}