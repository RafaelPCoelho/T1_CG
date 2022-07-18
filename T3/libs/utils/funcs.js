import * as THREE from "three";

/**
 * Dada uma variavel do tipo objeto, adiciona um novo valor-chave,
 * sempre incrementando à chave para evitar colisões e retorna a mesma
 *
 * @param {object} object
 * @param {*} value
 * @returns {void}
 */

// Dada uma variavel do tipo objeto
// adiciona uma nova chave-valor
// com a chave sempre sendo incrementada,
// para não haver colisões de chaves
// e retorna essa chave
export const pushObject = (object, value) => {
  var keys = Object.keys(object);
  var next = keys[keys.length - 1] + 1;

  object[next] = value;
  return next;
};

export const iterateCalling = (
  targetArray = [],
  functionName = "",
  ...params
) => {
  targetArray.forEach((value) => value[functionName](params));
};

/**
 * Prevê a posição de {to} com base na demora que {from} levará para chegar à {to}
 * na velocidade {speedFrom}, sendo que {to} também está se movendo na velocidade
 * de {speedTarget}. Além disso, a funcção conta com o parâmetro {spread} que define
 * a variação da bala, que aumenta e diminui a chance de acertos.
 *
 * Usado para prever a posição de um alvo
 * @param {THREE.Vector3} from Posição do inimigo
 * @param {THREE.Vector3} to Posição do avião
 * @param {number} speedFrom Velocidade da bala
 * @param {THREE.Vector3} speedTarget Velocidade do avião ( em 3 dimensões )
 * @param {number} variation Espalhamento dos tiros
 * @param {number} dt // DeltaTempo estimado para calculo do tempo até o alcance
 * @returns
 */
export const predictPosition = (
  from,
  to,
  speedFrom,
  speedTarget,
  variation,
  dt = 16.66
) => {
  // Calcula posicoes e distancia ate o alvo
  let projection = to.clone();
  let dist = projection.distanceTo(from);
  let saveY = projection.y;

  // Prevê o tempo do hit da bala com o aviao
  let hitDelay = dist / (speedFrom * (dt / 1000));

  // Define local da projeção, com uma variação para garantir erro/acerto
  projection.add(
    speedTarget
      .multiplyScalar(hitDelay)
      .addScalar(-variation + Math.random() * 2 * variation)
  );

  // Retorna a altura anterior ja que a mesma é fixa
  projection.setY(saveY);

  return projection;
};
