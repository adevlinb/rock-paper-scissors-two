/*----- constants -----*/
const RPS_LOOKUP = {
    r: { img: 'imgs/rock.png', beats: 's' },
    p: { img: 'imgs/paper.png', beats: 'r' },
    s: { img: 'imgs/scissors.png', beats: 'p' },
};

const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-simple-countdown-922.mp3');

/*----- app's state (variables) -----*/
let scores; // Object with keys of 'p' (player), 't' (tie) & 'c' (computer)
let results; // Object with keys of 'p' & 'c'
let winner;  // '', 'p', 't', 'c'
let ignoreClick;  // Boolean

/*----- cached element references -----*/
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');
const countdownEl = document.getElementById('countdown');

/*----- event listeners -----*/
document.querySelector('main').addEventListener('click', handleChoice);

/*----- functions -----*/
init();

// Initialize all state, then call render
function init() {
    scores = {
        p: 0,
        t: 0,
        c: 0,
    };
    results = {
        p: 'r',
        c: 'r'
    };
    winner = '';
    ignoreClick = false;
    render();
}

// In response to user interaction (click), we update all 
// impacted state, then call render()
function handleChoice(evt) {
    // Guards
    if (
        evt.target.tagName !== 'BUTTON' ||
        ignoreClick
    ) return;
    ignoreClick = true;
    winner = '';
    render();
    renderCountdown(function () {
        results.p = evt.target.textContent.toLowerCase();
        // randomly get computer's choice
        results.c = getRandomRPS();
        winner = getWinner();
        scores[winner] += 1;
        ignoreClick = false;
        render();
    });
}

function renderCountdown(cb) {
    let count = 3;
    audio.currentTime = 0;
    audio.play();
    countdownEl.style.visibility = 'visible';
    countdownEl.textContent = count;
    const timerId = setInterval(function () {
        count--;
        if (count) {
            countdownEl.textContent = count;

        } else {
            countdownEl.style.visibility = 'hidden';
            clearInterval(timerId);
            cb();
        }
    }, 1000);
}

function getWinner() {
    if (results.p === results.c) return 't';
    return RPS_LOOKUP[results.p].beats === results.c ? 'p' : 'c';
}

function getRandomRPS() {
    const rps = Object.keys(RPS_LOOKUP);
    const rndIdx = Math.floor(Math.random() * rps.length);
    return rps[rndIdx];
}

// transfer/visualize all state to the DOM
function render() {
    renderScores();
    renderResults();
}

function renderResults() {
    pResultEl.src = RPS_LOOKUP[results.p].img;
    cResultEl.src = RPS_LOOKUP[results.c].img;
    pResultEl.style.borderColor = winner === 'p' ? 'gray' : 'white';
    cResultEl.style.borderColor = winner === 'c' ? 'gray' : 'white';
}

function renderScores() {
    for (let scoreKey in scores) {
        // TODO: refactor for efficiency
        const scoreEl = document.getElementById(`${scoreKey}-score`);
        scoreEl.textContent = scores[scoreKey];
    }
}
