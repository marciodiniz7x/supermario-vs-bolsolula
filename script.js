///////////////////////////////////
// |||||||||| INICIO |||||||||| //

let mario = document.querySelector('.mario');
let pipe = document.querySelector('.pipe');
let ciro = document.querySelector('.ciro');
let ferido = document.querySelector('.ferido');
let life = document.querySelector('.life');
let bomb = document.querySelector('.bomb');
let mensagemFinal = document.querySelector('.mensagemFinal')
let gameboard = document.querySelector('#gameboard')

const tela = document.querySelector('.tela');
const telavida = document.querySelector('.telavida')
const nuvens = document.querySelector('.nuvens');
const lowlife = document.querySelector('.lowlife');
const invulneravel = document.querySelector('.invulneravel');
const bar = document.querySelector('.bar');
const pontos = document.querySelector('.pontos');
const resultado = document.querySelector('.resultado');
const pts = document.querySelector('.pts');
const rank = document.querySelector('.rank');

const botaoJogar = document.querySelector('.jogar');
const game = document.querySelector('.game');
const reiniciar = document.querySelector('.reiniciar');

const vida = document.querySelector('.vida');
const loader = document.querySelector('.loader');

const explosion = document.querySelector('.explosion')

const menosVida = document.querySelector('.menosVida');
const maisVida = document.querySelector('.maisVida')

const inicio = document.querySelector('.inicio');

function iniciar() {

    // pipe.style.animation = 'none';
    // pipe.style.right = '-220px';

    ciro.style.animation = 'none';
    ciro.style.right = '-440px';

    gameboard.style.background.src = 'images/fundo2.jgp'

}


///////////////////////////////////
// ||||| CLICANDO EM JOGAR ||||| //

var audioStart = new Audio('sound/start.mp3');
audioStart.volume = 0.3;

var audioMusic = new Audio('sound/music.mp3');
audioMusic.volume = 0.3;

