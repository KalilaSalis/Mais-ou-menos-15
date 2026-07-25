document.addEventListener("DOMContentLoaded", () => {

    const botao = document.getElementById("entrar");

    if (botao) {
        botao.addEventListener("click", () => {

            document.getElementById("historia").scrollIntoView({
                behavior: "smooth"
            });

        });
    }

});
