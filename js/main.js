/*----- constants -----*/





/*----- app's state (variables) -----*/
let scores; //object with keys of "p"(player), "t" (tie), "c" (computer)
let results; // object with keys of "p" & "c"
let winner; // "", "p", "t", "c"

/*----- cached element references -----*/






/*----- event listeners -----*/






/*----- functions -----*/

init();

//initialize all state / call render
function init() {
    scores = {
        p: 0,
        t: 0,
        c: 0
    };
    results = {
        p: "r",
        c: "r"
    };
    winner = "";
    render();
}


//transfer / visualize all state to the dom
function render() {
    for (let scoreKey in scores) {
        const scoreEl = document.getElementById(`${scoreKey}-score`);
        scoreEl.textContent = scores[scoreKey];
    }
}