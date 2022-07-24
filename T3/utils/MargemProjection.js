import * as THREE from "three";
import { scene } from "../script.js";
import { ConvexGeometry } from "../../build/jsm/geometries/ConvexGeometry.js";

const margemProjection = function () {
  this.points = [];

  this.points.push(new THREE.Vector3(0, 0, 0));
  this.points.push(new THREE.Vector3(50, 0, 0));
  this.points.push(new THREE.Vector3(50, 50, 0));
  this.points.push(new THREE.Vector3(0, 0, -600));
  this.points.push(new THREE.Vector3(50, 0, -600));
  this.points.push(new THREE.Vector3(50, 50, -600));

  this.material = new THREE.MeshStandardMaterial();

  this.margem = new THREE.Mesh(new ConvexGeometry(this.points), this.material);
  this.margem.castShadow = true;

  scene.add(this.margem);

  return this.margem;
};

export default margemProjection;
