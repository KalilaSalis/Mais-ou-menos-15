// ===== CONTAGEM REGRESSIVA =====

const dataFesta = new Date("December 12, 2026 20:00:00").getTime();

const atualizarContador = () => {

    const agora = new Date().getTime();

    const distancia = dataFesta - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (distancia % (1000 * 60 * 60 * 24))
        /
        (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (distancia % (1000 * 60 * 60))
        /
        (1000 * 60)
    );

    const segundos = Math.floor(
        (distancia % (1000 * 60))
        /
        1000
    );

    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

};

setInterval(atualizarContador,1000);

atualizarContador();


// ===== ANIMAÇÃO =====

const elementos = document.querySelectorAll("section");

const aparecer = () =>{

    elementos.forEach(secao=>{

        const topo = secao.getBoundingClientRect().top;

        if(topo < window.innerHeight-120){

            secao.style.opacity="1";
            secao.style.transform="translateY(0px)";

        }

    });

};

elementos.forEach(secao=>{

    secao.style.opacity="0";
    secao.style.transform="translateY(60px)";
    secao.style.transition="1s";

});

window.addEventListener("scroll",aparecer);

aparecer();


// ===== BRILHO NO LOGO =====

setInterval(()=>{

    const logo=document.querySelector(".logo");

    logo.style.textShadow=
    `0 0 ${
        Math.random()*45
    }px rgba(255,255,255,.45)`;

},800);
