import * as THREE from "three";
import { degreesToRadians } from "../libs/util/util.js";
import { scene, camera, keyboard } from "./script.js";
import Bullet from "./Bullet.js";
import { checkCollision } from "./libs/Collision/index.js";
import { pushObject } from "./libs/utils/funcs.js";

const Airplane = function () {
  this.radius = 5;
  this.size = 10;
  this.vx = 0;
  this.vy = 0;
  this.vz = -1;
  this.alive = true;
  this.ammoPerMag = 10;
  this.ammo = this.ammoPerMag;
  this.counter = 0;
  this.reloadTime = 2;
  this.nextReload = 0;
  this.shootDelay = 0.5;
  this.nextShoot = 0;

  this.material = new THREE.MeshLambertMaterial({
    color: "rgb(50, 100, 10)",
  });
  this.colMat = this.material.clone();
  this.colMat.wireframe = true;

  this.mesh = new THREE.Mesh(
    new THREE.ConeGeometry(this.radius, this.size),
    this.material
  );

  this.bullets = {};

  this.init = () => {
    this.mesh.position.set(0, 50, 80);
    this.mesh.rotateX(degreesToRadians(-90));
    scene.add(this.mesh);
  };

  this.destroy = () => {
    this.alive = false;
    alert("Game Over");
    window.location = window.location;
  };

  this.update = (dt) => {
    var { x, y, z } = this.mesh.position;
    var cam = camera.cameraTransform;

    if (keyboard.pressed("A") || keyboard.pressed("left")) {
      this.vx = -1;
    }
    if (keyboard.pressed("D") || keyboard.pressed("right")) {
      this.vx = 1;
    }
    if (keyboard.pressed("W") || keyboard.pressed("up")) {
      this.vz = -2;
    }
    if (keyboard.pressed("S") || keyboard.pressed("down")) {
      this.vz = 0.5;
    }
    if (
      keyboard.up("A") ||
      keyboard.up("D") ||
      keyboard.up("right") ||
      keyboard.up("left")
    ) {
      this.vx = 0;
    }
    if (
      keyboard.up("W") ||
      keyboard.up("S") ||
      keyboard.up("up") ||
      keyboard.up("down")
    ) {
      this.vz = -1;
    }

    if (keyboard.down("space") || keyboard.down("ctrl")) {
      if (this.ammo > 0 && this.counter >= this.nextShoot) {
        this.ammo--;
        if (this.ammo == 0) this.nextReload = this.counter + this.reloadTime;
        this.nextShoot = this.counter + this.shootDelay;

        var key = pushObject(this.bullets, null);
        this.bullets[key] = new Bullet(this.mesh.position, () => {
          delete this.bullets[key];
        });
      }
    }

    this.mesh.position.set(
      Math.max(-100, Math.min(100, x + this.vx)),
      y + this.vy,
      Math.max(
        -100 + cam.position.z,
        Math.min(80 + cam.position.z, z + this.vz)
      )
    );

    Object.values(this.bullets).forEach((bullet) => {
      bullet.update();
    });

    this.counter += dt / 1000;
    if (this.counter >= this.nextReload && this.ammo == 0) {
      this.ammo = this.ammoPerMag;
    }
  };

  this.init();
};

export default Airplane;
