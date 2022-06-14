import { airplane, keyboard } from "../script.js";

const Game = function () {
  this.GAMEMODES = {
    SURVIVAL: 0,
    CREATIVE: 1,
  };

  this.gamemode = this.GAMEMODES.SURVIVAL;

  // Seta o modo de jogo para sobrevivencia
  this.setGamemodeSurvival = () => {
    this.gamemode = this.GAMEMODES.SURVIVAL;
  };

  // Seta o modo de jogo para criativo
  this.setGamemodeCreative = () => {
    this.gamemode = this.GAMEMODES.CREATIVE;
    airplane.vz = 0;
  };

  this.update = (dt) => {
    if (keyboard.down("M")) {
      if (this.gamemode == this.GAMEMODES.SURVIVAL) this.setGamemodeCreative();
      else this.setGamemodeSurvival();
    }
  };
};

export default Game;
