import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0,0,18);

const renderer = new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(window.innerWidth,window.innerHeight);

document
.getElementById("scene")
.appendChild(renderer.domElement);

const ambient=new THREE.AmbientLight(
    0xffffff,
    2
);

scene.add(ambient);

const pink=new THREE.PointLight(
    0xcc2656,
    60,
    100
);

pink.position.set(
    -5,
    3,
    8
);

scene.add(pink);

const wine=new THREE.PointLight(
    0x620615,
    55,
    100
);

wine.position.set(
    6,
    -2,
    8
);

scene.add(wine);

const white=new THREE.PointLight(
    0xffffff,
    40,
    80
);

white.position.set(
    0,
    5,
    12
);

scene.add(white);

const loader=new GLTFLoader();

const loading=document.getElementById("loading");
const touch=document.getElementById("touch");

let ball=null;

let introFinished=false;

const clock=new THREE.Clock();

loader.load(

    "disco-ball.glb",

    (gltf)=>{

        ball=gltf.scene;

        scene.add(ball);

        const box=new THREE.Box3().setFromObject(ball);

        const size=new THREE.Vector3();

        box.getSize(size);

        const max=Math.max(
            size.x,
            size.y,
            size.z
        );

        const scale=5/max;

        ball.scale.setScalar(scale);

        box.setFromObject(ball);

        const center=new THREE.Vector3();

        box.getCenter(center);

        ball.position.sub(center);

        ball.position.z=-90;

        ball.rotation.x=.2;

        loading.classList.add("hide");

    }

);

function ease(x){

    return 1-Math.pow(1-x,3);

}

function animate(){

    requestAnimationFrame(animate);

    const t=Math.min(
        clock.getElapsedTime()/3,
        1
    );

    if(ball){

        ball.position.z=
        THREE.MathUtils.lerp(
            -90,
            0,
            ease(t)
        );

        ball.rotation.y+=0.01;
        ball.rotation.x+=0.002;
        ball.rotation.z+=0.001;

        if(t===1 && !introFinished){

            introFinished=true;

            touch.classList.add("show");

        }

    }

    renderer.render(
        scene,
        camera
    );

}
animate();

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

let entering=false;

window.addEventListener("click",()=>{

    if(!introFinished) return;
    if(entering) return;

    entering=true;

    touch.classList.remove("show");
    touch.classList.add("fadeOut");

    const start=performance.now();

    function enter(now){

        const p=Math.min(
            (now-start)/1700,
            1
        );

        const e=ease(p);

        if(ball){

            ball.rotation.y+=0.18;
            ball.rotation.x+=0.05;
            ball.rotation.z+=0.03;

            camera.position.z=
                THREE.MathUtils.lerp(
                    18,
                    0.35,
                    e
                );

            const s=
                THREE.MathUtils.lerp(
                    1,
                    6,
                    e
                );

            ball.scale.setScalar(
                s*(5/Math.max(
                    ball.scale.x,
                    0.0001
                ))*ball.scale.x
            );

        }

        renderer.render(scene,camera);

        if(p<1){

            requestAnimationFrame(enter);

        }else{

            document.body.style.background="#000";

            // AQUI entraremos na próxima tela
            // depois vamos trocar pelo menu.

        }

    }

    requestAnimationFrame(enter);

});
