import { ENEMIES, ITEMS, MOVEMENTS } from "../utils/Consts.js";

// Aqui são gerados os levels
export default {
  1: {
    z: 0,
    enemies: [
      /**
       * Spawn des inimigos no mapa
       * {type} - Tipo de inimigo
       * {movement} - Tipo de movimento
       * {direction} - Direcao do movimento
       **/
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -300,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -20,
        z: -600,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 30,
        z: -800,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -50,
        z: -1000,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -40,
        z: -1200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 60,
        z: -1500,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -60,
        z: -1500,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 10,
        z: -1800,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -10,
        z: -1800,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
    ],

    items: [
      /**
       * Drop de itens no mapa
       * Soma ao atributo {type} do aviao o valor {value}
       */
      // { type: ITEMS.HEALTH, x: 0, z: -400, value: 20 },
      // { type: "reloadTime", x: -50, z: -300, value: -0.5 },
      // { type: "shootDelay", x: 20, z: -500, value: -0.05 },
      { type: "health", x: 50, z: -1000, value: 5 },
      { type: "health", x: -40, z: -1400, value: 10 },
      { type: "health", x: 0, z: -1800, value: 15 },
      { type: "health", x: 14, z: -2200, value: 20 },
      { type: "health", x: -35, z: -2600, value: 25 },
      { type: "health", x: -21, z: -3000, value: 30 },
      { type: "health", x: 30, z: -3400, value: 35 },
      { type: "health", x: 40, z: -3800, value: 40 },
      { type: "health", x: -60, z: -4200, value: 45 },
      { type: "health", x: 60, z: -4600, value: 50 },
      { type: "health", x: 30, z: -5000, value: 60 },
      { type: "health", x: -23, z: -5400, value: 40 },
    ],
  },

  2: {
    z: -2100,

    enemies: [
      {
        type: ENEMIES.TANK,
        x: -60,
        z: 0,
      },
      {
        type: ENEMIES.TANK,
        x: 60,
        z: -300,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -80,
        z: -600,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 40,
        z: -800,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.TANK,
        x: -10,
        z: -900,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -40,
        z: -1300,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 60,
        z: -1300,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.TANK,
        x: -50,
        z: -1500,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -60,
        z: -1800,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
    ],

    items: [],
  },

  3: {
    z: -4200,

    enemies: [
      {
        type: ENEMIES.AIRPLANE,
        x: 10,
        z: 0,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.TANK,
        x: 60,
        z: 0,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 10,
        z: -200,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 30,
        z: -400,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -50,
        z: -400,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 50,
        z: -700,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.TANK,
        x: 40,
        z: -700,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -70,
        z: -900,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
    ],

    items: [],
  },

  4: {
    z: -5400,

    enemies: [
      {
        type: ENEMIES.AIRPLANE,
        x: 70,
        z: 0,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -70,
        z: -100,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 70,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -70,
        z: -300,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 70,
        z: -400,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -70,
        z: -700,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 70,
        z: -700,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.TANK,
        x: -40,
        z: -900,
      },
      {
        type: ENEMIES.TANK,
        x: 40,
        z: -900,
      },
      {
        type: ENEMIES.TANK,
        x: -20,
        z: -1100,
      },
      {
        type: ENEMIES.TANK,
        x: 15,
        z: -1300,
      },
    ],

    items: [],
  },

  5: {
    z: -7000,

    enemies: [
      {
        type: ENEMIES.AIRPLANE,
        x: 40,
        z: 0,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -40,
        z: 0,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -60,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -40,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -20,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 20,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 40,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 60,
        z: -200,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -40,
        z: -500,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 40,
        z: -500,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -800,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.TANK,
        x: -60,
        z: -1200,
      },
      {
        type: ENEMIES.TANK,
        x: 60,
        z: -1200,
      },
      {
        type: ENEMIES.TANK,
        x: -40,
        z: -1300,
      },
      {
        type: ENEMIES.TANK,
        x: 20,
        z: -1300,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -30,
        z: -1600,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 54,
        z: -1600,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -34,
        z: -1800,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 58,
        z: -1800,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -25,
        z: -1900,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 43,
        z: -1900,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },
    ],

    items: [],
  },
};
