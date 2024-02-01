import Experience from "./Experience";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {

    constructor(){
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(
            75, 
            this.sizes.width / this.sizes.height,
            0.1,
            180,
        )
        this.instance.position.set(-1.7, 0.8, -1.6)
        this.scene.add(this.instance)
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize(){
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update(){
        this.controls.update()
        this.instance.position.x = Math.sin(this.experience.time.elapsed * 0.00008 - 2) * 7
        this.instance.position.z = Math.cos(this.experience.time.elapsed * 0.00008) * 7
    }
}