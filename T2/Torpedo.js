import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { cannons, enemies, scene } from "./script.js";
import { checkCollision } from "./libs/Collision/index.js";

const Torpedo = function (position, angle, onDestroy) {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 5),
    new THREE.MeshStandardMaterial()
  );
  //this.mesh.castShadow = true;

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
