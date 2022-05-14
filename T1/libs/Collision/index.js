import * as THREE from "three";

const checkCollisionOnAxis = (p1, s1, p2, s2) => p1 + s1 > p2 && p2 + s2 > p1;

const checkCollision = (body1, body2) =>
  checkCollisionOnAxis(
    body1.position.x,
    body1.geometry.parameters.width,
    body2.position.x,
    body2.geometry.parameters.width
  ) &&
  checkCollisionOnAxis(
    body1.position.y,
    body1.geometry.parameters.depth,
    body2.position.y,
    body2.geometry.parameters.depth
  ) &&
  checkCollisionOnAxis(
    body1.position.z,
    body1.geometry.parameters.height,
    body2.position.z,
    body2.geometry.parameters.height
  );

const pushBack = (body1, body2, speed) => {
  let dist = distance(body1, body2);
  let nDist = normalize(dist);
  let absDist = absVec(nDist);

  // body1.translateX(-dist.x / 2);
  // body1.translateY(-dist.y / 2);
  // body1.translateZ(-dist.z / 2);

  if (absDist.x > absDist.y && absDist.x > absDist.z)
    body2.translateX(nDist.x * speed);
  if (absDist.y > absDist.x && absDist.y > absDist.z)
    body2.translateY(nDist.y * speed);
  if (absDist.z > absDist.x && absDist.z > absDist.y)
    body2.translateZ(nDist.z * speed);
};

const normalize = (vector) => {
  let m = Math.sqrt(
    vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
  );

  return new THREE.Vector3(vector.x / m, vector.y / m, vector.z / m);
};

const absVec = (vector) =>
  new THREE.Vector3(Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z));

const distance = (body1, body2) =>
  new THREE.Vector3(
    body2.position.x - body1.position.x,
    body2.position.y - body1.position.y,
    body2.position.z - body1.position.z
  );

export { checkCollision, pushBack, distance };
