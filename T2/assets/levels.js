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
      { type: "air", x: 0, z: -250, movement: "horz" },
      { type: "air", x: -30, z: -550 },
      { type: "air", x: 20, z: -850 },

      { type: "air", x: 10, z: -1150 },
      { type: "air", x: -20, z: -1300 },
      { type: "air", x: -5, z: -1450 },

      { type: "air", x: -35, z: -1600 },
      { type: "ground", x: 25, z: -1750 },
      { type: "air", x: 5, z: -1900 },

      { type: "air", x: 5, z: -2200 },
      { type: "air", x: 50, z: -2100 },
      { type: "ground", x: -40, z: -2200 },

      { type: "air", x: -10, z: -2300 },
      { type: "air", x: 10, z: -2400 },
      { type: "ground", x: -40, z: -2500 },

      { type: "air", x: 5, z: -2600 },
      { type: "air", x: 35, z: -2700 },
      { type: "air", x: -50, z: -2800 },
    ],
    items: [
      /**
       * Drop de itens no mapa
       * -- type
       * health - Item que dá {value} de vida
       * reloadSpeed - Item que dá maior velocidade de recarga por {value} segundos
       */
      { type: "health", x: 0, z: -100, value: 20 },
      { type: "health", x: 0, z: -100, value: 20 },
    ],
  },
};
