import * as THREE from "three";
import { clamp, lerp } from "../libs/utils/math.js";
import { degreesToRadians } from "../../libs/util/util.js";
import { checkCollision } from "../libs/Collision/index.js";
import EntityList from "../libs/EntityList.js";
import Ticker from "../libs/Ticker.js";
import { scene, camera, airplane, game } from "../script.js";
import { MAP, MOVEMENTS } from "../utils/Consts.js";
import EnemyBullet from "./EnemyBullet.js";

const Enemy = function (position, movement = MOVEMENTS.VERTICAL, onDestroy) {
  this.init = () => {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(6, 6, 6),
      new THREE.MeshLambertMaterial({
        color: "rgb(150, 60, 30)",
      })
    );

    this.dx = Math.round(Math.random()) * 2 - 1;
    this.vx = Math.random() * 20 + 20;
    this.vz = Math.random();
    this.vz = Math.max(0.4, Math.min(this.vz, 0.7));
    this.vy = 0;
    this.alive = true;
    this.bullets = new EntityList(EnemyBullet);
    this.fireRate = 0.1;
    this.bulletTicker = new Ticker(100 / this.fireRate, () => {
      this.bullets.add(this.mesh.position);
    });
    this.angle = 0;

    this.mesh.position.copy(position);
    scene.add(this.mesh);
  };

  // Define o estado do inimigo como morto
  this.destroy = () => {
    if (!this.alive) return;
    this.alive = false;
  };

  // Movimenta o inimigo de acordo com o parametro passado
  this.move = (dt) => {
    switch (movement) {
      case MOVEMENTS.VERTICAL: {
        break;
      }

      case MOVEMENTS.HORIZONTAL: {
        if (this.mesh.position.x >= MAP.BOUND_X) this.dx = -1;
        else if (this.mesh.position.x <= -MAP.BOUND_X) this.dx = 1;

        this.mesh.translateX(this.vx * this.dx * (dt / 1000));
        break;
      }

      case MOVEMENTS.ARC: {
        this.angle += 1 * (dt / 1000);
        this.angle = clamp(this.angle, 0, Math.PI / 2);
        this.mesh.translateZ(lerp(0, 1, Math.cos(this.angle)) * 2);
        this.mesh.translateX(lerp(0, 1, Math.cos(this.angle)) * 2);
        break;
      }
    }
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
    if (checkCollision(this.mesh, airplane.mesh)) {
      airplane.destroy();
      this.destroy();
    }

    this.move(dt);

    // If near to the airplane
    if (this.mesh.position.distanceTo(airplane.mesh.position) <= 500)
      this.bulletTicker.update(dt);
  };

  // Roda o comportamento do inimigo quando seu estado é: morto,
  // derrubando o mesmo até que encoste no chão,
  // então um temporizador é disparado para eliminá-lo da cena
  // e seu destrutor ( se passado nos parâmetros ) é chamado
  // para removê-lo de seu array controlador
  this.deathBehaviour = (dt) => {
    if (this.mesh.position.y <= 2) {
      setTimeout(() => {
        scene.remove(this.mesh);
        if (onDestroy && this.bullets.isEmpty()) onDestroy();
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

    this.bullets.update(dt);
  };

  this.init();
};

export default Enemy;
