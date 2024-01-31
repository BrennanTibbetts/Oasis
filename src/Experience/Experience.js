import * as THREE from 'three'
import Sizes from "./Utils/Sizes"
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'
import Debug from './Utils/Debug'
import sources from './sources'

let instance = null

export default class Experience {

    constructor(canvas){

        if(instance){
            return instance
        }

        instance = this

        // Global Access
        window.experience = this

        // Options
        this.canvas = canvas

        // Debug
        this.debug = new Debug()

        // Setup
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        this.world = new World()

        this.sizes.on('resize', () => {
            this.resize()  
        })
        this.time.on('tick', () => {
            this.update()
        })

    }

    resize(){
        this.camera.resize()
        this.renderer.resize()
    }

    update(){
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy(){
        this.sizes.off('resize')
        this.time.off('tick')

        this.scene.traverse((child) => {
            if(child instanceof THREE.Mesh) {
                child.geometry.dispose()

                for (const key in child.material) {

                    const value = child.material[key]
                    
                    if(value && typeof value.dispose === 'function') {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()

        if(this.debug.active) {
            this.debug.ui.destroy()
        }
    }
}