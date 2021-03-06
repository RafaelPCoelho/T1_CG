import * as THREE from "three";
import { clamp, lerp } from "../libs/utils/math.js";
import { degreesToRadians } from "../../libs/util/util.js";
import { checkCollision } from "../libs/Collision/index.js";
import EntityList from "../utils/EntityList.js";
import Ticker from "../utils/Ticker.js";
import { scene, camera, airplane, game } from "../script.js";
import { MAP, MOVEMENTS } from "../utils/Consts.js";
import EnemyBullet from "./EnemyBullet.js";
import Enemy1GLTFProjection from "../utils/Inimigo1GLTFProjection.js";
import Enemy2GLTFProjection from "../utils/Inimigo2GLTFProjection.js";
import Enemy3GLTFProjection from "../utils/Inimigo3GLTFProjection.js";
import ExplosionProjection from "../utils/ExplosionProjection.js";
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
    this.audio = new THREE.PositionalAudio(camera.audioListener);
    this.audio.hasPlaybackControl = true;
    scene.add(this.audio);

    this.enemyGLTF = null;
    switch (movement) {
      case MOVEMENTS.STRAIGHT: {
        this.enemyGLTF = new Enemy1GLTFProjection(this.mesh.position);
        break;
      }
      case MOVEMENTS.ARC: {
        this.enemyGLTF = new Enemy2GLTFProjection(this.mesh.position);
        break;
      }
      case MOVEMENTS.DIAGONAL: {
        this.enemyGLTF = new Enemy3GLTFProjection(this.mesh.position);
        break;
      }
    }

    this.vx = Math.random() * 20 + 20;
    this.vz = Math.random();
    this.vz = Math.max(0.4, Math.min(this.vz, 0.7));
    this.vy = 0;
    this.alive = true; // Estado do inimigo
    this.bullets = new EntityList(EnemyBullet); // Lista de balas
    this.fireRate = 0.2; // Frequencia de tiros, 1 = 100ms
    this.bulletTicker = new Ticker(100 / this.fireRate, () => {
      this.bullets.add(this.mesh.position);
    }); // Gerador automatico de tiros de acordo com fireRate
    this.frame = 1; // Frame contador para animacao de rotacao do aviao
    this.distanceToActivate = 300; // Distancia do jogador para comecar a tirar e se mover

    this.mesh.position.copy(position);
    //scene.add(this.mesh);
  };

  // Define o estado do inimigo como morto
  this.destroy = () => {
    if (!this.alive) return;
    this.alive = false;
  };

  // Movimenta o inimigo de acordo com o parametro passado
  this.move = (dt) => {
    switch (movement) {
      // Movimento em linha reta
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

      // Movimento de curva
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
        this.mesh.translateX((dx * Math.cos(this.frame - Math.PI / 2)) / 2);

        break;
      }

      // Movimento nas diagonais
      case MOVEMENTS.DIAGONAL: {
        let dx;
        switch (direction) {
          case MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT: {
            dx = -1;
            break;
          }

          case MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT: {
            dx = 1;
            break;
          }
        }

        this.mesh.translateZ(20 * (dt / 1000));
        this.mesh.translateX(dx * 20 * (dt / 1000));

        break;
      }
    }

    if (this.mesh.position.x >= MAP.BOUND_X + 100) this.destroy();
    else if (this.mesh.position.x <= -MAP.BOUND_X - 100) this.destroy();
  };

  // Roda o comportamento do inimigo quando seu estado ??: vivo
  this.aliveBehaviour = (dt) => {
    // Mata o inimigo caso atinja o limite inferior da tela
    if (camera.cameraTransform.position.z + 140 < this.mesh.position.z) {
      this.destroy();
    }

    // Verifica colis??o do inimigo com cada bala disparada pelo avi??o
    Object.values(airplane.bullets.entities).forEach((bullet) => {
      if (checkCollision(this.mesh, bullet.mesh)) {
        game.play("./assets/sounds/destroy_enemy.wav", this.audio);
        bullet.destroy();
        this.destroy();
      }
    });

    // Verifica a colis??o do inimigo com o avi??o
    if (checkCollision(this.mesh, airplane.mesh)) {
      airplane.destroy();
      this.destroy();
    }

    // Anda e atira apenas se estiver no campo de vis??o do aviao
    if (
      this.mesh.position.distanceTo(airplane.mesh.position) <=
      this.distanceToActivate
    ) {
      this.bulletTicker.update(dt);
      this.move(dt);
    }

    if (this.enemyGLTF.inimigo) {
      this.enemyGLTF.inimigo.lookAt(airplane.mesh.position);

      if (movement == MOVEMENTS.DIAGONAL)
        this.enemyGLTF.inimigo.rotateY(degreesToRadians(90));
    }
  };

  // Roda o comportamento do inimigo quando seu estado ??: morto,
  // derrubando o mesmo at?? que encoste no ch??o,
  // ent??o um temporizador ?? disparado para elimin??-lo da cena
  // e seu destrutor ( se passado nos par??metros ) ?? chamado
  // para remov??-lo de seu array controlador
  // var played = false;
  this.deathBehaviour = (dt) => {
    if (this.mesh.position.y <= 2) {
      // if (!played) {
      //   played = true;
      //   game.play("./assets/sounds/destroy_enemy.wav");
      // }

      setTimeout(() => {
        // scene.remove(this.mesh);
        scene.remove(this.enemyGLTF.inimigo);

        if (onDestroy && this.bullets.isEmpty()) onDestroy();
      }, 1000);
    } else {
      if (!this.explosion)
        this.explosion = new ExplosionProjection(this.mesh.position);
      this.vy -= 4.5 * (dt / 1000);
      this.mesh.translateY(this.vy);
    }
  };

  // Atualiza a cada frame o estado do inimigo
  this.update = (dt) => {
    if (this.explosion) {
      this.explosion.update();
      this.explosion.explosao.position.copy(this.mesh.position);
    }
    if (this.alive) this.aliveBehaviour(dt);
    else this.deathBehaviour(dt);

    if (this.enemyGLTF.inimigo)
      this.enemyGLTF.inimigo.position.copy(this.mesh.position);

    this.audio.position.copy(this.mesh.position);

    this.bullets.update(dt);
  };

  this.init();
};

export default Enemy;
