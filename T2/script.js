import * as THREE from "three";
import Stats from "../build/jsm/libs/stats.module.js";
import {
  initRenderer,
  InfoBox,
  onWindowResize,
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
import Light from "./Light.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene

var renderer = new THREE.WebGLRenderer();
  document.getElementById("webgl-output").appendChild( renderer.domElement );  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type  = THREE.VSMShadowMap;

const basicMaterial = new THREE.MeshLambertMaterial({
  color: "rgb(255, 0, 0)",
});

var ambientLight = new THREE.HemisphereLight ('White', 'darklategrey', 0.4);
scene.add(ambientLight);

var keyboard = new KeyboardState();
var camera = new Camera();
var airplane = new Airplane();
var plano = new Plano();
var game = new Game();
var light = new Light();

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

function viewport () {
  var width = window.innerWidth;
  var height = window.innerHeight;

  //main viewport
  renderer.setViewport(0, 0, width, height);
  renderer.setScissorTest(false);
  renderer.clear();
  renderer.render(scene, camera.camera);

  renderer.setViewport(0, 0, 250, 100);
  renderer.setScissor(0, 0, 250, 100);
  renderer.setScissorTest(true);
  //renderer.setClearColor("rgb(60, 50, 150)");
  renderer.clear();
  renderer.render(scene, camera.camera);
}

// function interface (){
//   const loadingManager = new THREE.LoadingManager( () => {
//     let loadingScreen = document.getElementById( 'loading-screen' );
//     loadingScreen.transition = 0;
//     loadingScreen.style.setProperty('--speed1', '0');  
//     loadingScreen.style.setProperty('--speed2', '0');  
//     loadingScreen.style.setProperty('--speed3', '0');      
  
//     let button  = document.getElementById("myBtn")
//     button.style.backgroundColor = 'Red';
//     button.innerHTML = 'Click to Enter';
//     button.addEventListener("click", onButtonPressed);
//   });

//   // Loading
//   //nameLoad(loadingManager, endereço);

// }

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

  // Atualiza a posicao da luz
  light.update();

  // Atualiza componentes passando o deltaTime, enquanto o jogo não estiver acabado
  if (!airplane.gameOver) {
    keyboard.update();
    airplane.update(deltaTime);
    camera.update(deltaTime);

    enemies.update(deltaTime);
    cannons.update(deltaTime);
  }

  stats.update(); // Update FPS
  viewport();
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
