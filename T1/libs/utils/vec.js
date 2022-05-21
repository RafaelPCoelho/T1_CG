import * as THREE from "three";

/**
 * Retorna um novo vetor v normalizado
 *
 * @param {THREE.Vector3} v - Vetor a ser normalizado
 * @returns {THREE.Vector3} Novo vetor normalizado
 */
const normVec = (v) => v.clone().normalize();

/**
 * Retorna um novo vetor v com valores positivos
 *
 * @param {THREE.Vector3} v - Vetor a ser modificado
 * @returns {THREE.Vector3} Novo vetor com valores positivos
 */
const absVec = (v) =>
  new THREE.Vector3(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));

/**
 * Retorna um novo vetor v que representa a distancia entre v1 e v2
 * ( v2 - v1 )
 *
 * @param {THREE.Vector3} v1 - Vetor de inicio
 * @param {THREE.Vector3} v2 - Vetor final
 * @returns {THREE.Vector3} Vetor resultante de v2-v1
 */
const distVec = (v1, v2) =>
  new THREE.Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);

/**
 * Retorna um novo vetor v multiplicado pelo escalar
 *
 * @param {THREE.Vector3} v - Vetor a ser multiplicado
 * @param {Number} scalar - Escalar a ser multiplicado
 * @returns {THREE.Vector3} Novo vetor v multiplicado pelo scalar
 */
const mulVec = (v, scalar) => v.clone().multiplyScalar(scalar);

/**
 * Retorna um novo vetor v com sinais invertidos
 *
 * @param {THREE.Vector3} v - Vetor a ser invertido
 * @returns {THREE.Vector3} Novo vetor com sinais invertidos
 */
const invVec = (v) => v.clone().negate();

/**
 * Retorna um novo vetor que representa a soma
 * de todos os vetores
 *
 * @param {THREE.Vector3[]} vectors - Vetores a serem somados
 * @returns {THREE.Vector3} Novo vetor resultante da soma de [vectors]
 */
const sumVec = (...vectors) => {
  let result = new THREE.Vector3();
  vectors.forEach((v) => result.add(v));
  return result;
};

/**
 * Retorna um novo vetor que representa a multiplicação
 * linear de [v1] e [v2]
 *
 * @param {THREE.Vector3} v1 - Vetor a ser multiplicado
 * @param {THREE.Vector3} v2 - Vetor a ser multiplicado
 * @returns {THREE.Vector3} Novo vetor resultante da multiplicação de [v1]*[v2]
 */
const mulDVec = (v1, v2) => v1.clone().multiply(v2);

/**
 * Retorna um novo vetor com apenas uma direção
 * que aponta para o maior de seus valores (x, y ou z)
 *
 * @param {THREE.Vector3} v - Vetor a ser analisado
 * @returns {THREE.Vector3} Novo vetor unidirecional
 */
const uniVec = (v) => {
  let abs = absVec(v);
  let uni = new THREE.Vector3();

  if (abs.x > abs.y && abs.x > abs.z) uni.set(v.x, 0, 0);
  else if (abs.y > abs.x && abs.y > abs.z) uni.set(0, v.y, 0);
  else if (abs.z > abs.y && abs.z > abs.x) uni.set(0, 0, v.z);

  return uni;
};

export { normVec, absVec, distVec, mulVec, invVec, sumVec, mulDVec, uniVec };