function jogar() {

    let contador = 0;
    let contaPontos = 0;
    let increment = 20;
    
    audioStart.play();

    setTimeout(() => {
        audioMusic.play();
    }, 1000);

    const loopPontos = setInterval(() => {
        contaPontos += 1;
        pontos.innerHTML = contaPontos;
        if (contaPontos === 999999 || contador === 500) {
            clearInterval(loopPontos);
        }
        pts.innerHTML = 'PONTUAÇÃO: ' + contaPontos;
        if(contaPontos < 700) {
            rank.innerHTML = ' BRONZE';
            rank.style.color = 'coral';
        } else if(contaPontos >= 700 && contaPontos < 1400) {
            rank.innerHTML = ' PRATA';
            rank.style.color = 'silver';
        } else if (contaPontos >= 1400 && contaPontos < 2900) {
            rank.innerHTML = ' OURO';
            rank.style.color = 'gold';
        } else if (contaPontos >= 2900 && contaPontos < 4800) {
            rank.innerHTML = ' PLATINA';
            rank.style.color = '#3dd307';
        } else if (contaPontos >= 4800  && contaPontos < 6500) {
            rank.innerHTML = ' DIAMANTE';
            rank.style.color = '#b256fd';
        } else if (contaPontos >= 5500 && contaPontos < 9000) {
            rank.innerHTML = ' MESTRE';
            rank.style.color = '#ca1cff';
        } else if (contaPontos >= 9000 && contaPontos < 13000) {
            rank.innerHTML = ' GRÃO-MESTRE';
            rank.style.color = '#ff1c86';
        } else {
            rank.innerHTML = ' DEUSTRUIDOR';
            rank.style.color = 'black';
            rank.style.textShadow = '1px 1px 10px red';
        }
    }, increment);

    mensagemFinal.style.animation = 'none'
    menosVida.style.animation = 'none';
    maisVida.style.animation = 'none';
    botaoJogar.style.transition = 'none';
    bomb.style.animation = 'none';

    ciro.style.animation = '';
    game.classList.remove('sumir');
    vida.classList.remove('sumir');
    inicio.classList.add('sumir');
    pipe.classList.add('pipeAnimado');

    // Criei um timeout para que a animação acelere (e aumente a dificuldade do jogo) a cada 10 saltos //
    setTimeout(() => { // Timeout 1 //

        // Antes de acelerar a animação, eu precisei cancelar ela e reiniciar (após 100ms) para que o pipe não acelerasse no meio da tela, pois ele bugava e teleportava //
        pipe.style.animation = 'none';
        setTimeout(() => {
            pipe.style.animation = '';
            pipe.style.animationDuration = "2s";
        }, 100);

        setTimeout(() => {  // // Timeout 2 // //
            pipe.style.animation = 'none';
            setTimeout(() => {
                pipe.style.animation = '';
                pipe.style.animationDuration = "1.5s";
            }, 100);

            setTimeout(() => { // // // Timeout 3 // // // 
                pipe.style.animation = 'none';
                setTimeout(() => {
                    pipe.style.animation = '';
                    pipe.style.animationDuration = "1s";
                }, 100);

                setTimeout(() => {

                    setTimeout(() => {
                        // Criei um if no contador para evitar que as animações do timeout aconteçam depois que o jogo acabou (contador = 500)
                        if (contador < 500) {
                            pipe.style.animation = 'none';
                            mensagemFinal.style.animation = '';
                            mensagemFinal.classList.remove('sumir');
                            setTimeout(() => {
                                pipe.style.animation = '';
                                pipe.style.animationDuration = '800ms'
                                bomb.style.animation = '';
                                bomb.classList.remove('sumir');
                            }, 7500);

                        }

                    }, 100);


                }, 10000);

            }, 15000); // // // Timeout 3 // // // 

        }, 20000);  // // Tineout 2 // //

    }, 25000); // Timeout 1 //

    /////////// Gameplay / PULAR ///////////
    ///////////////////////////////////////

    let pulou = false;

    var audioPulo = new Audio('sound/pulo.mp3');
    audioPulo.volume = 0.3;

    const jump = () => {
        if (pulou === false) {
            audioPulo.play();
            pulou = true;
            mario.classList.add('jump');
            ferido.classList.add('jumpferido');
            setTimeout(() => {
                pulou = false;
                mario.classList.remove('jump');
                ferido.classList.remove('jumpferido');
            }, 550);
        }
    }

    // PULAR
    setTimeout(() => {
        document.addEventListener('keydown', jump);
        document.addEventListener('click', jump);
    }, 500);
    


    // COLISÃO PIPE //
    //////////////////

    var audioDano = new Audio('sound/dano.mp3');
    audioDano.volume = 0.3;

    var audioDead = new Audio('sound/dead.mp3');
    audioDead.volume = 0.3;

    const loop = setInterval(() => {

        const pipePosition = +window.getComputedStyle(pipe).left.replace('px', '');
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        console.log(contador);

        if (pipePosition <= 60 && pipePosition > -40 && marioPosition < 170 && contador < 500) {

            if (contador < 400) {
                audioDano.play();
            } else if (contador = 400) {
                audioDead.play();
            }

            tela.classList.remove('sumir');
            menosVida.classList.remove('sumir');
            menosVida.style.animation = '';

            setTimeout(() => {
                tela.classList.add('sumir');
            }, 70);

            mario.classList.remove('mario');

            mario.classList.remove('jump');
            setTimeout(() => {
                mario.classList.add('mario')
                menosVida.classList.add('sumir')
                menosVida.style.animation = 'none';
            }, 600);

            contador += 100;

        }

        switch (contador) {
            case 0:
                loader.style.width = '500px';
                loader.classList.replace('loaderColor', 'loader');
                break;

            case 100:
                loader.classList.replace('loader', 'loaderColor');
                loader.style.width = '400px';
                break;

            case 200:
                loader.style.width = '300px';
                loader.style.background = 'yellow';
                break;

            case 300:
                loader.style.width = '200px';
                loader.style.background = 'orange';
                lowlife.classList.add('sumir');
                break;

            case 400:
                loader.style.width = '100px';
                loader.style.background = 'red';
                lowlife.classList.remove('sumir');

                break;

            case 500:
                loader.style.width = '0px';

                mario.classList.add('mario');

                pipe.classList.remove('pipeAnimado');
                pipe.style.left = `${pipePosition}px`;

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`;

                mario.src = "images/game-over.png";
                mario.style.width = '75px';
                mario.style.marginLeft = '50px';

                life.style.left = '-2000px';
                life.style.animation = 'none';

                bomb.classList.add('sumir')
                tela.classList.remove('sumir');
                tela.style.opacity = '30%';
                lowlife.classList.add('sumir');

                gameboard.style.background = 'url(images/fundoParado.jpg)';
                
                gameboard.style.backgroundSize = '100% 100%'

                reiniciar.classList.remove('sumir');
                loader.classList.replace('loaderColor', 'morto')

                ferido.style.visibility = 'hidden';

                resultado.classList.remove('sumir');
                audioMusic.pause();

                break;

            default:
                break;
        }

    }, 10);


    // COLISÃO LIFE //
    //////////////////

    var audioVida = new Audio('sound/cura.mp3');
    audioVida.volume = 0.3;
    
    var audioInvencivel = new Audio('sound/invencivel.mp3');
    audioInvencivel.volume = 0.3;

    const vidaLoop = setInterval(() => {

        const lifePosition = window.getComputedStyle(life).left.replace('px', '');
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (lifePosition <= 100 && lifePosition > 0 && marioPosition > 100) {

            audioVida.play();

            telavida.classList.remove('sumir');
            maisVida.classList.remove('sumir');
            maisVida.style.animation = '';
            life.classList.remove('life');
            contaPontos += 1000;

            setTimeout(() => {
                telavida.classList.add('sumir');
            }, 70);

            if (contador >= 100) {
                contador -= 100;
            } else {
                contador = 99999;
		audioInvencivel.play();
                invulneravel.classList.remove('sumir');
                bar.classList.add('reduzir');
                setTimeout(() => {
                    telavida.classList.remove('sumir');
                    telavida.classList.remove('fadeout');
                }, 71);

                setTimeout(() => {
                    contador = 0;
                    invulneravel.classList.add('sumir');
                    bar.classList.remove('reduzir');
                    telavida.classList.add('fadeout');
                    setTimeout(() => {
                        telavida.classList.add('sumir');

                    }, 600);

                }, 10000);
            }

            setTimeout(() => {
                life.classList.add('life')
                maisVida.classList.add('sumir');
                maisVida.style.animation = 'none';
            }, 600);
        }


    }, 10);

    // COLISÃO BOMBA //
    //////////////////

    var audioExplosao = new Audio('sound/explosao.mp3');
    audioExplosao.volume = 0.3;

    const bombLoop = setInterval(() => {

        const bombPosition = +window.getComputedStyle(bomb).left.replace('px', '');
        const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

        if (bombPosition <= 100 && bombPosition > 0 && marioPosition > 80 && contador != 99999) {

            bomb.classList.add('sumir');
            explosion.classList.remove('sumir');
            explosion.style.left = `${bombPosition}`;
            bomb.style.animation = 'none';;

            audioExplosao.play();

            setTimeout(() => {
                explosion.classList.add('sumir');
                setTimeout(() => {
                    audioDead.play();
                }, 400);
            }, 600);

            contador = 500;
        }

    }, 10);
}

function jogarNovamente() {
    document.location.reload();
}
