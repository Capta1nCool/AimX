import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Controls')
        }

        document.addEventListener('mousedown', () => {
            this.onClick()
        })

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.set(0, 3.5, 11.3)
        this.instance.rotation
        this.scene.add(this.instance)
    }

    setControls()
    {
        // this.controls = new OrbitControls(this.instance, this.canvas)
        // this.controls.enableDamping = true

        this.controls = new PointerLockControls( this.instance, document.body );

        this.controls.pointerSpeed = 0.5;

        document.querySelector("body > canvas").addEventListener( 'mousedown', () => {

            document.body.requestPointerLock();

        } );

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.controls, 'pointerSpeed')
                .name('Mouse sensitivity')
                .min(0.1)
                .max(2)
                .step(0.01)
        }
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    onClick() 
    {
        const vector = new THREE.Vector3(0, 0, 0.01);
        vector.unproject(this.instance);

        const raycaster = new THREE.Raycaster(this.instance.position, vector.sub(this.instance.position).normalize());

        const intersects = raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            const intersection = intersects[0];

            if(intersection.object.name === "TargetSphere")
            {
                this.experience.world.mode.removeTarget(intersection)
            }
        }
    }

    update()
    {
        // this.controls.update()
    }
}