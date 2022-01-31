
function sorteiaJogadorAcomecar(max, min){
    let aux = Math.floor(Math.random() * (min - max + 1)) + max;
        if(aux === 1){
            jogadorDaVez = jogador_O
        }else if(aux === 2){
            jogadorDaVez = jogador_X
        };
    return jogadorDaVez
};

function trocaJogador() {
    if(jogadorDaVez === jogador_X){
        jogadorDaVez = jogador_O
    } else {
        jogadorDaVez = jogador_X
    };
    document.getElementById('jogador').innerHTML = `: ${jogadorDaVez.nome.value}`;
};

function vitoria(){
        if(jogadorDaVez == jogador_X){
            jogador_X.pontos += 1
         } else if(jogadorDaVez == jogador_O){
            jogador_O.pontos += 1 
         };
        document.getElementById('pontos_jog_X').value = jogador_X.pontos;
        document.getElementById('pontos_jog_O').value = jogador_O.pontos;
        document.getElementById('inserir_jogadores').style.display = 'none';
        document.getElementById('vezDoJogador').style.display = 'none';
        document.getElementById('jogadorVencedor').style.display = 'block';  
        document.getElementById('vencedor').innerHTML = jogadorDaVez.nome.value
        
        tabuleiro.campo.forEach(element => {
            element.removeEventListener('click', jogar);
        });
};

function jogarNovamente() {
    document.getElementById('jogadorVencedor').style.display = 'none';
    //limpa os campos de jogada
    tabuleiro.campo.forEach(element => {
        element.style.backgroundImage = 'url(imagens/fundo.png)' 
        element.value = 0
    });
    tabuleiro.jogadas = 0
    //reseta os valores dos campos de jogadas para o padrão
    for(let x = 0; x < tabuleiro.campo.length; x ++){
        tabuleiro.campo[x].value = x + 1
    };
    iniciaJogo()
};

function verificaJogo(){
    if(tabuleiro.campo[0].value===tabuleiro.campo[1].value&&tabuleiro.campo[2].value===tabuleiro.campo[0].value ||
       tabuleiro.campo[3].value===tabuleiro.campo[4].value&&tabuleiro.campo[5].value===tabuleiro.campo[3].value ||
       tabuleiro.campo[6].value===tabuleiro.campo[7].value&&tabuleiro.campo[8].value===tabuleiro.campo[6].value ||
       tabuleiro.campo[0].value===tabuleiro.campo[3].value&&tabuleiro.campo[6].value===tabuleiro.campo[0].value ||
       tabuleiro.campo[1].value===tabuleiro.campo[4].value&&tabuleiro.campo[7].value===tabuleiro.campo[1].value ||
       tabuleiro.campo[2].value===tabuleiro.campo[5].value&&tabuleiro.campo[8].value===tabuleiro.campo[2].value ||
       tabuleiro.campo[0].value===tabuleiro.campo[4].value&&tabuleiro.campo[8].value===tabuleiro.campo[0].value ||
       tabuleiro.campo[2].value===tabuleiro.campo[4].value&&tabuleiro.campo[6].value===tabuleiro.campo[2].value) {
        vitoria()
    } else if(tabuleiro.jogadas == 9){
        document.getElementById('inserir_jogadores').style.display = 'none';
        document.getElementById('vezDoJogador').style.display = 'none';
        document.getElementById('jogadorVencedor').style.display = 'block';  
        document.getElementById('vencedor').innerHTML = 'A velha '
        
        tabuleiro.campo.forEach(element => {
            element.removeEventListener('click', jogar);
        });
    };
};

function jogar() {

    if(this.value === 0 || this.value === 10){
        alert('Jogada invalida')
    } else {
        this.value = jogadorDaVez.operador
        tabuleiro.jogadas += 1
     if(jogadorDaVez == jogador_X){
        this.style.backgroundImage = 'url(imagens/x.png)' 
     } else if(jogadorDaVez == jogador_O){
        this.style.backgroundImage = 'url(imagens/circle.png)' 
     };
    //verifica vitória ou velha
     verificaJogo()

    //troca de jogador
     trocaJogador()
    };
};

function iniciaJogo(){
    //faz algumas alteraços no html
    document.getElementById('inserir_jogadores').style.display = 'none';
    document.getElementById('vezDoJogador').style.display = 'inline';
    document.getElementById('jogador').innerHTML = `: ${jogadorDaVez.nome.value}`;
    //adiciono o evento jogar no campo selecionado
    tabuleiro.campo.forEach(element => {
        element.addEventListener('click', jogar);
    });
};

function verificaJogadores() {  
    //Verifica se os campos com os nomes dos jogadores foram prenchidos
    if (jogador_O.nome.value === '' || jogador_X.nome.value === ''){
        alert('Insira os nomes dos jogadores');
    } else {
    //inclui os dados dos jogadores no painel    
        document.getElementById('jogador1').value = jogador_X.nome.value; 
        document.getElementById('jogador2').value = jogador_O.nome.value;

      //se tudo certo inicia o jogo
        iniciaJogo()  
    };
    
};

    //define as variaveis usadas no jogo
    const tabuleiro = {
     campo: document.querySelectorAll('li.campo'),
     jogadas: 0
    };

    const jogador_O = {
        nome: document.getElementById('jogador_O'),
        operador: 0,
        pontos: 0
    };

    const jogador_X = {
        nome: document.getElementById('jogador_X'),
        operador: 10,
        pontos: 0
    };

    //decide aleatoriamente qual jogador começa o jogo  
    var jogadorDaVez = sorteiaJogadorAcomecar(1, 2);
    
    const btn_jogarNovamente = document.getElementById('jogarNovamente');
        btn_jogarNovamente.addEventListener('click', jogarNovamente);

    const btn_restart = document.getElementById('restart')
        btn_restart.addEventListener('click', function() {
            jogarNovamente()
        });

    const btn_inicio = document.getElementById('inicio')
        //reinicia jogo
        btn_inicio.addEventListener('click', function() {
            location.reload()
        });
