import { ENEMIES, MOVEMENTS } from "../utils/Consts.js";

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
        z: -250,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -20,
        z: -450,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 30,
        z: -650,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -50,
        z: -750,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -40,
        z: -850,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 60,
        z: -1050,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -60,
        z: -1150,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 10,
        z: -1350,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -10,
        z: -1350,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_RIGHT,
      },
      {
        type: ENEMIES.TANK,
        x: -60,
        z: -1550,
      },
      {
        type: ENEMIES.TANK,
        x: 60,
        z: -1750,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: -80,
        z: -1850,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 40,
        z: -1950,
        movement: MOVEMENTS.ARC,
        direction: MOVEMENTS.DIRECTIONS.ARC_LEFT,
      },
      {
        type: ENEMIES.TANK,
        x: -10,
        z: -2050,
      },

      /**
       * Teste de movimentos dos inimigos
       * 
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_FORWARD,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.STRAIGHT,
        direction: MOVEMENTS.DIRECTIONS.STRAIGHT_RIGHT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_LEFT,
      },
      {
        type: ENEMIES.AIRPLANE,
        x: 0,
        z: -250,
        movement: MOVEMENTS.DIAGONAL,
        direction: MOVEMENTS.DIRECTIONS.DIAGONAL_RIGHT,
      },
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
      */
    ],
    items: [
      /**
       * Drop de itens no mapa
       * Soma ao atributo {type} do aviao o valor {value}
       */
      { type: "health", x: 0, z: -100, value: 20 },
      { type: "reloadTime", x: -50, z: -300, value: -0.5 },
      { type: "shootDelay", x: 20, z: -500, value: -0.05 },
    ],
  },
};
