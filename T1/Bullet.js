import { basicMaterial } from "./script";

const Bullet = function (position, rotation) {
  this.mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.5, 0.5, 2),
    basicMaterial
  );

  this.mesh.position.set(position);
  this.mesh.rotation.set(rotation);

  this.speed = 10;

  this.update = () => {
    var { translateZ } = this.mesh.position;
    translateZ(this.speed);
  };
};

export default Bullet;
