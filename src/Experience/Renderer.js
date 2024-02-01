import Experience from "./Experience";
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { SobelOperatorShader } from '../shaders/sobel.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

export default class Renderer {
    constructor(){

        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera
        this.debug = this.experience.debug


        this.sobel = {
            threshold: 0.4,
            lineColor: [0, 0, 0]
        }

        this.setInstance()
        this.setPostProcessing()
    
        if (this.debug.active) {

            this.debugFolder
                .add(this.instance, 'toneMapping', {
                    No: THREE.NoToneMapping,
                    Linear: THREE.LinearToneMapping,
                    Reinhard: THREE.ReinhardToneMapping,
                    Cineon: THREE.CineonToneMapping,
                    ACESFilmic: THREE.ACESFilmicToneMapping
                })
                .onFinishChange(() => {
                    this.instance.toneMapping = Number(this.instance.toneMapping)
                    this.instance.toneMappingNeedsUpdate = true
                })

            this.debugFolder
                .add(this.instance, 'toneMappingExposure')
                .name('exposure')
                .min(0)
                .max(10)
                .step(0.001)
        }
    }

    setInstance(){

        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            // antialias: true 
        })

        // this.instance.toneMapping = THREE.CineonToneMapping
        // this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(0xffffff, 0)
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    setPostProcessing() {
        // Post Processing
        this.composer = new EffectComposer(this.instance)
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.composer.addPass(this.renderPass)

        this.normalRenderTarget = new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height)
        this.normalMaterial = new THREE.MeshNormalMaterial()

        this.renderSceneWithNormalMaterial = () => {
            this.scene.overrideMaterial = this.normalMaterial
            this.instance.setRenderTarget(this.normalRenderTarget)
            this.instance.render(this.scene, this.camera.instance)
            this.instance.setRenderTarget(null) // Render back to the canvas
            this.scene.overrideMaterial = null // Remove override material
        }

        this.sobelEffect = new ShaderPass(SobelOperatorShader)
        this.sobelEffect.uniforms['resolution'].value.x = this.sizes.width * this.sizes.pixelRatio
        this.sobelEffect.uniforms['resolution'].value.y = this.sizes.height * this.sizes.pixelRatio
        this.sobelEffect.uniforms['tNormal'].value = this.normalRenderTarget.texture
        this.sobelEffect.uniforms['threshold'].value = 1
        this.sobelEffect.uniforms['lineColor'].value = new THREE.Vector3(0, 0, 0)
        this.sobelEffect.uniforms['waveAmplitude'].value = 0.0005
        this.sobelEffect.uniforms['waveFrequency'].value = 100.0
        this.sobelEffect.uniforms['cameraPos'].value = this.camera.instance.position
        this.composer.addPass(this.sobelEffect)

        // Debug
        if (this.debug.active) {

            this.debugFolder = this.debug.ui.addFolder('render')

            this.debugFolder
                .add(this.sobel, 'threshold')
                .min(0)
                .max(4)
                .step(0.01)
                .name('Sobel Threshold')
                .onChange(() => {
                    this.sobelEffect.uniforms['threshold'].value = this.sobel.threshold
                })

            this.debugFolder
                .addColor(this.sobel, 'lineColor')
                .name('lineColor')
                .onChange(() => {
                    this.sobelEffect.uniforms['lineColor'].value = new THREE.Vector3(this.sobel.lineColor[0], this.sobel.lineColor[1], this.sobel.lineColor[2])
                })

            this.debugFolder
                .add(this.sobelEffect.uniforms['waveAmplitude'], 'value')
                .min(0)
                .max(0.01)
                .step(0.0001)
                .name('Wave Amplitude')

            this.debugFolder
                .add(this.sobelEffect.uniforms['waveFrequency'], 'value')
                .min(0)
                .max(1000)
                .step(1)
                .name('Wave Frequency')
        }
    }

    update() {
        this.renderSceneWithNormalMaterial()
        this.composer.render();
    }
}

// // Post Processing
// const composer = new EffectComposer(renderer)
// const renderPass = new RenderPass(scene, camera)
// composer.addPass(renderPass)

// // Normal material for sobel effect
// const normalRenderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
// const normalMaterial = new THREE.MeshNormalMaterial();
// function renderSceneWithNormalMaterial() {
//     scene.overrideMaterial = normalMaterial;
//     renderer.setRenderTarget(normalRenderTarget);
//     renderer.render(scene, camera);
//     renderer.setRenderTarget(null); // Render back to the canvas
//     scene.overrideMaterial = null; // Remove override material
// }

// // Sobel Effect
// const sobelEffect = new ShaderPass(SobelOperatorShader)
// sobelEffect.uniforms['resolution'].value.x = window.innerWidth * window.devicePixelRatio
// sobelEffect.uniforms['resolution'].value.y = window.innerHeight * window.devicePixelRatio
// sobelEffect.uniforms['tNormal'].value = normalRenderTarget.texture
// sobelEffect.uniforms['threshold'].value = _.shader.sobel.threshold
// sobelEffect.uniforms['lineColor'].value = new THREE.Color(_.shader.sobel.lineColor)
// sobelEffect.uniforms['waveAmplitude'].value = 0.0005
// sobelEffect.uniforms['waveFrequency'].value = 100.0
// sobelEffect.uniforms['cameraPos'].value = camera.position
// composer.addPass(sobelEffect)

// gui.add(_.shader.sobel, 'threshold').min(0).max(4).step(0.01).name('Sobel Threshold').onChange(() => {
//     sobelEffect.uniforms['threshold'].value = _.shader.sobel.threshold
// })
// gui.addColor(_.shader.sobel, 'lineColor').onChange(() => {
//     sobelEffect.uniforms['lineColor'].value = new THREE.Color(_.shader.sobel.lineColor)
// })
// gui.add(sobelEffect.uniforms['waveAmplitude'], 'value').min(0).max(0.01).step(0.0001).name('Wave Amplitude')
// gui.add(sobelEffect.uniforms['waveFrequency'], 'value').min(0).max(1000).step(1).name('Wave Frequency')