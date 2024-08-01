// Seleciona todas as imagens do slider e todos os pontos (dots)
var imgs = document.querySelectorAll('.slider img');
var dots = document.querySelectorAll('.dot');
var currentImg = 0; // Índice da primeira imagem
const intervalo = 6000; // Duração (velocidade) do slide

function changeSlide(n) {
    // Reinicia todas as imagens e dots
    imgs.forEach((img, i) => {
        img.style.transition = 'opacity 0.5s';
        img.style.opacity = 0;
        dots[i].classList.remove('active');
        dots[i].style.transition = 'background-color 0.5s';
    });

    // Aplica a imagem atual
    imgs[n].style.opacity = 1; 
    dots[n].classList.add('active');
}

// Função para atualizar o slide
function nextSlide() {
    // Atualiza o índice da próxima imagem
    currentImg = (currentImg + 1) % imgs.length;
    changeSlide(currentImg); 
}

// Inicializa o timer para mudar o slide a cada intervalo
var timer = setInterval(nextSlide, intervalo);

// Função para reiniciar o slider com um novo índice
function restartSlider(n) {
    clearInterval(timer); // Para o timer atual
    currentImg = n; // Atualiza o índice da imagem atual
    changeSlide(currentImg); // Atualiza o índice e mostra a imagem correspondente
    // Reinicia o timer com o intervalo
    timer = setInterval(nextSlide, intervalo);
}

// Inicializa o slider com a primeira imagem
changeSlide(currentImg);

// Adiciona o evento de clique aos dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        restartSlider(index); // Reinicia o slider a partir do dot clicado
    });
});
