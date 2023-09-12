import Experience from "../Experience";
import * as THREE from 'three';

function genRandom(min, max) 
{
    return Math.random() * (max - min) + min;
}

export default class SphereFrenzy 
{
    constructor(roomWidth, roomHeight, amount) 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        
        
        this.roomWidth = roomWidth - 0.2;
        this.roomHeight = roomHeight - 0.8;
        this.amount = amount;
        this.targets = []
        document.querySelector("body > div.ui > h2").innerText = "SPHERE FRENZY"

        this.sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    
        this.sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x00cfca
        });
        
        this.instance = new THREE.Object3D()
        this.scene.add(this.instance)

        this.spawnTarget(this.amount)
        this.createRoom()
    }

    createRoom()
    {
        //Room
        this.resources.items.wallTexture.wrapS = THREE.RepeatWrapping;
        this.resources.items.wallTexture.wrapT = THREE.RepeatWrapping;
        // this.resources.items.wallTexture.anisotropy = 2;
        this.resources.items.wallTexture.repeat.set(7, 3);
        
        var room = new THREE.Mesh(
            new THREE.BoxGeometry(25, 8, 25),
            new THREE.MeshStandardMaterial({ color: 0x202425, map: this.resources.items.wallTexture, side: THREE.BackSide })
        );
        room.receiveShadow = true;
        room.position.set(0, 7 / 2, 0);
        this.scene.add(room);
    }

    spawnTarget(amount) 
    {

        this.sphereMesh = new THREE.InstancedMesh(this.sphereGeometry, this.sphereMaterial, amount);
        this.sphereMesh.name = 'TargetSphere'

        for (let i = 0; i < amount; i++) {
            const position = new THREE.Vector3(
                genRandom(-this.roomWidth/2, this.roomWidth/2),
                genRandom(0, this.roomHeight),
                -10
            );
            this.sphereMesh.setMatrixAt(i, new THREE.Matrix4().setPosition(position));
        }

        this.instance.add(this.sphereMesh);
    }

    removeTarget(intersection)
    {
        const instanceId = intersection.instanceId;
        
        const newMatrixArray = new Float32Array((this.sphereMesh.count - 1) * 16);

        // Copy the instance matrices excluding the removed instance
        let newIndex = 0;
        for (let i = 0; i < this.sphereMesh.count; i++) {
            if (i !== instanceId) {
                const startIdx = i * 16;
                newMatrixArray.set(
                    this.sphereMesh.instanceMatrix.array.subarray(startIdx, startIdx + 16),
                    newIndex * 16
                );
                newIndex++;
            }
        }

        // Update the instanceMatrix array with the new array and decrement the count
        this.sphereMesh.count--;
        this.sphereMesh.instanceMatrix.array = newMatrixArray;
        this.sphereMesh.instanceMatrix.needsUpdate = true;

        document.getElementById('hitmarker').style.display = "block";
        setTimeout(() => {
            document.getElementById('hitmarker').style.display = "none";
        }, 100);

        this.experience.resources.items.hitSound.play()
    }
}