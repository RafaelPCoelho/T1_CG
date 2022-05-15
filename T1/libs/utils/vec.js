import * as THREE from "three";

const normVec = (vector) => {
  let m = Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
  );

  return new THREE.Vector3(vector.x / m, vector.y / m, vector.z / m);
};

const absVec = (vector) =>
  new THREE.Vector3(Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z));

const distVec = (body1, body2) =>
  new THREE.Vector3(
    body2.position.x - body1.position.x,
    body2.position.y - body1.position.y,
    body2.position.z - body1.position.z
  );

const mulVec = (vector, scalar) =>
  new THREE.Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);

export { normVec, absVec, distVec, mulVec };
