import * as THREE from "three";
import { checkCollision } from "./libs/Collision/index.js";
import { scene, camera, airplane, game } from "./script.js";

const Enemy = function (onDestroy) {
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
  this.vy = 0;
  this.alive = true;

  this.init = () => {
    // Seta a posição do inimigo com
    // x aleatorio
    // y ( altura ) fixa
    // z proporcional ao tamanho da tela em relacao a rotacao da camera
    this.mesh.position.set(
      -100 + Math.random() * 200,
      50,
      airplane.mesh.position.z - window.innerHeight * Math.cos(camera.theta)
    );
    scene.add(this.mesh);
  };

  // Define o estado do inimigo como morto
  this.destroy = () => {
    if (!this.alive) return;
    this.alive = false;
    console.log(`Killed enemy`);
  };

  // Roda o comportamento do inimigo quando seu estado é: vivo
  this.aliveBehaviour = (dt) => {
    // Mata o inimigo caso atinja o limite inferior da tela
    if (camera.cameraTransform.position.z + 140 < this.mesh.position.z) {
      this.destroy();
    }

    // Verifica colisão do inimigo com cada bala disparada pelo avião
    Object.values(airplane.bullets.entities).forEach((bullet) => {
      if (checkCollision(this.mesh, bullet.mesh)) {
        bullet.destroy();
        this.destroy();
      }
    });

    // Verifica a colisão do inimigo com o avião
    if (game.gamemode == game.GAMEMODES.SURVIVAL)
      if (checkCollision(this.mesh, airplane.mesh)) {
        airplane.destroy();
        this.destroy();
      }
  };

  // Roda o comportamento do inimigo quando seu estado é: morto,
  // derrubando o mesmo até que encoste no chão,
  // então um temporizador é disparado para eliminá-lo da cena
  // e seu destrutor ( se passado nos parâmetros ) é chamado
  // para removê-lo de seu array controlador
  this.deathBehaviour = (dt) => {
    if (this.mesh.position.y <= 2) {
      setTimeout(() => {
        if (onDestroy) onDestroy();
        scene.remove(this.mesh);
      }, 1000);
    } else {
      this.vy -= 4.5 * (dt / 1000);
      this.mesh.translateY(this.vy);
    }
  };

  // Atualiza a cada frame o estado do inimigo
  this.update = (dt) => {
    if (this.alive) this.aliveBehaviour(dt);
    else this.deathBehaviour(dt);
  };

  this.init();
};

export default Enemy;
