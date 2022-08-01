import * as THREE from "three";
import { scene, camera, game } from "../script.js";

const Bullet = function (position, onDestroy) {
  // Inicia a munição e suas propriedades
  this.init = () => {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 5),
      new THREE.MeshStandardMaterial({
        color: "#ffff00",
      })
    );
    this.mesh.castShadow = true;

    this.speed = -5;
    this.startPos = position.clone();
    this.maxDist = 400;

    this.mesh.position.copy(position);
    scene.add(this.mesh);

    this.audio = new THREE.PositionalAudio(camera.audioListener);
    this.audio.hasPlaybackControl = true;
    this.mesh.add(this.audio);
    game.play("./assets/sounds/hit_enemy.ogg", this.audio);
  };

  // Chama o destrutor passado como parametro ( se existir )
  // para remover a bala da lista e,
  // posteriormente, remove da cena
  this.destroy = () => {
    if (onDestroy) onDestroy();
    scene.remove(this.mesh);
    // console.log(`Killed bullet`);
  };

  // Atualiza o estado da bala e verifica se ela já chegou
  // no limite do cenário
  this.update = () => {
    this.mesh.translateZ(this.speed);

    if (this.mesh.position.distanceTo(this.startPos) > this.maxDist)
      this.destroy();
  };

  this.init();
};

export default Bullet;
