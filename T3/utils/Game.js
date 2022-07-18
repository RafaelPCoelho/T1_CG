import * as THREE from "three";
import { airplane, cannons, enemies, keyboard, items } from "../script.js";
import inputLevels from "../assets/levels.js";
import { ITEMS, GAMEMODES, LEVELS, ENEMIES } from "./Consts.js";

const Game = function () {
  this.gamemode = GAMEMODES.SURVIVAL;
  this.levelType = LEVELS.NORMAL;
  this.preloads = {};

  this.preload = (name, asset) => {};

  // Seta o modo de jogo para sobrevivencia
  this.setGamemodeSurvival = () => {
    this.gamemode = GAMEMODES.SURVIVAL;
  };

  // Seta o modo de jogo para criativo
  this.setGamemodeCreative = () => {
    this.gamemode = GAMEMODES.CREATIVE;
    airplane.vz = 0;
  };

  // Inicia o level
  this.loadLevel = (level = 1) => {
    // Spawna os inimigos
    inputLevels[level].enemies.forEach((enemy) => {
      switch (enemy.type) {
        case ENEMIES.AIRPLANE: {
          enemies.add(
            new THREE.Vector3(
              enemy.x,
              airplane.mesh.position.y,
              enemy.z + inputLevels[level].z
            ),
            enemy.movement,
            enemy.direction
          );
          break;
        }

        case ENEMIES.TANK: {
          cannons.add(
            new THREE.Vector3(enemy.x, 2, enemy.z + inputLevels[level].z)
          );
          break;
        }
      }
    });

    // Spawna os itens
    inputLevels[level].items.forEach((item) => {
      items.add(
        item.type,
        new THREE.Vector3(
          item.x,
          airplane.mesh.position.y,
          item.z + inputLevels[level].z
        ),
        item.value
      );
    });
  };

  this.update = (dt) => {
    if (keyboard.down("G")) {
      if (this.gamemode == GAMEMODES.SURVIVAL) this.setGamemodeCreative();
      else this.setGamemodeSurvival();
    }
  };
};

export default Game;
