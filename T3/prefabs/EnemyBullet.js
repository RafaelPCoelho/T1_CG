import * as THREE from "three";
import { checkCollision } from "../libs/Collision/index.js";
import { predictPosition } from "../libs/utils/funcs.js";
import { airplane, camera, game, scene } from "../script.js";

const EnemyBullet = function (position, onDestroy) {
  // Inicia a bala já prevendo a posicao do inimigo
  this.init = () => {
    this.geometry = new THREE.BoxGeometry(0.5, 0.5, 5);
    this.material = new THREE.MeshStandardMaterial({ color: "orange" });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;

    this.speed = 200;
    this.dist = 0;
    this.maxDist = 1000;

    this.mesh.position.copy(position);

    this.mesh.lookAt(
      predictPosition(
        this.mesh.position,
        airplane.mesh.position,
        this.speed,
        new THREE.Vector3(airplane.vx, airplane.vy, airplane.vz),
        20
      )
    );
    scene.add(this.mesh);
    this.audio = new THREE.PositionalAudio(camera.audioListener);
    this.audio.hasPlaybackControl = true;
    this.mesh.add(this.audio);
    game.play("./assets/sounds/hit_enemy.ogg", this.audio);
  };

  this.destroy = () => {
    scene.remove(this.mesh);
    if (onDestroy) onDestroy();
  };

  this.collision = () => {
    if (!checkCollision(this.mesh, airplane.mesh)) return;

    this.destroy();
    airplane.damage(10);
  };

  // Anda reto até que atinja o alvo ou uma distancia limite
  this.update = (dt) => {
    this.collision();

    let step = this.speed * (dt / 1000);

    this.mesh.translateZ(step);
    this.dist += step;

    if (this.dist >= this.maxDist) this.destroy();
  };

  this.init();
};

export default EnemyBullet;
