import { distVec, absVec, normVec } from "../utils/vec.js";

const pushBack = (body1, body2, speed) => {
  if (speed == 0) return;

  let dist = distVec(body1.position, body2.position);
  let nDist = normVec(dist);
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

export { pushBack };
