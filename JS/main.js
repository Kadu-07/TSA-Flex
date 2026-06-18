document.querySelectorAll('.carousel').forEach(carousel => {
    const faixa     = carousel.querySelector('.carousel-faixa');
    const cards     = carousel.querySelectorAll('.card');
    const btnAnt    = carousel.querySelector('.carousel-btn-ant');
    const btnProx   = carousel.querySelector('.carousel-btn-prox');
    const pontosDiv = carousel.querySelector('.carousel-ponto');

    let slideAtual = 0;

    // Quantos cards cabem por vez, dependendo da largura da tela
    function visiveis() {
        if (window.innerWidth <= 768)  return 1;
        if (window.innerWidth <= 1280) return 2;
        return 3;
    }

    // Total de slides
    function totalSlides() {
        return cards.length - visiveis();
    }

    // Cria os pontos dinamicamente conforme o total de slides
    function criarPontos() {
        pontosDiv.innerHTML = '';
        const total = totalSlides();
        for (let i = 0; i <= total; i++) {
            const ponto = document.createElement('button');
            ponto.addEventListener('click', () => irPara(i));
            pontosDiv.appendChild(ponto);
        }
    }

    // Move o carrossel para o slide indicado
    function irPara(index) {
        const total = totalSlides();

        if (index < 0) {
            slideAtual = total;
        } else if (index > total) {
            slideAtual = 0
        } else {
            slideAtual = index
        }

        // Largura de um card + gap (20px)
        const larguraCard = cards[0].offsetWidth + 20;
        faixa.style.transform = `translateX(${-slideAtual * larguraCard}px)`;

        // Atualiza pontos
        pontosDiv.querySelectorAll('button').forEach((btn, i) => {
            btn.classList.toggle('ativo', i === slideAtual);
        });
    }

    btnAnt.addEventListener('click',  () => irPara(slideAtual - 1));
    btnProx.addEventListener('click', () => irPara(slideAtual + 1));

    // Reinicia ao redimensionar a janela
    window.addEventListener('resize', () => {
        criarPontos();
        irPara(0);
    });

    // Inicializa
    criarPontos();
    irPara(0);
});

function enviarFormulario(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;
    const texto = `Olá! Me chamo *${nome}* *${sobrenome}* (${email}).\n\n*Assunto:* ${assunto}\n\n${mensagem}`;
    const url = `https://wa.me/5551990157080?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

function desactive() {
    if (document.getElementById('menu-toggle').checked == true) {
        document.getElementById('menu-toggle').checked = false
    }
}