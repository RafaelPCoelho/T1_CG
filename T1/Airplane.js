import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { scene, camera, keyboard } from "./script.js";

const Airplane = function () {
  this.radius = 5;
  this.size = 10;
  this.vx = 0;
  this.vy = 0;
  this.vz = -0.5;

  this.mesh = new THREE.Mesh(
    new THREE.ConeGeometry(this.radius, this.size),
    new THREE.MeshNormalMaterial()
  );

  this.init = () => {
    this.mesh.position.set(0, 50, 0);
    this.mesh.rotateX(degreesToRadians(-90));
    scene.add(this.mesh);
  };

  this.update = () => {
    var { x, y, z } = this.mesh.position;
    var cam = camera.cameraTransform;

    if (keyboard.down("space")) {
      this.vz = -1;
    }
    if (keyboard.pressed("A")) {
      this.vx = -1;
    }
    if (keyboard.pressed("D")) {
      this.vx = 1;
    }
    if (keyboard.pressed("W")) {
      this.vz = -2;
    }
    if (keyboard.pressed("S")) {
      this.vz = 0.5;
    }
    if (keyboard.up("A") || keyboard.up("D")) {
      this.vx = 0;
    }
    if (keyboard.up("W") || keyboard.up("S")) {
      this.vz = -0.5;
    }

    this.mesh.position.set(
      Math.max(-100, Math.min(100, x + this.vx)),
      y + this.vy,
      Math.max(
        -100 + cam.position.z,
        Math.min(80 + cam.position.z, z + this.vz)
      )
    );
  };

  this.init();
};

export default Airplane;
