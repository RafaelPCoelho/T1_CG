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

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var keyboard = new KeyboardState();
scene.add(new THREE.HemisphereLight());

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

render();
function render() {
  keyboard.update();
  airplane.update();
  camera.update();

  stats.update(); // Update FPS
  // trackballControls.update() ; // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}

export { scene, camera, keyboard, basicMaterial };
