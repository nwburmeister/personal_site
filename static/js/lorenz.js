
import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.js";


function lorenz(){
    //let parentOfCanvas = document.getElementById("lorenz");
//    let renderer = new THREE.WebGLRenderer();
//    renderer.setSize(400,400);
//
//    let scene = new THREE.Scene();
//    let camera = new THREE.PerspectiveCamera();
//    camera.position.z = 10;
//    camera.position.y = 5;
//    camera.position.x = 5;
//    camera.lookAt(0,3,0);
//
//    scene.add(new THREE.AmbientLight("white",0.2));
//    let point = new THREE.PointLight("white",1,0,0);
//    point.position.set(20,10,15);
//    scene.add(point);
//
//    // make a ground plane
//    let groundBox = new THREE.BoxGeometry(5,0.1,5);
//    let groundMesh = new THREE.Mesh(groundBox,new THREE.MeshLambertMaterial( {color:0x888888}));
//    // put the top of the box at the ground level (0)
//    groundMesh.position.y = -0.05;
//    scene.add(groundMesh);
//
//    let box = new THREE.BoxGeometry(1,1,1);
//
//    let cube1 = new THREE.Mesh(box,new THREE.MeshStandardMaterial({color:"purple"}));
//    cube1.rotateY(45);
//    cube1.position.set(2,0.5,0);
//    scene.add(cube1);
//
//    let cube2 = new THREE.Mesh(box,new THREE.MeshStandardMaterial({color:"red"}));
//    cube2.rotateY(45);
//    cube2.translateX(2);
//    cube2.translateY(0.5);
//    scene.add(cube2);
//
//    document.getElementById("box2").appendChild(renderer.domElement);
//    renderer.render(scene,camera);

}

function onWindowLoad(func){
    let oldfunction = window.onload;
    window.onload = function(ev){
    if (oldfunction){
        oldfunction.apply(window, ev)
    }
    func();
    }
}

onWindowLoad(lorenz);