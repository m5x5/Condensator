/// <reference path="./node_modules/@types/matter-js/index.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />

//#region imports
const { Engine, use } = require("matter-js");
const { MouseConstraint } = require("matter-js");
const { Bounds } = require("matter-js");
const { Constraint } = require("matter-js");
const { World } = require("matter-js");
const { Bodies } = require("matter-js");
const { Body } = require("matter-js");

//#endregion

let engine;
let condensatorPlate1;
let condensatorPlate2;
let world;
let particles = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  use(MatterAttractors);
  // Matter.use(MatterAttractors);
  engine = Engine.create();
  world = engine.world;
  world.gravity = { x: 0.3, y: 0 };

  //#region condensators
  condensatorPlate1 = Bodies.rectangle(innerWidth - 200, 100, 320, 20, {
    isStatic: true,
    plugin: {
      attractors: [
        function (bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-9,
            y: (bodyA.position.y - bodyB.position.y) * 1e-9,
          };
        },
      ],
    },
  });
  condensatorPlate2 = Bodies.rectangle(innerWidth - 200, 300, 320, 20, {
    isStatic: true,
    plugin: {
      attractors: [
        function (bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * -1e-8,
            y: (bodyA.position.y - bodyB.position.y) * -1e-8,
          };
        },
      ],
    },
  });
  //#endregion

  //#region Circles
  setInterval(() => {
    let particle = Bodies.circle(80, 200, 5);
    particles.push(particle);
    setTimeout(() => {
      World.remove(world, particle);
      particles.shift();
    }, 6000);
    World.add(world, particle);
  }, 2000);

  //#endregion
  Engine.run(engine);

  World.add(world, condensatorPlate2);
  World.add(world, condensatorPlate1);
}

function draw() {
  background(51);
  noStroke();
  fill(100, 100, 255);
  rect(
    condensatorPlate1.position.x - 320 / 2,
    condensatorPlate1.position.y - 20 / 2,
    320,
    20
  );
  fill(255, 100, 100);
  rect(
    condensatorPlate2.position.x - 320 / 2,
    condensatorPlate2.position.y - 20 / 2,
    320,
    20
  );
  fill(255, 255, 255);
  particles.forEach((particle) => {
    circle(particle.position.x, particle.position.y, 10);
  });
}

function require() {
  return Matter;
}
