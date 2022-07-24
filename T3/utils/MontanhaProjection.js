import * as THREE from "three";
import { scene } from "../script.js";

const montanhaProjection = function () {
  this.geometria = new THREE.BoxGeometry(100, 100, 600);
  this.material = new THREE.MeshStandardMaterial();

  this.montanha = new THREE.Mesh(this.geometria, this.material);

  scene.add(this.montanha);

  return this.montanha;
};

export default montanhaProjection;
