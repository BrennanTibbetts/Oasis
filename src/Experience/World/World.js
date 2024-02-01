import Experience from "../Experience"
import Environment from "./Environment"
import Floor from "./Floor"
import RockLarge1 from "./Landscape/Rocks/LargeRock1"
import * as THREE from 'three'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {

            // Setup
            this.floor = new Floor()
            this.rockLarge1 = new RockLarge1()
            this.environment = new Environment()

        })

    }

    update(){

        if(this.environment){
            this.environment.update()
        }
    }
}