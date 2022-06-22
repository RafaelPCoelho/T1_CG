import { ENEMIES, MOVEMENTS } from "../utils/Consts.js";

// Aqui são gerados os levels
export default {
  1: {
    z: 0,
    enemies: [
      /**
       * Spawn de inimigos no mapa
       * -- type
       * air - Avião
       * ground - Lança misseis terrestre
       **/
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
      { type: ENEMIES.AIRPLANE, x: -30, z: -550 },
      { type: ENEMIES.AIRPLANE, x: 20, z: -850 },

      {
        type: ENEMIES.AIRPLANE,
        x: 10,
        z: -1150,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
      { type: ENEMIES.AIRPLANE, x: -20, z: -1300 },
      {
        type: ENEMIES.AIRPLANE,
        x: -5,
        z: -1450,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },

      { type: ENEMIES.AIRPLANE, x: -35, z: -1600 },
      { type: ENEMIES.TANK, x: 25, z: -1750 },
      { type: ENEMIES.AIRPLANE, x: 5, z: -1900 },

      { type: ENEMIES.AIRPLANE, x: 5, z: -2200 },
      { type: ENEMIES.AIRPLANE, x: 50, z: -2100 },
      { type: ENEMIES.TANK, x: -40, z: -2200 },

      { type: ENEMIES.AIRPLANE, x: -10, z: -2300 },
      { type: ENEMIES.AIRPLANE, x: 10, z: -2400 },
      { type: ENEMIES.TANK, x: -40, z: -2500 },

      { type: ENEMIES.AIRPLANE, x: 5, z: -2600 },
      { type: ENEMIES.AIRPLANE, x: 35, z: -2700 },
      { type: ENEMIES.AIRPLANE, x: -50, z: -2800 },
    ],
    items: [
      /**
       * Drop de itens no mapa
       * Soma ao atributo {type} do aviao o valor {value}
       */
      { type: "health", x: 0, z: -100, value: 20 },
      { type: "reloadTime", x: -50, z: -300, value: -0.5 },
      { type: "reloadTime", x: -50, z: -300, value: -4.0 },
      { type: "shootDelay", x: 20, z: -500, value: -0.05 },
      { type: "shootDelay", x: -30, z: -50, value: -0.5 },
    ],
  },
};
