import * as THREE from "three";
import { scene, airplane } from "../script.js";

const HealthBar = function () {

    this.init = () => {
        this.x = airplane.health;

        this.geometry = new THREE.BoxGeometry(3, 3, 3);
        this.material = new THREE.MeshLambertMaterial({
            color: "rgb(255, 0, 0)",
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(0, 1000, -150);

        scene.add(this.mesh);
    };

    this.update = () => {
        this.x = airplane.health;
        this.mesh.scale.set(this.x, 3, 3);
    };
    
    this.init();
};

export default HealthBar;