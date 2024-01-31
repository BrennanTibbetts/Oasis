// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import GUI from 'lil-gui'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { SobelOperatorShader } from './shaders/sobel'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
// // import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
// // import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
// // import { createNoise2D } from 'simplex-noise';

import './style.css'
import Experience from './Experience/Experience'

const experience = new Experience(document.querySelector('canvas.webgl'))


// /**
//  * Base
//  */

// // Scene
// const scene = new THREE.Scene()

// // Canvas
// const canvas = document.querySelector('canvas.webgl')

// /**
//  * Sizing
//  */
// const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight
// }

// window.addEventListener('resize', () =>
// {
//     // Update sizes
//     sizes.width = window.innerWidth
//     sizes.height = window.innerHeight

//     // Update camera
//     camera.aspect = sizes.width / sizes.height
//     camera.updateProjectionMatrix()

//     // Update renderer
//     renderer.setSize(sizes.width, sizes.height)
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// })

// /**
//  * Debugging
//  */
// const gui = new GUI()
// gui.show(false)
// window.addEventListener('keydown', (e) => {
//     if(e.key == 'h'){
//         gui.show(gui._hidden)
//     }
// })

// const _ = {
//     camera: {
//         position: {
//             x: -30,
//             y: 24,
//             z: 20
//         },
//         distance: 1000,
//         fov: 75,
//         near: 0.1,
//     },
//     shader: {
//         sobel: {
//             threshold: 0.4,
//             lineColor: 0x000000
//         }
//     },
//     sun: {
//         position: {
//             x: 6,
//             y: 50,
//             z: -20 
//         },
//         shadow: {
//             left: -100,
//             right: 100,
//             top: 100,
//             bottom: -100,
//             mapSize: {
//                 width: 4096,
//                 height: 4096
//             }
//         },
//         intensity: 5,
//         color: 0xffffff
//     }
// }


// /**
//  * Loaders -----------------------------------------------------------------------
//  */
// const textureLoader = new THREE.TextureLoader()

// const dracoLoader = new DRACOLoader()
// dracoLoader.setDecoderPath('/draco/')

// const gltfLoader = new GLTFLoader()
// gltfLoader.setDRACOLoader(dracoLoader)

// /**
//  * Textures -----------------------------------------------------------------------
//  */

// // Toon Shadow Gradient
// const gradient = textureLoader.load('/gradients/gradient_map_white.png')
// gradient.magFilter = THREE.NearestFilter
// gradient.minFilter = THREE.NearestFilter



// /**
//  * Meshes -------------------------------------------------------------------------------
//  */

// // Imported Models
// const rockMaterialOrange1 = new THREE.MeshToonMaterial({
//     color: 0xf87240,
//     gradientMap: gradient,
//     // wireframe: true
// })

// let rockSmall1
// gltfLoader.load(
//     '/models/rocks/small_1.glb',
//     (gltf) => {
//         const rockSmall1Geometry = gltf.scene.children[0].geometry
//         rockSmall1 = new THREE.Mesh(rockSmall1Geometry, rockMaterialOrange1)
//         rockSmall1.scale.set(2,2,2)
//         rockSmall1.position.set(-10, 5, 0)
//         rockSmall1.castShadow = true
//         scene.add(rockSmall1)
//     }
// )

// // rockLarge1_1
// let rockLarge1_1
// let rockLarge1_2
// gltfLoader.load(
//     '/models/rocks/large_1.glb',
//     (gltf) => {
//         const rockLargeGeometry = gltf.scene.children[0].geometry
//         rockLarge1_1 = new THREE.Mesh(rockLargeGeometry, rockMaterialOrange1)
//         rockLarge1_1.scale.set(4,16,4)
//         rockLarge1_1.position.set(5, 5, -10)
//         rockLarge1_1.rotation.z = Math.PI
//         rockLarge1_1.castShadow = true
//         scene.add(rockLarge1_1)

//         rockLarge1_2 = new THREE.Mesh(rockLargeGeometry, rockMaterialOrange1)
//         rockLarge1_2.scale.set(16,8,12)
//         rockLarge1_2.position.set(20, 5, 10)
//         rockLarge1_2.castShadow = true
//         scene.add(rockLarge1_2)
//     }
// )

// let monkey = null
// const monkeyMaterial  = new THREE.MeshToonMaterial({
//     color: 0x804000,
//     gradientMap: gradient,
// })
// gltfLoader.load(
//     '/models/orang-utan-low-poly/source/Orangutan_monkey1.glb',
//     (gltf) => {
//         // console.log(gltf)
//         const monkeyGeometry = gltf.scene.children[0].children[0].geometry
//         monkey = new THREE.Mesh(monkeyGeometry, monkeyMaterial)
//         monkey.scale.set(0.1, 0.1, 0.1)
//         monkey.position.set(0, 0, 0)
//         monkey.castShadow = true
//         scene.add(monkey)
//     }
// )

// // Objects

// const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 20, 20);


// const floorMaterial = new THREE.MeshToonMaterial({ 
//     color: 0xf4a460,
//     gradientMap: gradient,
//  });


// const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// floor.receiveShadow = true;

// floor.rotation.x = -Math.PI / 2;

// scene.add(floor);

// /**
//  * Lights -----------------------------------------------------------------------
//  */

