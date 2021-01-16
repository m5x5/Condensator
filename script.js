/// <reference path="./node_modules/@types/matter-js/index.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />

//#region imports
const { Engine } = require("matter-js");
const { MouseConstraint } = require("matter-js");
const { Bounds } = require("matter-js");
const { Constraint } = require("matter-js");
const { World } = require("matter-js");
const { Bodies } = require("matter-js");
const { Body } = require("matter-js");
//#endregion

let engine;
let box1;
let box2;
let circle1;
let world;

function setup() {
  createCanvas(innerWidth, innerHeight);

  engine = Engine.create();
  world = engine.world;
  //#region boxes
  box1 = Bodies.rectangle(200, 0, 80, 80, {
    area: { x: 200, y: 0, width: 80, height: 80 },
  });

  box2 = Bodies.rectangle(250, 250, 80, 80);
  box2.isSleeping = true;
  //#endregion

  //#region Circles
  circle1 = Bodies.circle(0, 50, 90, {}, 5);
  circle1.force.x = 0.2;

  //#endregion

  setTimeout(() => {
    box1.force.y = -0.3;
  }, 1000);
  setTimeout(() => {
    box1.isSleeping = true;
  }, 2000);
  Engine.run(engine);

  World.add(world, box2);
  World.add(world, box1);
  World.add(world, circle1);
}

function draw() {
  background(51);
  noStroke();
  fill(255, 255, 0);
  rect(box1.position.x, box1.position.y, 80, 80);
  fill(0, 255, 255);
  rect(box2.position.x, box2.position.y, 80, 80);
  noFill();
  stroke(255, 0, 255);
  strokeWeight(4);
  circle(circle1.position.x, circle1.position.y, 90);
  fill(0, 255, 255);
  noStroke();
  circle(mouseX, mouseY, 8);
  stroke(0, 255, 0);
  strokeWeight(1);
  drawSineWave(50, 50, innerWidth / 2, 70, 5);
}

function drawSineWave(x, y, width, height, amplitude) {
  const offsetY = y + height / 2;
  const offsetX = x;
  noFill();
  rect(x, y, width, height);

  // Reset Variables to use them for our sine function
  x = 0;
  y = 0;

  const previousPoint = { x, y: Math.sin(x * 0.1) * amplitude };
  for (; x <= width; x += 10) {
    const newPoint = { x, y: Math.sin(x * 0.1) * amplitude };
    line(
      offsetX + x - 10,
      offsetY + Math.sin((x - 10) * 0.1) * amplitude,
      offsetX + newPoint.x,
      offsetY + newPoint.y
    );

    previousPoint.x = x;
    previousPoint.y = newPoint;
  }
}

function require() {
  return Matter;
}
