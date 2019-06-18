/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const RESET_VALUE = 2;
const diceElement = document.querySelectorAll('.dice');
const firstPlayerName = document.querySelector("#name-0");
const secondPlayerName = document.querySelector("#name-1");
let player1,
    player2,
    scores = [0, 0],
    dices = [0, 0],
    activePlayer = 0,
    current = 0,
    limitValue = 100;

function Gamer(name, score = 0) {
  this.name = name;
  this.score = score;
}
Gamer.prototype.setScore = function (score) {
  this.score = score;
};
Gamer.prototype.getScore = function () {
  return this.score;
};
Gamer.prototype.resetScore = function () {
  this.score = 0;
};

const initGame = () => {
  document.querySelector('#current-0').textContent = 0;
  document.querySelector('#current-1').textContent = 0;
  document.querySelector('#score-0').textContent = 0;
  document.querySelector('#score-1').textContent = 0;
  diceElement.forEach((el) => el.style.display = 'none');
  player1 = new Gamer();
  player2 = new Gamer();
  let players = [player1, player2];
  players.forEach((el, i) =>{
    while(!playerName) var playerName = prompt(`Имя ${i + 1} участника`);
    el.name = playerName;
  });
  firstPlayerName.textContent = player1.name;
  secondPlayerName.textContent = player2.name;
}

initGame();

document.querySelector('.input-limit').addEventListener('change', (e) => limitValue = e.target.value ? +e.target.value : 100 );

document.querySelector('.btn-roll').addEventListener('click', function() {
  document.querySelectorAll('.dice').forEach((el, index) => {
    let dice = Math.floor(Math.random() * 6) + 1;
    el.style.display = 'block';
    dices[index] = dice;
    el.src = `dice-${dice}.png`;
  });

  const doubleDices = dices.every((val, i, arr) => val == arr[0]);

  if (!dices.includes(RESET_VALUE) && !doubleDices) {
    current += dices.reduce((sum, x) => sum + x);
    document.getElementById(`current-${activePlayer}`).textContent = current;
  } else {
    changePlayer();
  }
});

const changePlayer = () => {
  current = 0;
  document.getElementById('current-'+activePlayer).textContent = 0;
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
  activePlayer = +!activePlayer;
  diceElement.forEach((el) => el.style.display = 'none');
  document.querySelector(`.player-${activePlayer}-panel`).classList.toggle('active');
}

document.querySelector('.btn-hold').addEventListener('click', function() {
  scores[activePlayer] += current;
  document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];
  if (scores[activePlayer] >= limitValue) setTimeout(() => alert(`Player ${activePlayer ? player1.name : player2.name} won!!!`), 300);
  changePlayer();
});


document.querySelector('.btn-new').addEventListener('click', function() {
  initGame();
});