// // SUN
// const sun = new THREE.DirectionalLight(_.sun.color, _.sun.intensity)
// // const directionalLightHelper = new THREE.DirectionalLightHelper(sun, 5)
// sun.shadow.camera.left = _.sun.shadow.left
// sun.shadow.camera.right = _.sun.shadow.right
// sun.shadow.camera.top = _.sun.shadow.top
// sun.shadow.camera.bottom = _.sun.shadow.bottom
// sun.shadow.mapSize.width = _.sun.shadow.mapSize.width
// sun.shadow.mapSize.height = _.sun.shadow.mapSize.height
// sun.position.set(_.sun.position.x, _.sun.position.y, _.sun.position.z) 
// sun.castShadow = true
// scene.add(sun)

// const sunSphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 16, 16),
//     new THREE.MeshBasicMaterial({ color: _.sun.color })
// )
// sunSphere.position.set(_.sun.position.x, _.sun.position.y, _.sun.position.z)
// scene.add(sunSphere)

// const sunFolder = gui.addFolder('Sun')
// sunFolder.add(_.sun.position, 'x').min(-30).max(30).step(0.1).onChange(() => { 
//     sun.position.x = _.sun.position.x
//     sunSphere.position.x = _.sun.position.x
// })
// sunFolder.add(_.sun.position, 'y').min(0).max(100).step(0.1).onChange(() => { 
//     sun.position.y = _.sun.position.y
//     sunSphere.position.y = _.sun.position.y
// })
// sunFolder.add(_.sun.position, 'z').min(-30).max(30).step(0.1).onChange(() => { 
//     sun.position.z = _.sun.position.z
//     sunSphere.position.z = _.sun.position.z
// })
// sunFolder.add(sun.shadow.camera, 'left').min(-100).max(100).step(0.1).name('Shadow Left')
// sunFolder.add(sun.shadow.camera, 'right').min(-100).max(100).step(0.1).name('Shadow Right')
// sunFolder.add(sun.shadow.camera, 'top').min(-100).max(100).step(0.1).name('Shadow Top')
// sunFolder.add(sun.shadow.camera, 'bottom').min(-100).max(100).step(0.1).name('Shadow Bottom')
// sunFolder.add(sun.shadow.mapSize, 'width').min(0).max(4096).step(1).name('Shadow Map Width')
// sunFolder.add(sun.shadow.mapSize, 'height').min(0).max(4096).step(1).name('Shadow Map Height')
// sunFolder.add(sun, 'intensity').min(0).max(10).step(0.1).name('Sun Intensity')
// sunFolder.addColor(_.sun, 'color').name('Sun Color').onChange(() => {
//     sun.color.set(_.sun.color)
//     sunSphere.material.color.set(_.sun.color)
// })

// // const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
// // scene.add(ambientLight)

// /**
//  * Camera -----------------------------------------------------------------------
//  */

// const camera = new THREE.PerspectiveCamera(_.camera.fov, sizes.width / sizes.height, _.camera.near, _.camera.distance)

// camera.position.x = _.camera.position.x
// camera.position.y = _.camera.position.y
// camera.position.z = _.camera.position.z
// camera.lookAt(0, 0, 0)
// scene.add(camera)

// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(_.camera.position, 'x').min(-100).max(100).step(0.1).onChange(() => { camera.position.x = _.camera.position.x })
// cameraFolder.add(_.camera.position, 'y').min(0).max(200).step(0.1).onChange(() => { camera.position.y = _.camera.position.y })
// cameraFolder.add(_.camera.position, 'z').min(-100).max(100).step(0.1).onChange(() => { camera.position.z = _.camera.position.z })

// // Controls
// const controls = new OrbitControls(camera, canvas)
// // const controls = new FirstPersonControls(camera, canvas)
// controls.enableDamping = true

// /**
//  * Rendering -----------------------------------------------------------------------
//  */

// // Renderer
// const renderer = new THREE.WebGLRenderer({
//     canvas: canvas
// })
// renderer.setSize(sizes.width, sizes.height)
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.shadowMap.enabled = true
// renderer.setClearColor(0xfffaaf, 0)

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

// /**
//  * Animation -----------------------------------------------------------------------
//  */
// const clock = new THREE.Clock()

// const tick = () =>
// {
//     const t = clock.getElapsedTime()

//     // Update controls
//     controls.update()

//     // Render
//     renderSceneWithNormalMaterial()
//     composer.render();

//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }

// tick()



// //Graveyard

// // let stoneGroup = new THREE.Group()
// // gltfLoader.load(
// //     '/models/stylized_stones_minipack/scene.gltf',
// //     (gltf) => {
// //         const stones = gltf.scene.children[0].children[0].children[0].children
// //         let i = stones.length
// //         for (let x = 0; x < i; x++) {
// //             const geometry = stones[x].children[0].geometry
// //             const stone = new THREE.Mesh(geometry, 
// //                 new THREE.MeshToonMaterial({
// //                     color: Math.random() * 0xffffff,
// //                     gradientMap: gradient,
// //                 })
// //             )
// //             // const stone = stones[x]
// //             stoneGroup.add(stone)
// //             stone.scale.set(0.01, 0.01, 0.01)
// //             stone.rotation.x = Math.random() * Math.PI * 2
// //             stone.position.set(x * 2 - 15 , 0, 0)
// //             stone.castShadow = true

// //         }
// //     }
// // )

// // const positions = floorGeometry.getAttribute('position');
// //     for (let i = 0; i < positions.count; i++) {
// //         const x = positions.getX(i) 
// //         const y = positions.getY(i) 
// //         const z = noise2D(x * 0.003, y * 0.003)
// //         positions.setZ(i, z * 20);
// //     }
// // floorGeometry.attributes.position.needsUpdate = true;
// // floorGeometry.computeVertexNormals();