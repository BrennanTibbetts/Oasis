import Experience from '../../../Experience'
import * as THREE from 'three'

export default class RockLarge1 {

    constructor() {

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.gradient = this.resources.items.gradient

        this.debug = this.experience.debug


        console.log(this.resources.items)
        this.resource = this.resources.items.rocklarge1

        this.setModel()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('large rock 1')

            this.debugFolder
                .add(this.mesh.position, 'x')
                .name('x')
                .min(-10)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.mesh.position, 'y')
                .name('y')
                .min(-10)
                .max(10)
                .step(0.001)
        }
    }

    setModel(){
        
        this.geometry = this.resource.scene.children[0].geometry

        this.material = new THREE.MeshToonMaterial({
            color: 0xffaaaa,
            // gradientMap: this.gradient,
            // onBeforeCompile: shader => {
            //     shader.uniforms.topColor = { value: new THREE.Color(0x0077ff) };
            //     shader.uniforms.bottomColor = { value: new THREE.Color(0xff7700) };
            //     shader.uniforms.offset = { value: -1 };
            //     shader.uniforms.exponent = { value: 2 };
            //     shader.vertexShader = `
            //         varying vec3 vWorldPosition;
            //         ${shader.vertexShader}
            //     `.replace(
            //         `#include <begin_vertex>`,
            //         `#include <begin_vertex>
            //         vec4 customWorldPosition = modelMatrix * vec4(position, 1.0);
            //         vWorldPosition = customWorldPosition.xyz;`
            //     );
            //     shader.fragmentShader = `
            //         uniform vec3 topColor;
            //         uniform vec3 bottomColor;
            //         uniform float offset;
            //         uniform float exponent;
            //         varying vec3 vWorldPosition;
            //         ${shader.fragmentShader}
            //     `.replace(
            //         `vec4 diffuseColor = vec4( diffuse, opacity );`,
            //         `float h = normalize(vWorldPosition + offset).y;
            //         vec4 gradientColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
            //         vec4 diffuseColor = gradientColor * vec4( diffuse, opacity );`
            //     );
            // }
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.castShadow = true

        this.scene.add(this.mesh)


    }

}