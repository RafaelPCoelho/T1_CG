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

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils

var cameraTransform = new THREE.Mesh();
var camera = initCamera(new THREE.Vector3(0, 150, 150)); // Init camera in this position
// camera.lookAt(0, 30, 0);
cameraTransform.add(camera);
scene.add(cameraTransform);

var airplaneProps = {
  radius: 5,
  size: 10,
  x0: 0,
  y0: 10,
  z0: 50,
  vx: 0,
  vy: 0,
  vz: 0,
};
var airplane = new THREE.Mesh(
  new THREE.ConeGeometry(airplaneProps.radius, airplaneProps.size),
  new THREE.MeshNormalMaterial()
);
airplane.rotateX(degreesToRadians(-90));
airplane.position.set(airplaneProps.x0, airplaneProps.y0, airplaneProps.z0);
scene.add(airplane);

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
scene.add(createGroundPlaneWired(600, 600));

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

render();
function render() {
  keyboard.update();

  if (keyboard.down("space")) {
    airplaneProps.vz = -1;
  }
  if (keyboard.pressed("A")) {
    airplaneProps.vx = -1;
  }
  if (keyboard.pressed("D")) {
    airplaneProps.vx = 1;
  }
  if (keyboard.pressed("W")) {
    airplaneProps.vz = -2;
  }
  if (keyboard.pressed("S")) {
    airplaneProps.vz = 2;
  }
  if (keyboard.up("A") || keyboard.up("D")) {
    airplaneProps.vx = 0;
  }
  if (keyboard.up("W") || keyboard.up("S")) {
    airplaneProps.vz = 0;
  }

  var { x: airplaneX, y: airplaneY, z: airplaneZ } = airplane.position;
  airplane.position.set(
    Math.max(-100, Math.min(100, airplaneX + airplaneProps.vx)),
    airplaneY + airplaneProps.vy,
    Math.max(
      -100 + cameraTransform.position.z,
      Math.min(50 + cameraTransform.position.z, airplaneZ + airplaneProps.vz)
    )
  );

  // airplane.translateX(airplaneProps.vx);
  // airplane.translateY(airplaneProps.vy);
  // airplane.translateZ(airplaneProps.vz);
  cameraTransform.translateZ(-1);
  // camera.look

  stats.update(); // Update FPS
  // trackballControls.update() ; // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
