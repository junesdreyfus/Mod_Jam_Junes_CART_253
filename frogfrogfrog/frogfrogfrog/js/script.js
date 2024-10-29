/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 */

"use strict";


// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound, gun
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 45,
    speed: 3
};

const ghostfly ={
  //what's a fly without a ghost/
    x: undefined,
    y: undefined,
    fill: 'rgb(194,194,231)',
    size: 45,
    speed: 2,
  halo: {
    x: undefined,
    y: undefined -10,
    
}
}
const gun ={
  x: -400,
  y: 50,
  width: 100,
  height: 30,
  speed: 1.5,
  fill: 'rgb(104,104,113)',
}


//introduce fly counter/
//how many flies are still in the program/
let remainingflies = 30;

/**
 * Creates the canvas and initializes the fly
 */

function setup() {
    createCanvas(640, 480);
  


    // Give the fly its first random position
    resetFly();
}

function draw() {
    background("#87ceeb");
    //display remaining flies/
      push();
    textSize(65);
    fill('white')
    textFont
    text (remainingflies, 300, 100, 10);
    pop();
    moveFly();
    drawFly();
    moveGhostfly();
    drawGhostfly();
    moveGun();
    drawGun();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    checkTongueGunOverlap();

}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}
function moveGhostfly() {
  //move the ghost fly
  ghostfly.x += ghostfly.speed;
  ghostfly.y -= ghostfly.speed;
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

function drawGhostfly() {
    push();
    noStroke();
    fill(ghostfly.fill);
    ellipse(ghostfly.x, ghostfly.y, ghostfly.size);
    pop();
    
    push();
    strokeWeight(6);
    stroke(ghostfly.fill)
    noFill();
    ellipse(ghostfly.x, ghostfly.y-40, 40, 20)
    pop();
  
    
}

function drawGun() {
  push();
  noStroke();
  fill(gun.fill);
  rect (gun.x, gun.y, gun.width, gun.height);
  rect (gun.x, gun.y, 20, 50)
  rect (gun.x, gun.y, 10, -10)
  pop();
}

function moveGun() {
  gun.x += gun.speed;
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}


/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten && remainingflies>1) {
      
      //red freezeframe when you hit something/
      push();
      noStroke();
      fill('red');
      square(0, 0, 1000);
      pop();
      
      //defining ghostfly coordinates/
      //this wasn't meant to sound like a björk lyric/
      ghostfly.x = fly.x;
      ghostfly.halo.x = fly.x;
      ghostfly.y = fly.y;
      ghostfly.halo.y = fly.y;
       
        //one less fly in the program/
        remainingflies-= 1
        
        // Reset the fly
        resetFly();
        
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
    //it will not reset the fly if there are none left/
    else if (eaten && remainingflies<2) {
      fly.size = 0;
      
      ghostfly.x = fly.x;
      ghostfly.halo.x = fly.x;
      ghostfly.y = fly.y;
      ghostfly.halo.y = fly.y;
      
      remainingflies=0;
      
      frog.tongue.state = "inbound";
      
    }
}

/**
 * Handles the tongue overlapping the gun
 */
function checkTongueGunOverlap() {
    // Get distance from tongue to gun
    const d = dist(frog.tongue.x, frog.tongue.y, gun.x, gun.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + gun.width/2);
    if (eaten) {
        gun.speed = 0;
        gun.y += 19;
        // Bring back the tongue
        frog.tongue.state = "inbound";
    if (gun.y<100) {
      frog.tongue.state = "gun";
    }
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}