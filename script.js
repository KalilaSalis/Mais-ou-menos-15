import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.set(0, 0, 18);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

document
    .getElementById("scene")
    .appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambient);

const light1 = new THREE.PointLight(0xff5ca8, 120);
light1.position.set(-8, 6, 6);
scene.add(light1);

const light2 = new THREE.PointLight(0x700018, 90);
light2.position.set(8, -5, 5);
scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 60);
light3.position.set(0, 10, 12);
scene.add(light3);

const loader = new GLTFLoader();

let discoBall;

const clock = new THREE.Clock();

const touch = document.getElementById("touch");

loader.load(

    "disco-ball.glb",

    function(gltf){

        discoBall = gltf.scene;

        scene.add(discoBall);

        discoBall.position.set(0,0,-28);

        discoBall.scale.set(0.02,0.02,0.02);

    },

    undefined,

    function(error){

        console.error(error);

    }

);

let finishedIntro = false;

function animate(){

    requestAnimationFrame(animate);

    const t = Math.min(clock.getElapsedTime()/3,1);

    if(discoBall){

        const ease =
            1-Math.pow(1-t,3);

        discoBall.position.z =
            -28 + ease*25;

        const scale =
            0.02 + ease*5.8;

        discoBall.scale.set(scale,scale,scale);

        discoBall.rotation.x += 0.006;
        discoBall.rotation.y += 0.012;
        discoBall.rotation.z += 0.004;

        if(t>=1 && !finishedIntro){

            finishedIntro=true;

            touch.classList.add("show");

        }

    }

    renderer.render(scene,camera);

}
animate();

window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

let entering = false;

window.addEventListener("click", () => {

    if(!finishedIntro) return;

    if(entering) return;

    entering = true;

    touch.style.opacity = "0";

    const start = performance.now();

    function enter(now){

        const p =
            Math.min(
                (now-start)/1800,
                1
            );

        const ease =
            1-Math.pow(1-p,4);

        if(discoBall){

            discoBall.rotation.x += 0.08;
            discoBall.rotation.y += 0.14;
            discoBall.rotation.z += 0.06;

            discoBall.scale.setScalar(
                5.8 + ease*18
            );

        }

        camera.position.z =
            18 - ease*17;

        renderer.render(scene,camera);

        if(p<1){

            requestAnimationFrame(enter);

        }else{

            // AQUI depois iremos mostrar
            // a próxima seção do site.

            console.log("Entrou na pista!");

        }

    }

    requestAnimationFrame(enter);

});
