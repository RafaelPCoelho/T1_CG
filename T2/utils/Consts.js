export const ITEMS = {
  HEALTH: "item/health",
  RELOAD_SPEED: "item/reloadSpeed",
};

export const GAMEMODES = {
  SURVIVAL: 0,
  CREATIVE: 1,
};

export const LEVELS = {
  NORMAL: 0,
  RANDOM: 1,
};

export const MAP = {
  BOUND_X: 100,
};

export const ENEMIES = {
  AIRPLANE: "enemies/airplane",
  TANK: "enemies/tank",
};

export const MOVEMENTS = {
  STRAIGHT: "movements/straight",
  DIAGONAL: "movements/diagonal",
  ARC: "movements/arc",
  DIRECTIONS: {
    STRAIGHT_LEFT: "movements/straight/left",
    STRAIGHT_RIGHT: "movements/straight/right",
    STRAIGHT_FORWARD: "movements/straight/forward",
    DIAGONAL_LEFT: "movements/diagonal/left",
    DIAGONAL_RIGHT: "movements/diagonal/right",
    ARC_LEFT: "movements/arc/left",
    ARC_RIGHT: "movements/arc/right",
  },
};

export default {
  ITEMS,
  GAMEMODES,
  LEVELS,
  MAP,
  ENEMIES,
  MOVEMENTS,
};
