/*----- constants -----*/
const RPS_LOOKUP = {
    r: 'images/rock.png',
    p: 'images/paper.png',
    s: 'images/scissors.png',
};

/*----- app's state (variables) -----*/
let scores; // Object with keys of 'p' (player), 't' (tie) & 'c' (computer)
let results; // Object with keys of 'p' & 'c'
let winner;  // '', 'p', 't', 'c'

/*----- cached element references -----*/
const pResultEl = document.getElementById('p-result');
const cResultEl = document.getElementById('c-result');

/*----- event listeners -----*/
document.querySelector("main").addEventListener("click", handleChoice);

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
    render();
}

function handleChoice(evt) {
    //guards
    if (evt.target.tagName !== "BUTTON") return;
    results.p = evt.target.textContent.toLowerCase();
    //randomly get computer choice
    results.c = computerChoice();
    render();
}

// transfer/visualize all state to the DOM
function render() {
    renderScores();
    renderResults();
}

function renderResults() {
    pResultEl.src = RPS_LOOKUP[results.p];
    cResultEl.src = RPS_LOOKUP[results.c];
}

function renderScores() {
    for (let scoreKey in scores) {
        // TODO: refactor for efficiency
        const scoreEl = document.getElementById(`${scoreKey}-score`);
        scoreEl.textContent = scores[scoreKey];
    }
}

function computerChoice() {
    const rps = Object.keys(RPS_LOOKUP);
    const rndIdx = Math.floor(Math.random() * rps.length);
    return rps[rndIdx];
}