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
    const seams = calc(width + 10, height + 10);
    houtput.innerText = seams.horizontal.output + " yds";
    voutput.innerText = seams.vertical.output + " yds";
}

const _X = 40;
const _Y = 104;

function w_h_both_lessthan(w, h, seams) {
    //
    // Horizontal seams
    //
    let y = w / 36;
    if (y % 1 / 8 === 0 || y % 1 / 3 === 0) {
        // Horzontal seams do not need to be
        // rounded up
        seams.horizontal.output = y;
        seams.horizontal.pierce = false;
    } else {    
        // The horizontal seams need to be rounded up
        // to the nearest 1/8th or 1/3th
        seams.horizontal.output = roundToNearestFraction(y);
        seams.horizontal.pierce = false;
    }
    //
    // Vertical seams
    //
    let z = h / 36;
    if (z % 1 / 8 === 0 || z % 1 / 3 === 0) {
        // Vertical seams do not need to be
        // rounded up
        seams.vertical.output = z;
        seams.vertical.pierce = false;
    } else {
        // The horizontal seams need to be rounded up
        // to the nearest 1/8th or 1/3th
        seams.vertical.output = roundToNearestFraction(z);
        seams.vertical.pierce = false;
    }
    return seams;
}

function w_smaller_h_bigger(w, h, seams) {
    let b = w / 36;
    let a = h + (h % 40);
    a /= 40;
    let y = a * b;
    if(y % 1/8 === 0 || y % 1/3 === 0) {
        seams.horizontal.output = y;
        seams.horizontal.pierce = true;
    } else {
        seams.horizontal.output = roundToNearestFraction(y);
        seams.horizontal.pierce = true;
    }

    let z = h / 36;
    if (z % 1 / 8 === 0 || z % 1 / 3 === 0) {
        // Vertical seams do not need to be
        // rounded up
        seams.vertical.output = z;
        seams.vertical.pierce = false;
    } else {
        seams.vertical.output = roundToNearestFraction(z);
        seams.vertical.pierce = false;
    }
    return seams;
}

function w_bigger_h_smaller(w, h, seams) {
    let y = w / 36;
    if(y % 1/8 === 0 || y % 1/3 === 0) {
        seams.horizontal.output = y;
        seams.horizontal.pierce = false;
    } else {
        seams.horizontal.output = roundToNearestFraction(y);
        seams.horizontal.pierce = true;
    }

    let b = h / 36;
    let a = w + (w % 40);
    a /= 40;
    let z = a * b;
    if (z % 1 / 8 === 0 || z % 1 / 3 === 0) {
        // Vertical seams do not need to be
        // rounded up
        seams.vertical.output = z;
        seams.vertical.pierce = true;
    } else {
        seams.vertical.output = roundToNearestFraction(z);
        seams.vertical.pierce = true;
    }
    return seams;
}

function w_h_both_greaterthan(w, h, seams) {
    if(w === h) {
        let a = w + (w % 40);
        a /= 40;
        let b = h / 36;
        let y = a * b;
        if(y % 1/8 === 0 || y % 1/3 === 0) {
            seams.horizontal.output = y;
            seams.horizontal.pierce = true;
            seams.vertical.output = y;
            seams.vertical.pierce = true;
        } else {
            let result = roundToNearestFraction(y);
            seams.horizontal.output = result;
            seams.horizontal.pierce = true;
            seams.vertical.output = result;
            seams.vertical.pierce = true;
        }
    } else {
        let a = h + (h % 40);
        a /= 40;
        a = Math.ceil(a);
        let b = w / 36;
        let y = a * b;
        if(y % 1/8 === 0 || y % 1/3 === 0) {
            seams.horizontal.output = y;
            seams.horizontal.pierce = true;
        } else {
            seams.horizontal.output = roundToNearestFraction(y);
            seams.horizontal.pierce = true;
        }

        let c = w + (w % 40);
        c /= 40;
        c = Math.ceil(c);
        let d = h / 36;
        let z = c * d;
        if (z % 1 / 8 === 0 || z % 1 / 3 === 0) {
            // Vertical seams do not need to be
            // rounded up
            seams.vertical.output = z;
            seams.vertical.pierce = true;
        } else {
            seams.vertical.output = roundToNearestFraction(z);
            seams.vertical.pierce = true;
        }
    }
    return seams;
}

function calc(w, h) {
    let defaultSeams = { 'vertical': { 'output': -1, 'pierce': false }, 'horizontal': { 'output': -1, 'pierce': false } };
    if (w < 40 && h < 40) {
        return w_h_both_lessthan(w, h, defaultSeams);
    } else if (w < 40 && h > 40) {
        return w_smaller_h_bigger(w, h, defaultSeams);
    } else if ((w > 40 && h < 40)) {
        return w_bigger_h_smaller(w, h, defaultSeams);
    } else if (w > 40 && h > 40) {
        return w_h_both_greaterthan(w, h, defaultSeams);
    }
}

// Round up number to the nearest 1/3th or 1/8th
function roundToNearestFraction(num) {
    let oneEight = num % 1 / 8;
    let oneThird = num % 1 / 3;

    if (oneEight < oneThird) {
        // Round to the nearest 1/8th
        return 1.0 / 8 * Math.ceil(8 * num);
    } else {
        // Round to the nearest 1/3th
        return 1.0 / 3 * Math.ceil(3 * num);
    }
}

let width = document.getElementById("width");
let height = document.getElementById("height");
width.addEventListener("keyup", function () {
    calcBacking();
});

height.addEventListener("keyup", function () {
    calcBacking();
}); 