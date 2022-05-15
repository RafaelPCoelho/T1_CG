import * as THREE from "three";
import { absVec, distVec } from "../utils/vec.js";

const checkCollisionOnAxis = (p1, s1, p2, s2) => p1 + s1 > p2 && p2 + s2 > p1;

const checkCollision = (body1, body2) => {
  let normal = new THREE.Vector3();

  if (
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
    )
  ) {
    let diff = distVec(body1.position, body2.position);
    let abs = absVec(diff);

    if (abs.x > abs.y && abs.x > abs.z)
      normal.set(1 * (diff.x / Math.abs(diff.x)), 0, 0);
    else if (abs.y > abs.x && abs.y > abs.z)
      normal.set(0, 1 * (diff.y / Math.abs(diff.y)), 0);
    else if (abs.z > abs.x && abs.z > abs.y)
      normal.set(0, 0, 1 * (diff.z / Math.abs(diff.z)));

    return normal;
  }

  return null;
};

export { checkCollision };
