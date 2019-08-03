const calc = require('./backing-calc');

function calcBacking() {
    let width = document.getElementById("width").valueAsNumber;
    let height = document.getElementById("height").valueAsNumber;
    if (!width || !height) {
        // One of the input fields are still blank
        // therefore NOOP
        return
    }
    let houtput = document.getElementById("h-output");
    let voutput = document.getElementById("v-output");
    const seams = calc(width, height);
    houtput.innerText = seams.horizontal.output + " yds";
    voutput.innerText = seams.vertical.output + " yds";
}

let width = document.getElementById("width");
let height = document.getElementById("height");
width.addEventListener("keyup", function () {
    calcBacking();
});

height.addEventListener("keyup", function () {
    calcBacking();
});