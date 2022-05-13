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
} from "../libs/util/util.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import Airplane from "./Airplane.js";
import Plano from "./Plano.js";
import Camera from "./Camera.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
const basicMaterial = new THREE.MeshStandardMaterial();

var camera = new Camera();
var airplane = new Airplane();
var plano = new Plano();
var keyboard = new KeyboardState();

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera.camera, renderer);
  },
  false
);

scene.add(new THREE.HemisphereLight());

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

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
  info.add(`fps: ${fps.toFixed(2)}`);
  info.show();

  // Atualiza componentes passando o deltaTime
  keyboard.update();
  airplane.update(deltaTime);
  camera.update(deltaTime);

  stats.update(); // Update FPS
  // trackballControls.update() ; // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera.camera); // Render scene
}

export { scene, camera, keyboard, basicMaterial, airplane };
