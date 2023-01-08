'use strict';
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0ScoreEl = document.getElementById('current--0');
const current1ScoreEl = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing, score, activePlayer, currentScore;

// Starting conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0ScoreEl.textContent = 0;
  current1ScoreEl.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
// init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  //generating a random number between 1-6 when the dice is rolled
  const dice = Math.trunc(Math.random() * 6) + 1;

  //display the dice rolled
  diceEl.classList.remove('hidden');

  //Adding the images to be displayed in accordance to the random number generated
  diceEl.src = `dice-${dice}.png`;

  //check for rolled 1
  if (dice !== 1) {
    //Adding the number rolled on the dice to the current score of the active player
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //Switching to the next player.
    // document.getElementById(`current--${activePlayer}`).textContent =
    //   currentScore;
    // currentScore = 0;
    // activePlayer = activePlayer === 0 ? 1 : 0;
    //Switching the player-active class between the active players
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player score
    score[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. Check if the player score is >= 100
    if (score[activePlayer] >= 30) {
      //finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switching to the next player

      switchPlayer();
    }
  }
});

//Begin a new game
btnNew.addEventListener('click', init);
