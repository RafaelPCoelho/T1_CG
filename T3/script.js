import * as THREE from "three";
import Stats from "../build/jsm/libs/stats.module.js";
import {
  initRenderer,
  InfoBox,
  onWindowResize,
  initCamera,
} from "../libs/util/util.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import Airplane from "./prefabs/Airplane.js";
import Plano from "./Plano.js";
import Camera from "./Camera.js";
import Enemy from "./prefabs/Enemy.js";
import Cannon from "./prefabs/Cannon.js";
import EntityList from "./utils/EntityList.js";
import Game from "./utils/Game.js";
import Item from "./prefabs/Item.js";
import { GAMEMODES } from "./utils/Consts.js";
import Light from "./Light.js";
import HealthBar from "./utils/HealthBar.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var hudScene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
document.getElementById("webgl-output").appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.autoClear = false;

const basicMaterial = new THREE.MeshLambertMaterial({
  color: "rgb(255, 0, 0)",
});

var ambientLight = new THREE.HemisphereLight("White", "darklategrey", 0.4);
scene.add(ambientLight);

var keyboard = new KeyboardState();
var camera = new Camera();
var game = new Game();

Promise.all([
  game.preload("./assets/aviaoGLTF.gltf"),
  game.preload("./assets/Inimigo1GLTF.gltf"),
  game.preload("./assets/Inimigo2GLTF.gltf"),
  game.preload("./assets/Inimigo3GLTF.gltf"),
  game.preload("./assets/models/missile_launcher_tower/scene.gltf"),
  game.preload("./assets/models/missile_stinger/scene.gltf"),
  game.preload("./assets/models/aim120_amraam_air_to_air_missile/scene.gltf"),
]).then(() => {
  game.triggerLoadListeners();
});

var plano = new Plano();
var airplane = new Airplane();
var light = new Light();

var healthBar = new HealthBar();

var cannons = new EntityList(Cannon);
var enemies = new EntityList(Enemy);
var items = new EntityList(Item);

// Camera auxiliar para Viewport
var vcWidth = 400;
var vcHeidth = 50;
var virtualCamera = new THREE.OrthographicCamera(-100, 0, 1, 0);
virtualCamera.position.set(0, -50, 0);
virtualCamera.lookAt(healthBar.mesh.position);

game.loadLevel(1);

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera.camera, renderer);
    plano.visibleDepth = window.innerHeight / Math.sin(camera.theta);
  },
  false
);

var deltaTime = 0;
var timestamp = 0;
var fps = 0;

var info = new InfoBox();

function viewport() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  //main viewport
  renderer.setViewport(0, 0, width, height);
  renderer.setScissorTest(false);
  renderer.clear();
  renderer.render(scene, camera.camera);

  //viewport auxiliar
  renderer.setViewport(0, 0, vcWidth, vcHeidth);
  renderer.setScissor(0, 0, vcWidth, vcHeidth);
  renderer.setScissorTest(true);
  // renderer.setClearColor("rgb(0, 0, 0)");
  renderer.clear(false);
  renderer.render(scene, virtualCamera);
}

render(0);
function render(time) {
  // Calcula o deltaTime = rela????o de tempo entre o ultimo frame e o atual
  deltaTime = time - timestamp;
  timestamp = time;
  fps = 1000 / deltaTime;

  // Speed x3
  deltaTime *= 2;

  // Limpa o info e reescreve com o fps e a muni????o
  info.infoBox.innerHTML = "";
  info.add(
    `MODO ${game.gamemode == GAMEMODES.SURVIVAL ? "SOBREVIVENCIA" : "CRIATIVO"}`
  );
  info.add(
    `Ammo: ${
      airplane.ammo ||
      `reloading (${(airplane.nextReload - airplane.counter).toFixed(0)}s)`
    }`
  );
  info.add(`Health: ${airplane.health}`);
  info.add(`Distance: ${(-1 * airplane.mesh.position.z + 80).toFixed(0)}`);
  info.add(`Time: ${airplane.counter.toFixed(0)}s`);
  info.addParagraph();
  info.add(`fps: ${fps.toFixed(2)}`);
  info.show();

  // Atualiza o jogo
  game.update(deltaTime);

  // Funcao de Plano Infinito
  plano.update();

  light.update();

  healthBar.update(deltaTime);

  // Atualiza componentes passando o deltaTime, enquanto o jogo n??o estiver acabado
  if (!airplane.gameOver) {
    keyboard.update();
    airplane.update(deltaTime);
    camera.update(deltaTime);

    enemies.update(deltaTime);
    cannons.update(deltaTime);
    items.update(deltaTime);
  }

  if (airplane.mesh.position.z < -1600 && game.currentLevel == 1)
    game.loadLevel(2);
  if (airplane.mesh.position.z < -3700 && game.currentLevel == 2)
    game.loadLevel(3);
  if (airplane.mesh.position.z < -4900 && game.currentLevel == 3)
    game.loadLevel(4);
  if (airplane.mesh.position.z < -6500 && game.currentLevel == 4)
    game.loadLevel(5);

  if (airplane.mesh.position.z <= game.mapEnd && !airplane.gameOver) game.end();

  stats.update(); // Update FPS
  requestAnimationFrame(render);
  viewport();
  // renderer.render(scene, camera.camera); // Render scene
}

export {
  scene,
  camera,
  keyboard,
  basicMaterial,
  airplane,
  enemies,
  cannons,
  game,
  items,
};
