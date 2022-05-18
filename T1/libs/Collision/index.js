import * as THREE from "three";
import { absVec, distVec } from "../utils/vec.js";

const checkCollisionOnAxis = (min1, max1, min2, max2) =>
  min1 < max2 && max1 > min2;

const checkCollision = (body1, body2) => {
  let normal = new THREE.Vector3();

  if (!body1.geometry.boundingBox) body1.geometry.computeBoundingBox();
  if (!body2.geometry.boundingBox) body2.geometry.computeBoundingBox();

  var bb1 = body1.geometry.boundingBox;
  var bb2 = body2.geometry.boundingBox;

  if (
    checkCollisionOnAxis(
      body1.position.x + bb1.min.x,
      body1.position.x + bb1.max.x,
      body2.position.x + bb2.min.x,
      body2.position.x + bb2.max.x
    ) &&
    checkCollisionOnAxis(
      body1.position.y + bb1.min.y,
      body1.position.y + bb1.max.y,
      body2.position.y + bb2.min.y,
      body2.position.y + bb2.max.y
    ) &&
    checkCollisionOnAxis(
      body1.position.z + bb1.min.z,
      body1.position.z + bb1.max.z,
      body2.position.z + bb2.min.z,
      body2.position.z + bb2.max.z
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
