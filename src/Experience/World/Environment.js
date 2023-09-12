import Experience from "../Experience";
import * as THREE from 'three'

export default class Environment {
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Environment')
        }

        this.setSunLight()
        // this.setEnvironmentMap()
    }

    setSunLight() 
    {
        let light = new THREE.DirectionalLight(0xFFFFFF, 0.7);
        light.position.set(5.5, 10, 8);
        light.target.position.set(0, 0, 0);
        light.shadow.bias = -0.001;
        light.shadow.camera.near = -15;
        light.shadow.camera.far = 15.0;
        light.shadow.camera.left = 15;
        light.shadow.camera.right = -15;
        light.shadow.camera.top = 8;
        light.shadow.camera.bottom = -1;
        this.scene.add(light);

        // this.scene.add(new THREE.DirectionalLightHelper(light))

        light = new THREE.AmbientLight(0xffffff, 2.5);
        this.scene.add(light);        
    }
}