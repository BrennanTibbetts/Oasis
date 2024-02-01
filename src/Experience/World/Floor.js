import Experience from "../Experience";
import * as THREE from 'three'

export default class Floor {

    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        this.floor = {
            radius: 100,
            segments: 10,
            color: 0xf4a460,
            gradient: this.resources.items.gradient
        }

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()

        // Debug

        if (this.debug.active) {

            this.debugFolder = this.debug.ui.addFolder('floor')

            this.debugFolder
                .add(this.floor, 'radius')
                .name('radius')
                .min(1)
                .max(1000)
                .step(1)
                .onChange(() => {
                    this.setGeometry()
                    this.mesh.geometry = this.geometry
                })
            
            this.debugFolder
                .add(this.floor, 'segments')
                .name('segments')
                .min(1)
                .max(100)
                .step(1)
                .onChange(() => {
                    this.setGeometry()
                    this.mesh.geometry = this.geometry
                })

            this.debugFolder
                .addColor(this.floor, 'color')
                .name('color')
                .onChange(() => {
                    this.material.color.set(this.floor.color)
                })

            this.debugFolder
                .add(this.mesh.material, 'wireframe')
                .name('wireframe')
            
            this.debugFolder
                .add(this.mesh, 'receiveShadow')
                .name('receiveShadow')
            
        }
    }

    setGeometry(){
        this.geometry = new THREE.CircleGeometry(
            this.floor.radius, 
            this.floor.segments
        ) 
        
    }

    setTextures(){
        this.textures = {}
    }

    setMaterial(){

        this.resources.items.gradient.magFilter = THREE.NearestFilter
        this.resources.items.gradient.minFilter = THREE.NearestFilter

        this.material = new THREE.MeshToonMaterial({
            color: this.floor.color,
            gradientMap: this.floor.gradient,
            side: THREE.DoubleSide
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