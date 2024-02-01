import Experience from "../Experience";
import * as THREE from 'three'

export default class Environment {

    constructor(){

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.sun = {}
        this.sun.position = {
            x: 6,
            y: 50,
            z: 0
        }
        this.sun.size = {
            radius: 2,
            segments: 16
        }
        this.sun.distance = 80
        this.sun.speed = 0.00008
        this.sun.brightness = 4
        this.sun.shadow = {}
        this.sun.shadow.mapSize = 4096

        this.setSunLight()
        this.setSunObject()
        this.setAmbientLight()
        
        if (this.debug.active) {

            this.debugFolder
                .add(this.sun.position, 'x')
                .name('sunX')
                .min(-5)
                .max(5)
                .step(0.001)
                .onChange(() => {
                    this.sun.mesh.position.x = this.sun.position.x
                    this.sunLight.position.x = this.sun.position.x
                })

            this.debugFolder
                .add(this.sun.position, 'y')
                .name('sunY')
                .min(-5)
                .max(5)
                .onChange(() => {
                    this.sun.mesh.position.y = this.sun.position.y
                    this.sunLight.position.y = this.sun.position.y
                })

            this.debugFolder
                .add(this.sun.position, 'z')
                .name('sunZ')
                .min(-5)
                .max(5)
                .onChange(() => {
                    this.sun.mesh.position.z = this.sun.position.z
                    this.sunLight.position.z = this.sun.position.z
                })

            this.debugFolder
                .add(this.sun, 'distance')
                .name('sunDistance')
                .min(0)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.sun, 'speed')
                .name('sunSpeed')
                .min(0)
                .max(0.001)
                .step(0.000001)

            this.debugFolder
                .add(this.sun, 'brightness')
                .name('sunBrightness')
                .min(0)
                .max(10)
                .step(0.001)
        }
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(this.sun.shadow.mapSize, this.sun.shadow.mapSize)
        this.sunLight.shadow.normalBias = 0.05
        this.scene.add(this.sunLight)

        let sunPosition = new THREE.Vector3(this.sun.position.x, this.sun.position.y, this.sun.position.z)
        sunPosition.normalize();
        let scale = 0.1;
        sunPosition.multiplyScalar(scale);
        this.sunLight.position.set(sunPosition.x, sunPosition.y, sunPosition.z)

        // Debug
        if (this.debug.active) {

            this.sunLightHelper = new THREE.CameraHelper(this.sunLight.shadow.camera)
            this.sunLightHelper.visible = false
            this.scene.add(this.sunLightHelper)
            this.debugFolder
                .add(this.sunLightHelper, 'visible')
                .name("shadowCameraVisible")

            this.debugFolder
                .addColor(this.sunLight, 'color')
                .name("sunColor")
                .onChange(() => {
                    this.sun.material.color = this.sunLight.color
                })

            this.debugFolder
                .add(this.sunLight.shadow.camera, 'left')
                .name("shadowLeftBorder")
                .min(-100)
                .max(100)
                .step(0.1)
                
            this.debugFolder
                .add(this.sunLight.shadow.camera, 'right')
                .name("shadowRightBorder")
                .min(-100)
                .max(100)
                .step(0.1)

            this.debugFolder
                .add(this.sunLight.shadow.camera, 'top')
                .name("shadowTopBorder")
                .min(-100)
                .max(100)
                .step(0.1)

            this.debugFolder
                .add(this.sunLight.shadow.camera, 'bottom')
                .name("shadowBottomBorder")
                .min(-100)
                .max(100)
                .step(0.1)
        }

    }

    setSunObject() {

        this.sun.geometry = new THREE.SphereGeometry(this.sun.size.radius, this.sun.size.segments, this.sun.size.segments)
        this.sun.material = new THREE.MeshBasicMaterial({
            color: this.sunLight.color
        })
        this.sun.mesh = new THREE.Mesh(
            this.sun.geometry,
            this.sun.material
        )

        this.sun.mesh.position.set(this.sun.position.x, this.sun.position.y, this.sun.position.z)
        this.scene.add(this.sun.mesh)

    }
    
    setAmbientLight(){
        this.ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
        this.scene.add(this.ambientLight)

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('ambientLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .addColor(this.ambientLight, 'color')
                .name("ambientColor")
                .onChange(() => {
                    this.ambientLight.color = this.ambientLight.color
                })
        }
    }

    update(){

        // Rotate sun object around the scene
        this.sun.position.x = Math.cos(this.time.elapsed * this.sun.speed) * this.sun.distance
        this.sun.mesh.position.x = this.sun.position.x

        let sunHeight = Math.sin(this.time.elapsed * this.sun.speed) 
        this.sun.position.y = sunHeight * this.sun.distance
        this.sun.mesh.position.y = this.sun.position.y

        if (sunHeight > 0){
            this.sunLight.intensity = sunHeight * this.sun.brightness
        }

        // Update sun light position
        let sunPosition = this.sun.mesh.position.clone()
        sunPosition.normalize();
        let scale = 5;
        sunPosition.multiplyScalar(scale);
        this.sunLight.position.set(sunPosition.x, sunPosition.y, sunPosition.z)
    }

}