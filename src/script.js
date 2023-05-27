import './style.css';
import * as THREE from 'three'
import * as dat from 'lil-gui';
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {gsap} from "gsap";


const gltfLoader = new GLTFLoader();

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Objects
let cube;
gltfLoader.load('laptop.glb', (gltf) => {
    cube = gltf.scene;
    cube.position.set(0,-0.5,-2.5);
    cube.rotation.set(0, -1.5, 0);

    cube.scale.set(1,1,1);


    scene.add(cube);
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(cube.rotation, {
        y: 5.5,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
            trigger: ".page",
            scrub: .1,
            start: "top top",
            end: "bottom bottom",
        }
    });
});


// Lights

const pointLight = new THREE.SpotLight(0xffffff, 0.5)
pointLight.position.set( 10, 10, 10 );
// pointLight.position.x = 3.79
// pointLight.position.y = 6
// pointLight.position.z = 6
// gui.add(pointLight.position, 'x').min(-6).max(6).step(0.01)
// gui.add(pointLight.position, 'y').min(-6).max(6).step(0.01)
// gui.add(pointLight.position, 'z').min(-6).max(6).step(0.01)

scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 3);
// gui.add(ambientLight, 'intensity').min(-6).max(6).step(0.01)
// pointLight.position.x = 3.79
// pointLight.position.y = 6
// pointLight.position.z = 6

scene.add(ambientLight)

// const light = new THREE.HemisphereLight( 0xffffff, 0x2b5aa6, 3 );
// scene.add( light );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
camera.rotation.z = 0.3;
scene.add(camera)


// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () => {

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // if (cube) {
    //     cube.rotation.y = .5 * elapsedTime
    // }

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()