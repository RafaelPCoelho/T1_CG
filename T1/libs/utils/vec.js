import * as THREE from "three";

const normVec = (v) => v.clone().normalize();

const absVec = (vector) =>
  new THREE.Vector3(Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z));

const distVec = (v1, v2) =>
  new THREE.Vector3(v2.x - v1.x, v2.y - v1.y, v2.z - v1.z);

const mulVec = (v, scalar) => v.clone().multiplyScalar(scalar);

const invVec = (v) => v.clone().negate();

const sumVec = (...vectors) => {
  let result = new THREE.Vector3();
  vectors.forEach((v) => result.add(v));
  return result;
};

const mulDVec = (v1, v2) => v1.clone().multiply(v2);

const uniVec = (v) => {
  let abs = absVec(v);
  let uni = new THREE.Vector3();

  if (abs.x > abs.y && abs.x > abs.z) uni.set(v.x, 0, 0);
  else if (abs.y > abs.x && abs.y > abs.z) uni.set(0, v.y, 0);
  else if (abs.z > abs.y && abs.z > abs.x) uni.set(0, 0, v.z);

  return uni;
};

export { normVec, absVec, distVec, mulVec, invVec, sumVec, mulDVec, uniVec };
