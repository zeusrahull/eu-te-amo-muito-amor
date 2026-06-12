// =====================
// MÚSICA PRINCIPAL
// =====================

const playMain = document.getElementById("playMain");
const musicaPrincipal = document.getElementById("musicaPrincipal");

if (playMain) {

    playMain.addEventListener("click", () => {

        musicaPrincipal.play();

        playMain.innerHTML = "♫ Tocando";

        playMain.disabled = true;

    });

}


// =====================
// TEXTO CAINDO DO CÉU
// =====================

function prepareText(element){

    const text = element.innerText;

    const words = text.split(" ");

    element.innerHTML = "";

    words.forEach((word,index)=>{

        const span = document.createElement("span");

        span.classList.add("word");

        span.style.animationDelay = `${index * 0.15}s`;

        span.innerHTML = word + "&nbsp;";

        element.appendChild(span);

    });

}


// =====================
// OBSERVER
// =====================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            prepareText(entry.target);

            observer.unobserve(entry.target);

        }

    });

},{
    threshold:0.4
});


// =====================
// ELEMENTOS ANIMADOS
// =====================

document.querySelectorAll(".drop-text").forEach(element=>{

    observer.observe(element);

});


// =====================
// PLAY DAS 6 MÚSICAS
// =====================

const botoes = document.querySelectorAll(".play-btn");

let audioAtual = null;
let botaoAtual = null;

botoes.forEach(botao=>{

    botao.addEventListener("click", ()=>{

        const audioID = botao.dataset.audio;

        const audio = document.getElementById(audioID);

        if(audioAtual && audioAtual !== audio){

            audioAtual.pause();
            audioAtual.currentTime = 0;

            if(botaoAtual){

                botaoAtual.innerHTML = "▶";

            }

        }

        if(audio.paused){

            audio.play();

            botao.innerHTML = "❚❚";

            audioAtual = audio;
            botaoAtual = botao;

        }else{

            audio.pause();

            botao.innerHTML = "▶";

        }

    });

});


// =====================
// TERMINOU A MÚSICA
// =====================

document.querySelectorAll("audio").forEach(audio=>{

    audio.addEventListener("ended",()=>{

        document.querySelectorAll(".play-btn").forEach(btn=>{

            btn.innerHTML = "▶";

        });

    });

});


// =====================
// ANIMAÇÃO DAS SEÇÕES
// =====================

const cards = document.querySelectorAll(".card");

const cardObserver = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

},{
    threshold:0.2
});

cards.forEach(card=>{

    card.style.opacity = "0";

    card.style.transform = "translateY(100px)";

    card.style.transition = "1s";

    cardObserver.observe(card);

});


// =====================
// EFEITO SPOTIFY WRAPPED
// =====================

window.addEventListener("scroll",()=>{

    const scroll = window.scrollY;

    document.body.style.backgroundPositionY =
        scroll * 0.3 + "px";

});


// =====================
// VIBRAÇÃO NO CELULAR
// =====================

botoes.forEach(botao=>{

    botao.addEventListener("click",()=>{

        if(navigator.vibrate){

            navigator.vibrate(30);

        }

    });

});