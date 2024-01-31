import Experience from "../Experience"
import Environment from "./Environment"
import Floor from "./Floor"
import * as THREE from 'three'

export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.resources.on('ready', () => {

            // Setup
            this.floor = new Floor()

            this.environment = new Environment()
        })

    }

    update(){
        if(this.fox)
            this.fox.update()
    }
}