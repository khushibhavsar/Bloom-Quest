//Use the arrow keys to move your player and collect all 8 waters

/* VARIABLES */
let player, ground, bird, platforms, waters;
let score = 0;
let sound;
let collectSound; 
let enterButton;
let gameStarted = false;

/* PRELOAD LOADS FILES */
function preload() {

  // Sounds 
  sound = loadSound('assets/WIN sound effect no copyright.mp3')

   collectSound = loadSound('assets/Collect Item Sound Effect.mp3'); 
  
  birdImg = loadImage('assets/angrybird.png');
  playerImg = loadImage('assets/seed.png');

}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);
  world.gravity.y = 10;

  //Resize image
  birdImg.resize(50, 0);
  playerImg.resize(100, 0);

  //Create player
  player = new Sprite(playerImg, 50, 250, 40, 40);
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;

  //Create ground
  ground = new Sprite(150, 380, 600, 40, "s");
  ground.color = color('#5b3e31');
  ground.friction = 0;

  //Create bird
  bird = new Sprite(birdImg, 750, 199, "k");
  bird.friction = 0;

  //Create platforms group
  platforms = new Group();
  platforms.color = '#765341';
  platforms.collider = "s";
  platforms.friction = 0;

  //Create waters group
  waters = new Group();
  waters.color = "blue";
  waters.collider = "k";

  //Overlaps method takes in a Sprite or group name (waters), then calls a function (collect)
  player.overlaps(waters, collect);

  //Load starting screen
  loadStartScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  background('#87CEEB');

  if (!gameStarted) {
    // Display home screen
    displayHomeScreen();
  } else {
    // Main game logic
    playGame();
  }
}

/* FUNCTIONS */

// Home screen function 
function displayHomeScreen() {
  textAlign(CENTER);
  textSize(25);
  fill(0);
  text('Welcome to Bloom Quest!', width / 2, 50);
  textSize(20);
  text('Press ENTER to Start', width / 2, 80);

  if (kb.presses("enter")) {
    gameStarted = true;
    loadStartScreen();
  }
}


//Main game logic function 
function playGame() { 
  //Draw instructions and score to screen
  fill(0);
  textAlign(LEFT);
  textSize(20);
  text('Water = ' + score, 10, 60);
  textSize(15);
  text('Collect all 8 waters to win!', 10, 30);

  //Move the player
  if (kb.presses("up")) {
    player.vel.y = -6;
  }

  if (kb.pressing("left")) {
    player.vel.x = -3;
  } else if (kb.pressing("right")) {
    player.vel.x = 3;
  } else {
    player.vel.x = 0;
  }

  //Stop player from moving outside of screen
  if (player.x < 20) {
    player.x = 20;
  }
  
  if (player.x > 900) {
    player.x = 900;
  }
  
  if (player.y < 20){
    player.y = 20;
  }

  //Move bird
  if (bird.y < 200) {
    bird.vel.y = 3;
  } else if (bird.y > 360) {
    bird.vel.y = -3;
  }

  //Collide with bird and restart
  if (player.collides(bird)) {
    reset();
  }

  //Collect 8 waters and win
  if (score == 8) {
    youWin();
    sound.play()

    // Stop the sound after 3 second
    setTimeout(() => {
      sound.stop();
    }, 3000);
  }

  //Set camera to follow player
  camera.x = player.x + 102;
  ground.x = camera.x; 
}

// Load starting screen function
function loadStartScreen() {
  platforms.removeAll();
  waters.removeAll();

  //Move player to starting position
  player.x = 50;

  //Create two platforms
  new platforms.Sprite(110, 310, 50, 100);
  new platforms.Sprite(260, 200, 150, 30);

  //Create eight waters
  new waters.Sprite(220, 170, 15);
  new waters.Sprite(260, 170, 15);
  new waters.Sprite(300, 170, 15);
  new waters.Sprite(600, 350, 15);
  new waters.Sprite(640, 350, 15);
  new waters.Sprite(680, 350, 15);
  new waters.Sprite(810, 350, 15);
  new waters.Sprite(850, 350, 15);
}

function reset() {
  score = 0;
  loadStartScreen();
}

//This function uses parameters 
function collect(player, water) {
  water.remove();
  score = score + 1;
  collectSound.play();
}

function youWin() {
  //Draw sprites off screen
  bird.x = 2000;
  player.x = 3000;

  //Draw end of game text
  textSize(20);
  fill(0);
  text("You win!", width/2 - 50, height/2 - 30); 
  textSize(12);
  text("Refresh to play again.", width/2 - 75, height/2);
}
