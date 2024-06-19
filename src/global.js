const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerHeight / 2;
let height = canvas.height = window.innerHeight / 2;

const keys = {};
const mouse = {
  x: 0,
  y: 0,
  down: false
};

async function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const entites = [];

const friction = .8;