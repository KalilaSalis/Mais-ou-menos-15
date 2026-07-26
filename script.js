const intro = document.getElementById("intro");
const ball = document.getElementById("ball");
const title = document.querySelector("h1");
const subtitle = document.querySelector(".subtitle");
const touch = document.querySelector(".touch");

let opened = false;

intro.addEventListener("click", () => {

    if (opened) return;

    opened = true;

    // Esconde os textos
    title.style.transition = "opacity .8s";
    subtitle.style.transition = "opacity .8s";
    touch.style.transition = "opacity .8s";

    title.style.opacity = "0";
    subtitle.style.opacity = "0";
    touch.style.opacity = "0";

    // Acelera e amplia o globo
    ball.style.transition =
        "transform 2.2s ease-in-out, filter 2s";

    ball.style.animation = "none";

    ball.style.transform =
        "scale(9) rotate(1080deg)";

    ball.style.filter =
        "drop-shadow(0 0 100px rgba(255,255,255,.6))";

    // Próxima etapa (por enquanto apenas mensagem)
    setTimeout(() => {

        console.log("Entrou na pista!");

        // Aqui depois vamos mostrar a próxima seção.

    }, 2200);

});
