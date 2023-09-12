import Experience from "../Experience.js";
import * as THREE from 'three'
import Environment from "./Environment.js";
import SphereFrenzy from "./SphereFrenzy.js";
import GridShot from "./GridShot.js";

export default class World 
{
    constructor(mode) 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources;

        
        this.resources.on('ready', () => 
        {
            // Setup Environent
            if(mode === "Gridshot") {
                this.mode = new GridShot(25, 8, 20)
            } else if((mode === "SphereFrenzy")) {
                this.mode = new SphereFrenzy(25, 8, 20)
            }
            this.environment = new Environment()
            
        })
    }
}