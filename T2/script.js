import * as THREE from "three";
import Stats from "../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  InfoBox,
  onWindowResize,
  initDefaultBasicLight,
} from "../libs/util/util.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import Airplane from "./Airplane.js";
import Plano from "./Plano.js";
import Camera from "./Camera.js";
import Enemy from "./Enemy.js";
import Cannon from "./Cannon.js";
import { iterateCalling, pushObject } from "./libs/utils/funcs.js";

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

var cannonRange = 1000;
var cannons = Array(10)
  .fill(1)
  .map(
    () =>
      new Cannon(
        new THREE.Vector3(
          -cannonRange / 2 + Math.random() * cannonRange,
          2,
          Math.random() * -cannonRange
        )
      )
  );

var enemies = {};

// Função para criar inimigos infinitos de tempo em tempo
const spawnEnemy = function () {
  if (airplane.alive) {
    var key = pushObject(enemies, null);
    enemies[key] = new Enemy(() => {
      delete enemies[key];
    });
  } else {
    clearInterval(this);
  }
};

setInterval(spawnEnemy, 1000);

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

  // Limpa o info e reescreve com o fps e a munição
  info.infoBox.innerHTML = "";
  info.add(
    `Ammo: ${
      airplane.ammo ||
      `reloading (${(airplane.nextReload - airplane.counter).toFixed(0)}s)`
    }`
  );
  info.addParagraph();
  info.add(`fps: ${fps.toFixed(2)}`);
  info.show();

  // Funcao de Plano Infinito
  plano.update();

  // Atualiza componentes passando o deltaTime, enquanto o jogo não estiver acabado
  if (!airplane.gameOver) {
    keyboard.update();
    airplane.update(deltaTime);
    camera.update(deltaTime);

    Object.values(enemies).forEach((enemy) => {
      enemy.update(deltaTime);
    });

    iterateCalling(cannons, "update", deltaTime);
  }

  stats.update(); // Update FPS
  requestAnimationFrame(render);
  renderer.render(scene, camera.camera); // Render scene
}

export { scene, camera, keyboard, basicMaterial, airplane, enemies };
