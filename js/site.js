// Troca de imagem a cada 10 segundos
const imagens = document.querySelectorAll(".image");
let indice = 0;
let intervalo;

function mostrarImagem(index) {
  imagens.forEach(img => img.classList.remove("active"));
  imagens[index].classList.add("active");
}

function proximaImagem() {
  indice = (indice + 1) % imagens.length;
  mostrarImagem(indice);
}

function imagemAnterior() {
  indice = (indice - 1 + imagens.length) % imagens.length;
  mostrarImagem(indice);
}

function resetInterval() {
  clearInterval(intervalo);
  intervalo = setInterval(proximaImagem, 10000);
}

resetInterval();


// Detectar deslize no celular
let touchStartX = 0;
let touchEndX = 0;

const imageContainer = document.querySelector(".image-container");

imageContainer.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

imageContainer.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

function handleGesture() {
  const distancia = touchEndX - touchStartX;

  if (distancia > 50) {
    imagemAnterior();
    resetInterval();
  } else if (distancia < -50) {
    proximaImagem();
    resetInterval();
  }
}

//Player de música
//Mudar: (Musicas, Foto de capa, Nome da música) informações solicitadas
const musicas = [
    {
    titulo: "You'll Never Walk Alone",
    arquivo: "musicas/musica1.mp3",
    capa: "img/capa1.webp"
  },
  {
    titulo: "Wonderwall",
    arquivo: "musicas/musica2.mp3",
    capa: "img/capa2.webp"
  },
   {
    titulo: "Linda Juventude",
    arquivo: "musicas/musica3.mp3",
    capa: "img/capa3.webp"
  },
   {
    titulo: "Um girassol da cor do seu cabelo",
    arquivo: "musicas/musica9.mp3",
    capa: "img/capa4.webp"
  },
   {
    titulo: "Vienna",
    arquivo: "musicas/musica5.mp3",
    capa: "img/capa5.webp"
  },
   {
    titulo: "Acima do Sol",
    arquivo: "musicas/musica6.mp3",
    capa: "img/capa6.webp"
  },
];

let indiceAtual = 0;
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPause");
const playPauseBtnicon = document.getElementById("playPauseicon");
const musicTitle = document.getElementById("music-title");
const albumImage = document.getElementById("album-image");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const progress = document.getElementById("progress");

function carregarMusica(indice) {
  const musica = musicas[indice];
  audio.src = musica.arquivo;
  musicTitle.textContent = musica.titulo;
  albumImage.src = musica.capa;
  audio.load();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtnicon.src = "/img/pause.png";
  } else {
    audio.pause();
    playPauseBtnicon.src = "/img/play.png";
  }
}

function nextMusic() {
  indiceAtual = (indiceAtual + 1) % musicas.length;
  carregarMusica(indiceAtual);
  audio.play();
  playPauseBtnicon.src = "/img/pause.png";
}

function prevMusic() {
  indiceAtual = (indiceAtual - 1 + musicas.length) % musicas.length;
  carregarMusica(indiceAtual);
  audio.play();
  playPauseBtnicon.src = "/img/pause.png";
}

audio.addEventListener("timeupdate", () => {
  const current = audio.currentTime;
  const duration = audio.duration;
  progress.value = (current / duration) * 100 || 0;
  currentTimeEl.textContent = formatarTempo(current);
  totalTimeEl.textContent = formatarTempo(duration);
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextMusic);

function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60) || 0;
  const sec = Math.floor(segundos % 60) || 0;
  return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

carregarMusica(indiceAtual);


// Contador de tempo de namoro 
//Mudar: Data de namoro do casal
const dataInicio = new Date('2024-12-23T19:00:00'); // 23/12/2024

function atualizarContador() {
  const agora = new Date();
  const diff = agora - dataInicio;

  const segundos = Math.floor(diff / 1000) % 60;
  const minutos = Math.floor(diff / (1000 * 60)) % 60;
  const horas = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

  document.getElementById("dias").textContent = dias;
  document.getElementById("horas").textContent = horas;
  document.getElementById("minutos").textContent = minutos;
  document.getElementById("segundos").textContent = segundos;
}

setInterval(atualizarContador, 1000);
atualizarContador();