import * as THREE from "three";
import Stats from "../build/jsm/libs/stats.module.js";
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
import EntityList from "./libs/EntityList.js";
import Ticker from "./libs/Ticker.js";
import Game from "./utils/Game.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var light = initDefaultBasicLight(scene);
var renderer = initRenderer(); // View function in util/utils
const basicMaterial = new THREE.MeshLambertMaterial({
  color: "rgb(255, 0, 0)",
});

var keyboard = new KeyboardState();
var camera = new Camera();
var airplane = new Airplane();
var plano = new Plano();
var game = new Game();

var cannons = new EntityList(Cannon);
var cannonTicker = new Ticker(8000, () => {
  cannons.add(
    new THREE.Vector3(
      -300 / 2 + Math.random() * 300,
      2,
      airplane.mesh.position.z - 800
    )
  );
});

var enemies = new EntityList(Enemy);
var enemyTicker = new Ticker(3000, enemies.add);

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

  enemyTicker.update(deltaTime);
  cannonTicker.update(deltaTime);

  // Limpa o info e reescreve com o fps e a munição
  info.infoBox.innerHTML = "";
  info.add(
    `MODO ${
      game.gamemode == game.GAMEMODES.SURVIVAL ? "SOBREVIVENCIA" : "CRIATIVO"
    }`
  );
  info.add(
    `Ammo: ${
      airplane.ammo ||
      `reloading (${(airplane.nextReload - airplane.counter).toFixed(0)}s)`
    }`
  );
  info.addParagraph();
  info.add(`fps: ${fps.toFixed(2)}`);
  info.show();

  // Atualiza o jogo
  game.update(deltaTime);

  // Funcao de Plano Infinito
  plano.update();

  // Atualiza componentes passando o deltaTime, enquanto o jogo não estiver acabado
  if (!airplane.gameOver) {
    keyboard.update();
    airplane.update(deltaTime);
    camera.update(deltaTime);

    enemies.update(deltaTime);
    cannons.update(deltaTime);
  }

  stats.update(); // Update FPS
  requestAnimationFrame(render);
  renderer.render(scene, camera.camera); // Render scene
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
};
