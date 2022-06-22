import * as THREE from "three";
import { clamp, lerp } from "../libs/utils/math.js";
import { degreesToRadians } from "../../libs/util/util.js";
import { checkCollision } from "../libs/Collision/index.js";
import EntityList from "../utils/EntityList.js";
import Ticker from "../utils/Ticker.js";
import { scene, camera, airplane, game } from "../script.js";
import { MAP, MOVEMENTS } from "../utils/Consts.js";
import EnemyBullet from "./EnemyBullet.js";

const Enemy = function (
  position,
  movement = MOVEMENTS.STRAIGHT,
  direction = MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
  onDestroy
) {
  this.init = () => {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(6, 6, 6),
      new THREE.MeshLambertMaterial({
        color: "rgb(150, 60, 30)",
      })
    );

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
    this.frame = 1;

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
      case MOVEMENTS.STRAIGHT: {
        switch (direction) {
          case MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT: {
            this.mesh.translateX(this.vx * -1 * (dt / 1000));
            break;
          }

          case MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT: {
            this.mesh.translateX(this.vx * 1 * (dt / 1000));
            break;
          }

          default: {
            this.mesh.translateZ(20 * (dt / 1000));
            break;
          }
        }
        break;
      }

      case MOVEMENTS.ARC: {
        let dx;

        switch (direction) {
          case MOVEMENTS.DIRECTIONS.ARC_LEFT: {
            dx = -1;
            break;
          }

          case MOVEMENTS.DIRECTIONS.ARC_RIGHT: {
            dx = 1;
            break;
          }
        }

        this.frame += 0.2 * (dt / 1000);
        this.frame = clamp(this.frame, 0, Math.PI / 2);
        this.mesh.translateZ(Math.sin(this.frame + Math.PI / 2) * 2.5);
        this.mesh.translateX((dx * -Math.cos(this.frame - Math.PI / 2)) / 1.5);

        break;
      }
    }

    if (this.mesh.position.x >= MAP.BOUND_X + 100) this.destroy();
    else if (this.mesh.position.x <= -MAP.BOUND_X - 100) this.destroy();
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

    // Anda e atira apenas se estiver no campo de visão do aviao
    if (this.mesh.position.distanceTo(airplane.mesh.position) <= 500) {
      this.bulletTicker.update(dt);
      this.move(dt);
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
