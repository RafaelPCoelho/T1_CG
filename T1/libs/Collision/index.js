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

export { checkCollision };
