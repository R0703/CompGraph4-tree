import * as THREE from './Threejs/build/three.module.js';
import { OrbitControls } from './Threejs/examples/jsm/controls/OrbitControls.js';
THREE

let scene, camera, renderer, box;

let key = {};

function init(){
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);

    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    new OrbitControls(camera, renderer.domElement);

    const materialColor = new THREE.Color('lightgreen');
    const materialgreen = new THREE.MeshBasicMaterial({color: materialColor});

    const materialColor2 = new THREE.Color('brown');
    const materialbrown = new THREE.MeshBasicMaterial({color: materialColor2});

    const materialColor3 = new THREE.Color('yellow');
    const materialyellow = new THREE.MeshBasicMaterial({color: materialColor3, wireframe : true});

    const boxGeometry = new THREE.BoxGeometry(0.5, 1 ,0.5);
    box = new THREE.Mesh(boxGeometry, materialbrown);
    //engga const karena mau jadiin global v
    scene.add(box);

    const coneGeometry = new THREE.ConeGeometry(1, 4, 20);//diameter bawah
    const cone = new THREE.Mesh(coneGeometry, materialgreen);
    scene.add(cone);

    const sphereGeometry = new THREE.SphereGeometry(1, 13, 4);
    const sphere = new THREE.Mesh(sphereGeometry, materialyellow);
    scene.add(sphere);
    sphere.position.x = -3;
    sphere.position.y = 4;

    const cylinderGeometry = new THREE.CylinderGeometry(1,8,4);
    const cylinder = new THREE.Mesh(cylinderGeometry, materialgreen);
    scene.add(cylinder);
    cylinder.position.y = -2.5;

    cone.position.y = 2.5;
    camera.position.z = 7;
    //box.position.set(3,3,3); ini klo mo pake 3-3nya

    box.rotation.y = 2;

}

function rendering(){
    requestAnimationFrame(rendering);
    move();
    renderer.render(scene, camera);
}

window.addEventListener('keydown', function(){
    console.log(event.key);
    key[event.key.toLowerCase()] = true;
});

window.addEventListener('keyup', function(){
    // console.log(event.key);
    key[event.key.toLowerCase()] = false;
});

function move(){
    if(key["w"]) box.position.y += 0.1;
    if(key["a"]) box.position.x -= 0.1;
    if(key["s"]) box.position.y -= 0.1;
    if(key["d"]) box.position.x += 0.1;
}

window.onload = function(){
    init();
    rendering();
}