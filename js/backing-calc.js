function calcBacking(width, height) {
    let output = document.getElementById("output");
    output.innerText = Math.random();
}

let width = document.getElementById("width");
let height = document.getElementById("height");

width.addEventListener("keydown", function () {
    calcBacking(1, 2);
});

height.addEventListener("keydown", function () {
    calcBacking(1, 2);
}); 