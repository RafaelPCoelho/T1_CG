import * as THREE from "three";
import { degreesToRadians } from "../../libs/util/util.js";
import { checkCollision } from "../libs/Collision/index.js";
import { predictPosition } from "../libs/utils/funcs.js";
import { distVec } from "../libs/utils/vec.js";
import { airplane, camera, game, scene } from "../script.js";

const Missile = function (position, onDestroy) {
  this.init = () => {
    this.geometry = new THREE.BoxGeometry(2, 2, 2);
    this.material = new THREE.MeshStandardMaterial({ color: "red" });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.gltf = null;
    this.mesh.castShadow = true;

    this.alive = true;
    this.raiseVelocity = 100;
    this.inPosition = false;
    this.direction = new THREE.Vector3(0, 0, 0);

    this.speed = 200;
    this.distance = 0;
    this.maxDistance = 1000;

    // scene.add(this.mesh);
    this.mesh.position.copy(position);

    game.load("./assets/models/missile_stinger/scene.gltf", (gltf) => {
      this.gltf = gltf;
      this.gltf.scale.set(20, 20, 6);
      this.gltf.position.copy(this.mesh.position);

      scene.add(this.gltf);

      this.gltf.traverse(function (child) {
        if (child) child.castShadow = true;
      });
    });

    this.audio = new THREE.PositionalAudio(camera.audioListener);
    this.audio.hasPlaybackControl = true;
    scene.add(this.audio);
    this.audio.position.copy(this.mesh.position);
    game.play("./assets/sounds/missile.wav", this.audio);
  };

  this.destroy = () => {
    this.alive = false;
    scene.remove(this.mesh);
    if (this.gltf) scene.remove(this.gltf);

    if (onDestroy) onDestroy();
  };

  this.deathBehaviour = (dt) => {};

  this.aliveBehaviour = (dt) => {
    if (!this.inPosition) {
      this.mesh.translateY(this.raiseVelocity * (dt / 1000));

      // Para de subir quando alcancar a altura do aviao
      if (this.mesh.position.y >= airplane.mesh.position.y) {
        this.inPosition = true;
        this.mesh.lookAt(
          predictPosition(
            this.mesh.position,
            airplane.mesh.position,
            this.speed,
            new THREE.Vector3(airplane.vx, airplane.vy, airplane.vz),
            1,
            dt
          )
        );
      }
    } else {
      // Caso j?? esteja na altura do aviao, avan??a em linha reta
      this.mesh.translateZ(this.speed * (dt / 1000));
      this.mesh.position.z += camera.vz;
      this.distance += this.speed * (dt / 1000);

      if (checkCollision(this.mesh, airplane.mesh)) {
        airplane.damage(50);
        this.destroy();
      }

      if (this.distance >= this.maxDistance) this.destroy();
    }
  };

  this.update = (dt) => {
    if (this.alive) this.aliveBehaviour(dt);
    else this.deathBehaviour(dt);

    if (this.gltf) {
      this.gltf.position.copy(this.mesh.position);
      this.gltf.rotation.copy(this.mesh.rotation);
      if (!this.inPosition) this.gltf.rotateX(degreesToRadians(90));
    }

    this.audio.position.copy(this.mesh.position);
  };

  this.init();
};

export default Missile;
