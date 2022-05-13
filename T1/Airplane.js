import * as THREE from "three";
import { scene, camera, keyboard } from "./script.js";

const Airplane = function (x = 0, y = 0, z = 0, r = 5) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.radius = r;
  this.size = 10;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;

  this.mesh = new THREE.Mesh(
    new THREE.ConeGeometry(this.radius, this.size),
    new THREE.MeshNormalMaterial()
  );

  this.init = () => {
    scene.add(this.mesh);
  };

  this.update = () => {
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
      Math.max(-100, Math.min(100, this.x + this.vx)),
      this.y + this.vy,
      Math.max(
        -100 + camera.position.z,
        Math.min(50 + camera.position.z, this.z + this.vz)
      )
    );
  };

  this.init();
};

export default Airplane;
