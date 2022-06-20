import * as THREE from "three";
import { airplane, cannons, enemies, keyboard } from "../script.js";
import LEVELS from "../assets/levels.js";

const Game = function () {
  this.GAMEMODES = {
    SURVIVAL: 0,
    CREATIVE: 1,
  };
  this.LEVEL_TYPE = {
    NORMAL: 0,
    RANDOM: 1,
  };
  this.BOUNDS = {
    x: 100,
  };

  this.gamemode = this.GAMEMODES.SURVIVAL;
  this.levelType = this.LEVEL_TYPE.NORMAL;

  // Seta o modo de jogo para sobrevivencia
  this.setGamemodeSurvival = () => {
    this.gamemode = this.GAMEMODES.SURVIVAL;
  };

  // Seta o modo de jogo para criativo
  this.setGamemodeCreative = () => {
    this.gamemode = this.GAMEMODES.CREATIVE;
    airplane.vz = 0;
  };

  // Inicia o level
  this.loadLevel = (level = 1) => {
    LEVELS[level].enemies.forEach((enemy) => {
      if (enemy.type == "air")
        enemies.add(
          new THREE.Vector3(
            enemy.x,
            airplane.mesh.position.y,
            enemy.z + LEVELS[level].z
          ),
          enemy.movement
        );
      else if (enemy.type == "ground")
        cannons.add(
          new THREE.Vector3(enemy.x, 2, enemy.z + enemy.z + LEVELS[level].z)
        );
    });
  };

  this.update = (dt) => {
    if (keyboard.down("M")) {
      if (this.gamemode == this.GAMEMODES.SURVIVAL) this.setGamemodeCreative();
      else this.setGamemodeSurvival();
    }
  };
};

export default Game;
