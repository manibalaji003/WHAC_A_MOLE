const holescount = document.getElementsByClassName('hole');
const scoreBoard = document.querySelector('.score'); // Assuming only one score element
const moles = document.querySelectorAll('.mole');
const button = document.querySelector('#start');

let lastHole;
let TimeUp = false;
let score = 0;

function startGame() {
    scoreBoard.textContent = "0"; // Reset score on the scoreboard
    TimeUp = false;
    score = 0;
    button.style.visibility = 'hidden';
    peep();
    setTimeout(() => {
        TimeUp = true;
        button.innerHTML = 'Restart?';
        button.style.visibility = 'visible';
    }, 10000);
}

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHoles(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const liveholes = holes[idx];

    if (liveholes === lastHole) {
        return randomHoles(holes);
    }
    lastHole = liveholes;
    return liveholes;
}

function peep() {
    const time = randomTime(200, 2000);
    const hole = randomHoles(holescount);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove('up');
        if (!TimeUp) peep();
    }, time);
}

// Add the event listener to each mole
moles.forEach(mole => mole.addEventListener('click', bonk));

function bonk(e) {
    if (!e.isTrusted) return; // Prevent fake clicks (for security)
    score++;
    e.target.classList.remove('up'); // Use e.target instead of this
    scoreBoard.textContent = score; // Update the score on the scoreboard
}
