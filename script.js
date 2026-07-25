document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("entrar");

    botao.addEventListener("click", () => {

        document.getElementById("historia").scrollIntoView({
            behavior: "smooth"
        });

    });

});
