import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { scene, camera, keyboard, enemies } from "./script.js";
import Bullet from "./Bullet.js";
import { checkCollision } from "./libs/Collision/index.js";

const Airplane = function () {
  this.radius = 5;
  this.size = 10;
  this.vx = 0;
  this.vy = 0;
  this.vz = -1;
  this.alive = true;
  this.material = new THREE.MeshLambertMaterial({
    color: "rgb(50, 100, 10)",
  });
  this.colMat = this.material.clone();
  this.colMat.wireframe = true;

  this.mesh = new THREE.Mesh(
    new THREE.ConeGeometry(this.radius, this.size),
    this.material
  );
  this.collisor = new THREE.Mesh(
    new THREE.BoxGeometry(this.radius * 2, this.radius * 2, this.size)
    // this.colMat
  );
  // scene.add(this.collisor);

  this.bullets = [];

  this.init = () => {
    this.mesh.position.set(0, 50, 80);
    this.mesh.rotateX(degreesToRadians(-90));
    scene.add(this.mesh);
  };

  this.destroy = () => {
    this.alive = false;
    alert("Morreu, o mamute morreu");
    window.location = window.location;
  };

  this.update = () => {
    var { x, y, z } = this.mesh.position;
    var cam = camera.cameraTransform;

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
      this.vz = -1;
    }
    if (keyboard.down("space")) {
      var bullet = new Bullet(this.mesh.position, () => {
        this.bullets.splice(this.bullets.length, 1);
      });
      this.bullets.push(bullet);

      console.log(bullet);
    }

    this.mesh.position.set(
      Math.max(-100, Math.min(100, x + this.vx)),
      y + this.vy,
      Math.max(
        -100 + cam.position.z,
        Math.min(80 + cam.position.z, z + this.vz)
      )
    );

    this.collisor.position.set(
      this.mesh.position.x,
      this.mesh.position.y,
      this.mesh.position.z
    );

    enemies.forEach((enemy) => {
      if (checkCollision(this.collisor, enemy.mesh)) {
        this.destroy();
      }
    });

    this.bullets.forEach((bullet) => {
      bullet.update();
    });
  };

  this.init();
};

export default Airplane;
