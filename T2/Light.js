import * as THREE from "three";
import{ scene, camera, airplane } from "./script.js";

const Light = function (){
    this.intensity = 0.5;
    this.lightPosition = new THREE.Vector3(0, 150, 50);
    this.color = "rgb(255, 255, 255)";

    this.targetObj = airplane.mesh;

    this.mainLight = new THREE.DirectionalLight(this.color, this.intensity);
    this.mainLight.position.copy(this.lightPosition);
    this.mainLight.castShadow = true;

    this.mainLight.shadow.mapSize.width  =  1024; 
    this.mainLight.shadow.mapSize.height =  1024;
    this.mainLight.shadow.camera.near = .1;
    this.mainLight.shadow.camera.far = 2000;
    this.mainLight.shadow.camera.left = -600;
    this.mainLight.shadow.camera.right = 600;
    this.mainLight.shadow.camera.top = 600;
    this.mainLight.shadow.camera.bottom = -600;

    this.mainLight.shadow.radius = 1.5;

    this.mainLight.target = this.targetObj;

    this.spotHelper = new THREE.CameraHelper(this.mainLight.shadow.camera, 0xFF8C00);

    this.init = () => {
        scene.add(this.mainLight);
        scene.add(this.mainLight.target);
        scene.add(this.spotHelper);
    };
    
    this.update = () => {
        this.mainLight.position.set(
            airplane.mesh.position.x,
            150,
            airplane.mesh.position.z - 20
        );
    };

    this.init();
};

export default Light;