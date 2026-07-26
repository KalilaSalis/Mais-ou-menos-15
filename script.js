// script.js

import * as THREE from "https://unpkg.com/three@0.165.0/build/three.module.js";
import { GLTFLoader } from "https://unpkg.com/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,0,18);

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById("scene").appendChild(renderer.domElement);

// ==================== LUZES ====================

scene.add(new THREE.AmbientLight(0xffffff,1.6));

const pink = new THREE.PointLight(0xcc2656,45,60);
pink.position.set(-6,3,8);
scene.add(pink);

const wine = new THREE.PointLight(0x620615,40,60);
wine.position.set(6,-2,7);
scene.add(wine);

const white = new THREE.PointLight(0xffffff,35,80);
white.position.set(0,5,12);
scene.add(white);

// ==================== MODELO ====================

const loader = new GLTFLoader();

let discoBall;

const targetScale = 5;

loader.load("disco-ball.glb",(gltf)=>{

    discoBall = gltf.scene;

    scene.add(discoBall);

    const box = new THREE.Box3().setFromObject(discoBall);

    const size = new THREE.Vector3();
    box.getSize(size);

    const maxSide = Math.max(size.x,size.y,size.z);

    const scale = targetScale/maxSide;

    discoBall.scale.setScalar(scale);

    box.setFromObject(discoBall);

    const center = new THREE.Vector3();
    box.getCenter(center);

    discoBall.position.sub(center);

    discoBall.position.z = -95;

    discoBall.rotation.x = 0.25;
    discoBall.rotation.y = Math.PI;

});

const clock = new THREE.Clock();

let introFinished=false;

const touch=document.getElementById("touch");

function easeOutCubic(x){
    return 1-Math.pow(1-x,3);
}

function animate(){

    requestAnimationFrame(animate);

    const t=Math.min(clock.getElapsedTime()/3,1);

    if(discoBall){

        const e=easeOutCubic(t);

        discoBall.position.z=
            THREE.MathUtils.lerp(
                -95,
                0,
                e
            );

        discoBall.rotation.y+=0.010;
        discoBall.rotation.x+=0.002;
        discoBall.rotation.z+=0.0015;

        if(t===1 && !introFinished){

            introFinished=true;

            touch.classList.add("show");

        }

    }

    renderer.render(scene,camera);

}
animate();

// ==================== RESPONSIVIDADE ====================

window.addEventListener("resize",()=>{

    camera.aspect=
        window.innerWidth/
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// ==================== ENTRADA NA PISTA ====================

let entering=false;

window.addEventListener("click",()=>{

    if(!introFinished) return;
    if(entering) return;

    entering=true;

    touch.classList.remove("show");

    const start=performance.now();

    function enter(now){

        const p=Math.min(
            (now-start)/1800,
            1
        );

        const e=easeOutCubic(p);

        if(discoBall){

            discoBall.rotation.y+=0.22;
            discoBall.rotation.x+=0.08;
            discoBall.rotation.z+=0.05;

            camera.position.z=
                THREE.MathUtils.lerp(
                    18,
                    0.45,
                    e
                );

            discoBall.scale.setScalar(

                (targetScale*
                (1+(e*5)))

                /

                Math.max(
                    discoBall.scale.x/targetScale,
                    1
                )

            );

        }

        renderer.render(scene,camera);

        if(p<1){

            requestAnimationFrame(enter);

        }else{

            // PRÓXIMA ETAPA DO SITE
            // Aqui depois vamos trocar de tela
            // (menu, convite, etc.)

            console.log("Entrou na pista!");

        }

    }

    requestAnimationFrame(enter);

});
