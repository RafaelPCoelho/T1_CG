import * as THREE from "three";
import Stats from "../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
  degreesToRadians,
  createGroundPlaneWired,
  initDefaultBasicLight,
} from "../libs/util/util.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import Airplane from "./Airplane.js";
import Plano from "./Plano.js";
import Camera from "./Camera.js";
import Enemy from "./Enemy.js";
import { checkCollision } from "./libs/Collision/index.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var light = initDefaultBasicLight(scene);
var renderer = initRenderer(); // View function in util/utils
const basicMaterial = new THREE.MeshLambertMaterial({
  color: "rgb(255, 0, 0)",
});

var camera = new Camera();
var airplane = new Airplane();
var plano = new Plano();
var keyboard = new KeyboardState();

const Enemies = function () {
  this.enemies = [];
  this.counter = 0;

  this.add = (enemy) => {
    this.enemies.push(enemy);
  };

  this.remove = (i) => {
    this.enemies.splice(i, 1);
  };

  this.update = (dt) => {
    this.enemies.forEach((enemy) => {
      enemy.update();
    });

    this.counter += 1 * dt;

    if (this.counter > 2000) {
      this.add(new Enemy(this.enemies.length));
      this.counter = 0;
    }
  };
};

const enemyManager = new Enemies();

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera.camera, renderer);
  },
  false
);

var deltaTime = 0;
var timestamp = 0;
var fps = 0;

var info = new InfoBox();

render(0);
function render(time) {
  // Calcula o deltaTime = relação de tempo entre o ultimo frame e o atual
  deltaTime = time - timestamp;
  timestamp = time;
  fps = 1000 / deltaTime;

  // Limpa o info e reescreve
  info.infoBox.innerHTML = "";
  info.add(`Ammo: `);
  info.add(`fps: ${fps.toFixed(2)}`);
  info.show();
  // Funcao de Plano Infinito
  plano.update();

  // Atualiza componentes passando o deltaTime
  if (airplane.alive) {
    keyboard.update();
    airplane.update(deltaTime);
    camera.update(deltaTime);
    enemyManager.update(deltaTime);
    airplane.bullets.forEach((bullet, ib) => {
      enemyManager.enemies.forEach((enemy, ie) => {
        if (checkCollision(bullet.mesh, enemy.mesh)) {
          bullet.destroy();
          enemy.destroy();
          airplane.bullets.splice(ib, 1);
          enemyManager.enemies.splice(ie, 1);
        }
      });
    });
  }

  stats.update(); // Update FPS
  // trackballControls.update() ; // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera.camera); // Render scene
}

export { scene, camera, keyboard, basicMaterial, airplane, enemyManager };
