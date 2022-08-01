import * as THREE from "three";
import { scene, camera, airplane, game } from "../script.js";

const Mobile = function () {
  this.init = () => {
    this.scale = 1;
    this.previousScale = 0;
    this.size = 5;
    this.fwdValue = 0;
    this.bkdValue = 0;
    this.rgtValue = 0;
    this.lftValue = 0;
    this.tempVector = new THREE.Vector3();
    this.upVector = new THREE.Vector3(0, 1, 0);

    this.buttons = new Buttons(onButtonDown, onButtonUp);
    this.pressedA = false;
    this.pressedB = false;
  };

  this.loading = () => {
    this.loadingManager = new THREE.LoadingManager(() => {
      this.loader = document.getElementById("loader");
      this.loader.style.display = "none";

      thisbutton = document.getElementById("start");
      thisbutton.style.display = "inline-block";
    });

    game.preload[url];
  };

  //BOTOES
  this.onButtonDown = (event) => {
    switch (event.target.id) {
      case "A":
        airplane.shoot(true);
        break;
      case "B":
        airplane.torpedo();
        break;
    }
  };

  this.onButtonUp = (event) => {
    airplane.shoot(false);
  };

  //JOYSTICK
  this.moveJoystick = () => {
    this.joystiMove = nipplejs.create({
      zone: document.getElementById("joystickWrapper"),
      mode: "static",
      position: { top: "-80px", left: "80px" },
    });

    this.joystiMove.on("move", function (evt, data) {
      // this.forward = data.vector.y;
      // this.turn = data.vector.x;
      this.forward = airplane.vx;
      this.turn = airplane.vx;
      this.fwdValue = this.bkdValue = this.lftValue = this.rgtValue = 0;

      if (this.forward > 0) this.fwdValue = Math.abs(this.forward);
      else if (this.forward < 0) this.bkdValue = Math.abs(this.forward);

      if (this.turn > 0) this.rgtValue = Math.abs(this.turn);
      else if (this.turn < 0) this.lftValue = Math.abs(this.turn);
    });

    this.joystiMove.on("end", function (evt) {
      this.bkdValue = 0;
      this.fwdValue = 0;
      this.lftValue = 0;
      this.rgtValue = 0;
    });
  };

  this.updateJoystick = () => {
    this.angle = controls.getAzimuthalAngle();

    if (this.fwdValue > 0) {
      this.tempVector
        .set(0, 0, -this.fwdValue)
        .applyAxisAngle(this.upVector, this.angle);
      //this.airplane.aviao.position
      airplane.mesh.position.addScaledVector(this.tempVector, 1);
    }

    if (this.bkdValue > 0) {
      this.tempVector
        .set(0, 0, -this.bkdValue)
        .applyAxisAngle(this.upVector, this.angle);
      //this.airplane.aviao.position
      airplane.mesh.position.addScaledVector(this.tempVector, 1);
    }

    if (this.lftValue > 0) {
      this.tempVector
        .set(0, 0, -this.lftValue)
        .applyAxisAngle(this.upVector, this.angle);
      //this.airplane.aviao.position
      airplane.mesh.position.addScaledVector(this.tempVector, 1);
    }

    if (this.rgtValue > 0) {
      this.tempVector
        .set(0, 0, -this.rgtValue)
        .applyAxisAngle(this.upVector, this.angle);
      //this.airplane.aviao.position
      airplane.mesh.position.addScaledVector(this.tempVector, 1);
    }

    //mesh.updateMatrixWorld()
  };
};

export default Mobile;
