import * as THREE from "three";
import Stats from "../../../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../../../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
  degreesToRadians,
} from "../../../libs/util/util.js";
import { checkCollision } from "./index.js";
import KeyboardState from "../../../libs/util/KeyboardState.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position
// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(100, 100);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: "rgba(150, 150, 150)",
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshNormalMaterial();

var meMaterial = new THREE.MeshStandardMaterial({
  color: "#0000ff",
});
var markedMaterial = new THREE.MeshStandardMaterial({
  color: "#ff0000",
});

var NUMBER_OF_CUBES = 5;

var cubes = Array(NUMBER_OF_CUBES)
  .fill("")
  .map(() => {
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    let rx = -25 + Math.random() * 50;
    let ry = -25 + Math.random() * 50;
    let rz = -25 + Math.random() * 50;

    cube.position.set(rx, ry, 2);

    scene.add(cube);
    return cube;
  });

// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();

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

render();
function render() {
  keyboard.update();

  if (keyboard.pressed("left")) cubes[0].translateX(-0.5);
  if (keyboard.pressed("right")) cubes[0].translateX(0.5);
  if (keyboard.pressed("up")) cubes[0].translateY(0.5);
  if (keyboard.pressed("down")) cubes[0].translateY(-0.5);
  if (keyboard.pressed("space")) cubes[0].translateZ(0.5);
  if (keyboard.pressed("C")) cubes[0].translateZ(-0.5);
  if (keyboard.pressed("Q")) cubes[0].rotateZ(degreesToRadians(1));
  if (keyboard.pressed("R")) cubes[0].rotateZ(degreesToRadians(-1));

  cubes.forEach((cube, i) => {
    var colliding = cubes.find(
      (collisor, j) => i !== j && checkCollision(cube, collisor)
    );
    if (colliding) {
      cube.material = markedMaterial;
    } else {
      cube.material = i == 0 ? meMaterial : cubeMaterial;
    }
  });

  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
