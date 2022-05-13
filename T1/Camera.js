import * as THREE from "three";
import { initCamera } from "../libs/util/util.js";
import { scene } from "./script.js";

const Camera = function () {
  this.vz = -1;

  this.camera = initCamera(new THREE.Vector3(0, 150, 150));
  this.cameraTransform = new THREE.Mesh();

  this.cameraTransform.add(this.camera);
  scene.add(this.cameraTransform);

  this.update = () => {
    this.cameraTransform.translateZ(this.vz);
  };
};

export default Camera;
