//Mudar: Texto do Casal
const cartinhaTexto = {
  titulo: "Meu Amor",
  mensagem0: "Amor, às vezes me pego pensando em tudo que sonhamos ser “antes dos 30”… E então olho pra você, e percebo que com você, eu já tenho o que realmente importa.",
  mensagem1: "Não é sobre cumprir metas de uma lista, mas sobre ter ao lado alguém que me faz sentir em paz no meio do caos, que me faz rir nos dias nublados e que segura minha mão quando eu duvido de mim mesmo.",
  mensagem2: "Com você, eu aprendi que crescer não precisa ser solitário. Que amadurecer ao lado de alguém que te entende, é o melhor presente da vida adulta.",
  mensagem3: "Viena nós espera e suas tulipas também, Itália, a Europa toda e o mundo do norte ao sul e leste a oeste, se for com você ao meu lado, Eu topo tudo..",
  mensagem4: "#Gilbertoeterno #Majimboo #Tulipas #Celeste #Cassiana",
  mensagem5: "#Te Amo Muito",
};

// Função para abrir e fechar a cartinha ao clicar no botão Cartinha
document.getElementById("mostrar-cartinhas").addEventListener("click", function() {
  const cartinhaConteudo = document.getElementById("cartinha-conteudo");

  // Alterna visibilidade
  if (cartinhaConteudo.style.display === 'block') {
    cartinhaConteudo.style.display = 'none';
  } else {
    cartinhaConteudo.innerHTML = `
      <h2 style="font-family: 'Great Vibes', cursive; font-size: 3rem; color: #333; margin-bottom: 15px; text-align: center;;">${cartinhaTexto.titulo}</h2>
      <p style="font-size: 1.8rem; text-align: justify; color: #333; ">${cartinhaTexto.mensagem0}</p>
      <p style="font-size: 1.8rem; text-align: justify; color: #333; margin-bottom: 5px ">${cartinhaTexto.mensagem1}</p>
      <p style="font-size: 1.8rem; text-align: justify; color: #333;  margin-bottom: 5px ">${cartinhaTexto.mensagem2}</p>
      <p style="font-size: 1.8rem; text-align: justify; color: #333;  margin-bottom: 5px ">${cartinhaTexto.mensagem3}</p>
      <p style="font-size: 2.3rem; text-align: center; color: #333;  margin-bottom: 5px ">${cartinhaTexto.mensagem4}</p>
      <p style="font-size: 2.5rem; text-align: center; color: #333;  margin-bottom: 5px ">${cartinhaTexto.mensagem5}</p>
    `;
    cartinhaConteudo.style.display = 'block';
  }
});
