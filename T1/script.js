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

var enemies = [];

var enemySpawner = setInterval(() => {
  if (airplane.alive)
    enemies.push(
      new Enemy(function () {
        enemies.splice(enemies.length, 1);
        delete this;
      })
    );
  else clearInterval(enemySpawner);
}, 1000);

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
    enemies.forEach((enemy) => enemy.update());
  }

  stats.update(); // Update FPS
  // trackballControls.update() ; // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera.camera); // Render scene
}

export { scene, camera, keyboard, basicMaterial, airplane, enemies };
