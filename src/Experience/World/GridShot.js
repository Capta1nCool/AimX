import Experience from "../Experience";
import * as THREE from 'three';

export default class GridShot 
{
    constructor(roomWidth, roomHeight, rows) 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene;
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.ui = this.experience.ui

        
        this.roomWidth = roomWidth;
        this.roomHeight = roomHeight;
        this.rows = rows;
        this.gridPositions = [
            new THREE.Vector3(0, this.roomHeight / 2 - 0.5, 0),
            new THREE.Vector3(1.5, this.roomHeight / 2 - 0.5, 0),
            new THREE.Vector3(-1.5, this.roomHeight / 2 - 0.5, 0),
            new THREE.Vector3(0, this.roomHeight / 2 + 1, 0),
            new THREE.Vector3(1.5, this.roomHeight / 2 + 1, 0),
            new THREE.Vector3(-1.5, this.roomHeight / 2 + 1, 0),
            new THREE.Vector3(0, this.roomHeight / 2 - 2.0, 0),
            new THREE.Vector3(1.5, this.roomHeight / 2 - 2.0, 0),
            new THREE.Vector3(-1.5, this.roomHeight / 2 - 2.0, 0)
        ];
        this.targets = []
        this.sphereGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        this.sphereMaterial = new THREE.MeshStandardMaterial({
            color: 0x00cfca
        });
        document.querySelector("body > div.ui > h2").innerText = "GRIDSHOT"

        this.instance = new THREE.Object3D()
        this.scene.add(this.instance)

        for (let i = 0; i < 3; i++) {               
            this.spawnTarget()
        }
        this.createRoom()
    }

    createRoom()
    {
        //Room
        this.resources.items.wallTexture.wrapS = THREE.RepeatWrapping;
        this.resources.items.wallTexture.wrapT = THREE.RepeatWrapping;
        // this.resources.items.wallTexture.anisotropy = 2;
        this.resources.items.wallTexture.repeat.set(3, 3);
        
        var room = new THREE.Mesh(
            new THREE.BoxGeometry(10, 10, 30),
            new THREE.MeshStandardMaterial({ color: 0x202425, map: this.resources.items.wallTexture, side: THREE.BackSide })
        );
        room.receiveShadow = true;
        room.position.set(0, 7 / 2, 0);
        this.scene.add(room);
    }

    spawnTarget() 
    {
        var position;
        do {
            position = this.gridPositions[Math.floor(Math.random() * this.gridPositions.length)]; 
        } while (this.targets.includes(position));
        
        this.sphereMesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial)
        this.sphereMesh.name = 'TargetSphere'

        this.sphereMesh.position.copy(position)
        
        this.targets.push(position)
        this.instance.add(this.sphereMesh);
    }
    
    removeTarget(target) 
    {
        this.instance.remove(target.object)
        
        document.getElementById('hitmarker').style.display = "block";
        setTimeout(() => {
            document.getElementById('hitmarker').style.display = "none";
        }, 100);
        
        this.experience.resources.items.hitSound.play()
        
        this.spawnTarget()
        
        this.targets = this.targets.filter((item) => !item.equals(target.object.position));
        
        this.ui.score++
        document.querySelector("body > div.ui > div.score").innerText = this.ui.score.toString();
    }
}