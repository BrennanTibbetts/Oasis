import Experience from "../Experience";
import * as THREE from 'three'

export default class Floor {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry(){
        this.geometry = new THREE.CircleGeometry(5, 64)
    }

    setTextures(){
        this.textures = {}
    }

    setMaterial(){

        this.resources.items.gradient.magFilter = THREE.NearestFilter
        this.resources.items.gradient.minFilter = THREE.NearestFilter

        this.material = new THREE.MeshToonMaterial({
            color: 0xf4a460,
            gradientMap: this.resources.items.gradient
        })
    }

    setMesh(){
        this.mesh = new THREE.Mesh(
            this.geometry,
            this.material
        )

        this.mesh.rotation.x = Math.PI * -0.5
        this.mesh.receiveShadow = true

        this.scene.add(this.mesh)
    }
}