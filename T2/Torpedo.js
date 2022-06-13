import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { scene } from "./script.js";

const Torpedo = function (position, angle, onDestroy) {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 5),
    new THREE.MeshStandardMaterial()
  );

  this.init = () => {
    scene.add(this.mesh);
    this.mesh.position.copy(position);
    this.mesh.rotateX(angle);
  };

  this.destroy = () => {
    scene.remove(this.mesh);

    if (onDestroy) onDestroy();
  };

  this.update = (dt) => {
    this.mesh.translateZ(-100 * (dt / 1000));
  };

  this.init();
};

export default Torpedo;
