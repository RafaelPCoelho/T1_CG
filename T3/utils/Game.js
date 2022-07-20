import * as THREE from "three";
import { airplane, cannons, enemies, keyboard, items } from "../script.js";
import inputLevels from "../assets/levels.js";
import { ITEMS, GAMEMODES, LEVELS, ENEMIES } from "./Consts.js";
import { GLTFLoader } from "../../build/jsm/loaders/GLTFLoader.js";

const Game = function () {
  this.gamemode = GAMEMODES.SURVIVAL;
  this.levelType = LEVELS.NORMAL;
  this.gltfLoader = new GLTFLoader();
  this.preloads = {};
  this.loadListeners = {};

  this.preload = async (url) => {
    if (!this.preloads[url]) {
      try {
        this.preloads[url] = await this.gltfLoader.loadAsync(url);

        console.log("[GLTF LOADER]", url, "LOADED", this.preloads[url]);
      } catch (err) {
        console.log(err);
      }
    }
  };

  this.load = (url, onLoad) => {
    console.log("[GLTF LOADER]", "BINDED LISTENER", url);
    if (!Array.isArray(this.loadListeners[url])) this.loadListeners[url] = [];

    this.loadListeners[url].push(onLoad);
  };

  this.triggerLoadListeners = () => {
    console.log("[GLTF LOADER]", "TRIGGER LISTENERS", this.loadListeners);
    Object.keys(this.loadListeners).forEach((url) => {
      this.loadListeners[url].forEach((listener) =>
        listener(this.preloads[url].scene.clone())
      );
    });
  };

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
