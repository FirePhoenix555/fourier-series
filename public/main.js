// PARAMETERS
const NUM = 200; // the number of vectors/circles it displays
const fr = 60 * 4; // the speed. I'm not sure of scale.
const dt = 0.001; // 1/dt is the # of pts sampled from the array

// OTHER
let path = []; // the ComplexNumbers representing the path you draw out
let vectors = []; // ComplexNumbers that represent the starting angle and overall magnitude of the vectors shown on screen
let STATE = false; // is it time for your drawing or for its drawing?
let prev = []; // the previous coordinates in the path, so it can draw a line from the prev to the current
let cnvs; // the graphics object for the path it draws out
let SLIDER; // currently not used, will be for changing the number of vectors



// P5
function setup() {
    createCanvas(windowWidth - 100, windowHeight - 100);
    document.getElementsByTagName("canvas")[0].style.border = "1px solid black"; // easier to see boundaries
    frameRate(100); // for consistency
    cnvs = createGraphics(width, height); // for the path as it's drawing it out
}

function draw() {
    if (mouseIsPressed && !STATE) { // if you're drawing
        path.push(new ComplexNumber(mouseX - width / 2, mouseY - height / 2)); // add the position
        
        // draw the line to show what you've already drawn
        if (path.length > 1) {
            let a = path[path.length - 2];
            let b = path[path.length - 1];
            stroke(0);
            line(a.a + width / 2, a.b + height / 2, b.a + width / 2, b.b + height / 2);
        }
    }

    if (STATE) { // if IT'S drawing
        background(255);
        image(cnvs, 0, 0, width, height); // the already traced out path
        display(vectors);

        // rotate the vectors by their set amount
        for (let i = 0; i < vectors.length; i++) {
            vectors[i] = vectors[i].multiply(e(2 * Math.PI * (i - NUM / 2) / fr));
        }
    }
}

function keyPressed() {
    if (keyCode == ENTER) { // pressing enter says "I'm done with my drawing"
        STATE = true;
        calc(path);
    }
}



// GRAPHICS
function display(vectors) {
    cnvs.background(255, 5); // slightly transparent, for the trail

    let fa = [width / 2, height / 2]; // the final point. starts in the middle, adds each vector

    let v = copya(vectors); // make a copy of the array so I don't overwrite the actual thing
    v = v.sort((a,b) => b.a * b.a + b.b * b.b - a.a * a.a - a.b * a.b); // sort by length

    push(); // save current transformations so it can reset back when it's done
    translate(width / 2, height / 2);
    for (let i = 0; i < v.length; i++) {
        let b = v[i];

        stroke(0, 25);
        noFill();
        ellipse(0, 0, b.magnitude() * 2); // the circles that the vectors are in
        fill(0);

        stroke(0);
        line(0, 0, b.a, b.b); // the vectors themselves

        translate(b.a, b.b); // translate to the end so the next vector starts at this one's end
        
        // add this vector to the final point
        fa[0] += b.a;
        fa[1] += b.b;
    }
    pop(); // reset transforms

    if (prev) { // can't use prev if it doesn't exist
        cnvs.line(prev[0], prev[1], fa[0], fa[1]); // draw the line to the previous path value
    }
    prev = fa; // save the current as the prev for next time
}



// THE MATH
class ComplexNumber {
    constructor(a, b) { // a + bi
        this.a = a;
        this.b = b;
    }
    add(other) { // adding.
        return new ComplexNumber(this.a + other.a, this.b + other.b);
    }
    multiply(other) {// multiplying.
        if (!other.a && other.a !== 0) { // other is a scalar
            return new ComplexNumber(this.a * other, this.b * other);
        }

        // other is another complex number
        return new ComplexNumber(this.a * other.a - this.b * other.b, this.b * other.a + this.a * other.b);
    }
    magnitude() { // the length of the "vector"
        return Math.sqrt(this.a * this.a + this.b * this.b);
    }
}

// ∫[0,1] f(t) * e^(-n*2*pi*i*t) * dt
function calc() { // the math. calculates the starting angle and length for each vector
    for (let j = -NUM / 2; j <= NUM / 2; j++) {
        let sum = new ComplexNumber(0, 0); // the current sum

        for (let i = 0; i <= 1; i += dt) { // evaluating the integral numerically
            let f1 = f(i); // the value in the path
            sum = sum.add(f1.multiply(e(-j * 2 * Math.PI * i)).multiply(dt)); // f(t) * e^(-n*2*pi*i*t) * dt
        }

        vectors[j + NUM / 2] = sum; // that sum is the vector!
    }
}



// UTILITY
function copya(arr) { // copies an array
    let a = [];
    for (let i = 0; i < arr.length; i++) {
        a[i] = new ComplexNumber(arr[i].a, arr[i].b);
    }
    return a;
}

function f(t) { // t from 0 to 1, this exists to make summing easier because the length (of the path) is 1
    return path[Math.floor(t * path.length)];
}

function e(exp) { // raises e to the i*exp power (i here is the imaginary number not an index)
    return new ComplexNumber(Math.cos(exp), Math.sin(exp));
}