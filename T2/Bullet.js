import * as THREE from "three";
import { scene, camera } from "./script.js";

const Bullet = function (position, onDestroy) {
  this.mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 10),
    new THREE.MeshStandardMaterial({
      color: "#ffff00",
    })
  );

  // Inicia a munição e suas propriedades
  this.init = () => {
    this.speed = 5;
    this.mesh.position.set(position.x, position.y, position.z);
    scene.add(this.mesh);
  };

  // Chama o destrutor passado como parametro ( se existir )
  // para remover a bala da lista e,
  // posteriormente, remove da cena
  this.destroy = () => {
    if (onDestroy) onDestroy();
    scene.remove(this.mesh);
    console.log(`Killed bullet`);
  };

  // Atualiza o estado da bala e verifica se ela já chegou
  // no limite do cenário
  this.update = () => {
    this.mesh.translateZ(-this.speed);

    if (this.mesh.position.z < camera.cameraTransform.position.z - 250)
      this.destroy();
  };

  this.init();
};

export default Bullet;
