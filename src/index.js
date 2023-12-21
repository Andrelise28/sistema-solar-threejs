import * as THREE from 'three';
import { Mesh, TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.001,
    5000
);
camera.position.set(0, 40, 60);
camera.lookAt(0, 0, 0);

//constantes
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const clock = new THREE.Clock;
const objectsDefinition = 64;
//-----------------------------------------------------------------------

//objects
const starsObj = {
    radius: 1000,
    texture: '../img/milky_way_texture.jpg'
}

const sunObj = {
    radius: 6.95000,
    rotation: 0.01,
    texture: '../img/sun/sun_texture.jpg'
}

const mercuryObj = {
    radius: 0.02439,
    rotation: 0.01,
    texture: '../img/mercury/mercury_texture.jpg'
}

const venusObj = {
    radius: 0.06051,
    rotation: 0.01,
    texture: '../img/venus/venus_atmosphere_texture.jpg'
}

const earthObj = {
    radius: 0.06378,
    radiusCloud: 0.06378 + 0.001,
    radiusMoon: 0.01737,
    rotation: 0.01,
    rotationCloud: 0.02,
    texture: '../img/earth/earth_day_texture.jpg',
    textureMoon: '../img/earth/moon_texture.jpg',
    textureCloud: '../img/earth/earth_cloud_texture.png',
    normalMap: '../img/earth/earth_normal_map.tif',
    specularMap: '../img/earth/earth_specular_map.tif'
}

const marsObj = {
    radius: 0.03397,
    rotation: 0.01,
    texture: '../img/mars/mars_texture.jpg'
}

const jupiterObj = {
    radius: 0.71492,
    rotation: 0.01,
    texture: '../img/jupiter/jupiter_texture.jpg'
}

const saturnObj = {
    radius: 0.60268,
    rotation: 0.01,
    radiusRingInside: 0.65232,
    radiusRingOutside: 1.38232,
    texture: '../img/saturn/saturn_texture.jpg',
    textureRing: '../img/saturn/saturn_ring_texture2.png'
}

const uranusObj = {
    radius: 0.25559,
    rotation: 0.01,
    texture: '../img/uranus/uranus_texture.jpg'
}

const neptuneObj = {
    radius: 0.24746,
    rotation: 0.01,
    texture: '../img/neptune/neptune_texture.jpg'
}
//-----------------------------------------------------------------------

//Milk Way
const starsGeometry = new THREE.SphereGeometry(starsObj.radius, objectsDefinition, objectsDefinition);
const starsMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(starsObj.texture),
    side: THREE.BackSide
});
const stars = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(stars);
//-----------------------------------------------------------------------

//Sun
const sunGeometry = new THREE.SphereGeometry(sunObj.radius, objectsDefinition, objectsDefinition);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunObj.texture)
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
//-----------------------------------------------------------------------

//mercury
const mercuryGeometry = new THREE.SphereGeometry(mercuryObj.radius, objectsDefinition, objectsDefinition);
const mercuryMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(mercuryObj.texture)
})
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
scene.add(mercury);
//-----------------------------------------------------------------------

//venus
const venusGeometry = new THREE.SphereGeometry(venusObj.radius, objectsDefinition, objectsDefinition);
const venusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(venusObj.texture)
})
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
scene.add(venus);
//-----------------------------------------------------------------------

//earth group
const earthGroup = new THREE.Group();

const earthGeometry = new THREE.SphereGeometry(earthObj.radius, objectsDefinition, objectsDefinition);
const earthMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthObj.texture)
})
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earthGroup.add(earth);

const cloudGeometry = new THREE.SphereGeometry(earthObj.radiusCloud, objectsDefinition, objectsDefinition);
const cloudMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthObj.textureCloud),
    transparent: true
});
const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
earthGroup.add(cloud);

const moonGeometry = new THREE.SphereGeometry(earthObj.radiusMoon, objectsDefinition, objectsDefinition);
const moonMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(earthObj.textureMoon)
})
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
earthGroup.add(moon);

scene.add(earthGroup);
//-----------------------------------------------------------------------

//mars
const marsGeometry = new THREE.SphereGeometry(marsObj.radius, objectsDefinition, objectsDefinition);
const marsMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(marsObj.texture)
})
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
scene.add(mars);
//-----------------------------------------------------------------------

//jupiter group
const jupiterGroup = new THREE.Group();

const jupiterGeometry = new THREE.SphereGeometry(jupiterObj.radius, objectsDefinition, objectsDefinition);
const jupiterMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(jupiterObj.texture)
});
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiterGroup.add(jupiter);

scene.add(jupiterGroup);
//-----------------------------------------------------------------------

//saturn group
const saturnGroup = new THREE.Group();

const saturnGeometry = new THREE.SphereGeometry(saturnObj.radius, objectsDefinition, objectsDefinition);
const saturnMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnObj.texture)
});
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturnGroup.add(saturn);

const ringGeometry = new THREE.RingGeometry(saturnObj.radiusRingInside, saturnObj.radiusRingOutside, objectsDefinition, objectsDefinition);
const ringMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(saturnObj.textureRing),
    transparent: true,
    side: THREE.DoubleSide
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI * 0.5;
saturnGroup.add(ring);

scene.add(saturnGroup);
//-----------------------------------------------------------------------

//uranus
const uranusGeometry = new THREE.SphereGeometry(uranusObj.radius, objectsDefinition, objectsDefinition);
const uranusMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(uranusObj.texture)
})
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
scene.add(uranus);
//-----------------------------------------------------------------------

//neptune
const neptuneGeometry = new THREE.SphereGeometry(neptuneObj.radius, objectsDefinition, objectsDefinition);
const neptuneMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(neptuneObj.texture)
})
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
scene.add(neptune);
//-----------------------------------------------------------------------

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
//-----------------------------------------------------------------------

function animate() {
    
    let time = clock.getElapsedTime();

    //obj rotations
    sun.rotation.y += sunObj.rotation;
    cloud.rotation.y += earthObj.rotationCloud;

    mercury.position.x = -Math.cos(time * 1) * 10;
    mercury.position.z = -Math.sin(time * 1) * 10;
    camera.lookAt(mercury.position.x,0,mercury.position.z);

    requestAnimationFrame(animate);

    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();

    renderer.render(scene, camera);

}

animate();

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize);