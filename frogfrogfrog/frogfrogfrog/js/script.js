/**
 * Frogfrogfrog
 * Pippin Barr
 mod by Junes Dreyfus
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

let state = 'intro';



 
 //introduce fly counter/
 //how many flies are still in the program/
 let remainingflies = 31;
 

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
     size: 10 ,
     speed: 3
 };
 
 const ghostfly ={
   //what's a fly without a ghost/
     x: undefined,
     y: undefined,
     r: 162,
     g: 164,
     b: 202,
     size: 10,
     speed: 2,
     hovering: 0,
     
   halo: {
     x: undefined,
     y: undefined -10,
     
 }
 }
 const gun ={
   x: -400,
   y: 50,
   width: 30,
   height: 100,
   speed: 1.5,
   fill: 'rgb(104,104,113)',
 }
 
 const speech = [
  "'insert here'",
 
];

// Which part of the speech are we displaying?
let speechIndex = 0;

 const endspeech = [
  "'insert end here'",
 
];

// Which part of the end speech are we displaying?
let endspeechIndex = 0;

// Dialog box specification
let box = {
  x: fly.x +50,
  y: fly.y +50,
  width: 200,
  height: 50,
  padding: 10,
  fontSize: 12
};
 

 function setup() {
     createCanvas(640, 480);
   
 
 
     // Give the fly its first random position
     resetFly();
 }
 
 function draw() {
     background("#A2A4CA");
   
   
   //defining the intro state/
if (state === 'intro'){
  drawFrog();
  moveFrog();
  moveTongue();
  drawFly();
  introFly();
  drawGhostfly();
  moveGhostfly();
  glowGhostfly();
  checkTongueFlyOverlap();
  showDialog();


/**
 * Display the speech in a dialog box
 */

  

  
  //transitioning between states/
  //if downarrow is pressed the gameplay starts/
  if (remainingflies<31){
    state = 'gameplay';
  }
}
   
   //defining the gameplay state/
   else if (state === 'gameplay'){
     
     //display remaining flies/
      push();
     stroke('black')
     strokeWeight(2);
     textSize(65);
     fill(255, 255, 255)
     textFont
     text (remainingflies, 300, 100, 10);
     pop();
     
     fly.speed=3
     
     
     moveFly();
     drawFly();
     moveGhostfly();
     drawGhostfly();
     glowGhostfly();
     moveGun();
     drawGun();
     moveFrog();
     moveTongue();
     drawFrog();
     checkTongueFlyOverlap();
     checkTongueGunOverlap();
     
 if (remainingflies === 0){
   state = 'ending';
 }
     
 }
   
 else if (state === 'ending'){
   
   drawFrog();
   moveFrog();
   moveTongue();
   drawGhostfly();
   moveGhostfly();
   glowGhostfly();
   showEndDialog();
   endingFly();
   
 }
 } 

function showDialog() {
  // The background box
  push();
  fill(0);
  stroke(255);
  strokeWeight(1);
  rect(fly.x, fly.y+50, box.width, box.height);
  pop();
  
  // The text
  // Note how we're using extra arguments in text() to specify
  // the dimensions we want the text to wrap inside, including
  // using the padding of the dialog box
  push();
  fill(255);
  textSize(12);
  text(speech[speechIndex], fly.x + box.padding, fly.y+50  + box.padding, box.width - 2 * box.padding, box.height - 2 * box.padding);
  pop();
}

/**
 * When the user clicks, advance the speech if there's more.
 */
function mousePressed() {
  // Make sure we're not at the end of the speech aready
  if (speechIndex < speech.length - 1) {
    // Advance the line
    speechIndex++;
  }
}

function showEndDialog() {
  // The background box
  push();
  fill(0);
  stroke(255);
  strokeWeight(1);
  rect(ghostfly.x, ghostfly.y+50, box.width, box.height);
  pop();
  
  // The text
  // Note how we're using extra arguments in text() to specify
  // the dimensions we want the text to wrap inside, including
  // using the padding of the dialog box
  push();
  fill(255);
  textSize(12);
  text(endspeech[endspeechIndex], ghostfly.x + box.padding, ghostfly.y+50  + box.padding, box.width - 2 * box.padding, box.height - 2 * box.padding);
  pop();
}

/**
 * When the user clicks, advance the speech if there's more.
 */
function mousePressed() {
  // Make sure we're not at the end of the speech aready
  if (speechIndex < speech.length - 1) {
    // Advance the line
    speechIndex++;
  }
}

  function introFly(){
    //the first fly introduces the game/
    
    //Spawning the first fly/
    
    //moving the fly to the middle of the screen/
    fly.x += fly.speed;
    fly.y += random(1, -1);
    
    //restraining the fly to the middle of the screen/
    if (fly.x>320){
      fly.speed=0
    }
    
    
  }

function endingFly(){
    //the first fly introduces the game/
    
    //Spawning the first fly/
    
    //moving the fly to the middle of the screen/
    ghostfly.y += ghostfly.speed;
    
    
    //restraining the fly to the middle of the screen/
    if (ghostfly.x>320){
      ghostfly.speed=0
    }
    
    
  }

 
 /**
  * Moves the fly according to its speed
  * Resets the fly if it gets all the way to the right
  */
 function moveFly() {
     // Move the fly
     fly.x += fly.speed;
     fly.y += random(1,-1);
     // Handle the fly going off the canvas
     if (fly.x > width) {
         resetFly();
     }
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
     fill(ghostfly.r, ghostfly.g, ghostfly.b);
     ellipse(ghostfly.x, ghostfly.y, ghostfly.size);
     pop();
     
     push();
     strokeWeight(6);
     stroke(ghostfly.r, ghostfly.g, ghostfly.b);
     noFill();
     ellipse(ghostfly.x, ghostfly.y-40, 40, 20)
     pop();
   
     
 }
 
 function moveGhostfly() {
   //move the ghost fly
   ghostfly.hover += random(-0.1,0.1)
   ghostfly.x += ghostfly.speed + random(-2 ,2);
   ghostfly.y -= ghostfly.speed;
 }
 
 function glowGhostfly() {
   ghostfly.r -= 4;
   ghostfly.g -= 4;
   if(ghostfly.r<160 && ghostfly.g<160){
     ghostfly.r +=23;
     ghostfly.g +=23;
      }
 }
 
 function drawGun() {
   push();
   fill(gun.fill);
   
   //muzzle of the gun/
   rect (gun.x+35, gun.y-75, gun.width-10, 10)
   //barrel of the gun/
   rect (gun.x+65, gun.y+20, -10, 10)
   //handle of the gun/
   rect (gun.x+30, gun.y-70, gun.width, gun.height);
   //sights of the gun/
   rect (gun.x-20, gun.y+10, 50, 20)
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


 function resetGhostfly() {
     ghostfly.x = 0;
     ghostfly.y = 100;
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
     else if (frog.tongue.state === "gun"){
      frog.tongue.y = 300;
      gun.y = 300;
       
      if (gun.y > 650){
        frog.tongue.state = "idle";
      }

       }
     
 }
 
 /**
  * Displays the tongue (tip and line connection) and the frog (body)
  */
 function drawFrog() {
 
     // Draw the rest of the tongue
     push();
     stroke("#BE6A6A");
     strokeWeight(frog.tongue.size);
     line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
     pop();
 
   
     // Draw the tongue tip
     push();
     stroke('rgb(213,105,105)');
     strokeWeight(8)
     fill('rgb(213,105,105)');
     ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
     pop();
   
     // Draw the frog's body
     push();
     fill("#9DD49D");
     ellipse(frog.body.x, frog.body.y, frog.body.size, 200);
     pop();
   
     push();
     fill('rgb(234,230,230)')
     ellipse(frog.body.x+frog.body.size/3, frog.body.y-60, 30);
     ellipse(frog.body.x-frog.body.size/3, frog.body.y-60, 30);
     fill('black')
     ellipse(frog.body.x+frog.body.size/3, frog.body.y-60, 5);
     ellipse(frog.body.x-frog.body.size/3, frog.body.y-60, 5);
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
        
       //frog's body gets bigger the more she eats/
       frog.body.size +=10
       frog.tongue.size +=2
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
       
       //body gets bigger the more she eats/
       frog.body.size +=10
       frog.tongue.size +=2
       
       remainingflies=0;
       
       frog.tongue.state = "inbound";
       
     }
 }

 /**
  * Handles the tongue overlapping the gun
  */
 function checkTongueGunOverlap() {
     // Get distance from tongue to gun
     const dGun = dist(frog.tongue.x, frog.tongue.y, gun.x, gun.y);
     // Check if it's an overlap
     const gunHeld = (dGun < frog.tongue.size/2 + gun.height);
     if (gunHeld) {
       
       //what happens when the gun overlaps with tongue/
       //gun coordinates become the same as the frog's tongue's
        gun.speed += 0;
        gun.y += frog.tongue.speed;
       gun.x = frog.tongue.x
       
       gun.y = constrain(gun.y, 0, 350)
       
       //Frog tongue's comes back to default/
       frog.tongue.y += frog.tongue.speed;
       frog.tongue.y = constrain (frog.tongue.y, 0, 350)
       
       //frog's tongue stops at a specific y coordinate/
       if (frog.tongue.y === 100){
         frog.tongue.speed=0;
         
        //frog's tongue state is now gun//
       frog.tongue.state = "gun";
       }
       if (gun.y > 300 && keyIsPressed === true && keyCode === 32){
        push();
        noStroke();
        fill ('#FFA500');
        rect(gun.x+35, gun.y-75, 30, -500);
        pop();
        
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
