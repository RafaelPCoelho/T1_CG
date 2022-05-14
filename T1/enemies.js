import * as THREE from "three";
import { scene, camera } from "./script.js";

const Enemy = function () {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(6, 6, 6),
    new THREE.MeshLambertMaterial({
      color: "rgb(150, 60, 30)",
    })
  );

  this.vx = Math.random();
  this.vz = Math.random();
  this.vz = Math.max(0.4, this.vz);
  this.vz = Math.min(this.vz, 0.7);

  this.init = () => {
    this.mesh.position.set(0, 50, 100);
    scene.add(this.mesh);
  };
  this.init();
};

export default Enemy;
