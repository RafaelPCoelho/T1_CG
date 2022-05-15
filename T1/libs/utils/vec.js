import * as THREE from "three";

const normVec = (vector) => {
  let m = Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
  );

  return new THREE.Vector3(vector.x / m, vector.y / m, vector.z / m);
};

const absVec = (vector) =>
  new THREE.Vector3(Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z));

const distVec = (vec1, vec2) =>
  new THREE.Vector3(vec2.x - vec1.x, vec2.y - vec1.y, vec2.z - vec1.z);

const mulVec = (vector, scalar) =>
  new THREE.Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);

const invVec = (vector) => new THREE.Vector3(-vector.x, -vector.y, -vector.z);

export { normVec, absVec, distVec, mulVec, invVec };
