let player;
let playerImg;
let playerShootImg;
let bullets = [];
let beatInterval = 400; // 150 = 400ms
let lastBeatTime = 0;
let canShoot = false;
let beatCount = 0;
let enemies = [];
let ghostImg;
let bgImg;
let endWinImg;
let endLoseImg;
let beatFlash = 0;
let startButton;
let timerView;
let timerEnded = false;
let playerHits = 0;
let maxHits = 3;
let endType = "";
let restartButtonWin;
let restartButtonLose;

let currentScene = "intro";

function preload() {
  startbtnImg = loadImage("start.btn.png");
  introImg = loadImage("intro.png");
  bgImg = loadImage("bg.png");
  playerImg = loadImage("player.png"); 
  playerShootImg = loadImage("player_shoot.png");
  music = loadSound('music.mp3');
  shootSound = loadSound('shootSound.mp3');
  failSound = loadSound('failSound.mp3');
  ghostImg = loadImage("ghost.png");
  endWinImg = loadImage("end.win.png");
  endLoseImg = loadImage("end.lose.png");
  timeImg = loadImage("time.png");
  healthImg = loadImage("health.png");
  restartbtnImg = loadImage("restart.btn.png");
  cowboys = loadFont("Cowboys.otf")
}

function setup() {
  createCanvas(800, 800);
  angleMode(RADIANS);
  imageMode(CENTER);
  
  // Initialize button
  startButton = new Button(width / 2 + 12, 860);
  startButton.setImage("start.btn.png");
  startButton.y -= 168;
  startButton.x -= 13;
  startButton.addListener(startGame);
  
  restartButtonWin = new Button(width / 2, 445); 
  restartButtonWin.setImage("restart.btn.png");
  restartButtonWin.addListener(restartGame);

  restartButtonLose = new Button(width / 2 + 10, 630); 
  restartButtonLose.setImage("restart.btn.png");
  restartButtonLose.addListener(restartGame);
  
  sceneIntro = new intro();
  sceneIntro.setImage("intro.png");
  
  sceneGame = "game";
  
  timer = new Timer();
  timer.setCountDown(84); // Set countdown to 60 seconds
}

function startGame() {
  timerEnded = false;
  timer.start();
  startButton.disable();
  restartButtonWin.disable();
  restartButtonLose.disable();
  currentScene = "game"; 
  player = new Player(width / 2, height / 2, playerImg, playerShootImg);
  shootSound.setVolume(0.5);
  failSound.setVolume(1);
  music.setVolume(0.5);
  music.play(); // müzik başlıyor
  lastBeatTime = millis(); // ilk beat
  beatCount = 0;
  enemies = [];
  bullets = [];
}

function restartGame() {
  timer.restart();
  playerHits = 0;
  beatCount = 0;
  bullets = [];
  enemies = [];
  music.stop();
  canShoot = false;
  currentScene = "intro";
  startButton.enable();
}

function draw() {
    // Intro scene
  if (currentScene == "intro") {
    image(introImg, width / 2, height / 2, width, height); // Show intro image
    startButton.draw(); // Draw the start button
  }
  
  // Game scene
  else if (currentScene == "game") {
  image(bgImg, width / 2, height / 2, width, height);
  
  for (let i = enemies.length - 1; i >= 0; i--) {
  enemies[i].update();
  enemies[i].draw();

  if (enemies[i].isNearPlayer()) {
    playerHits++;
  enemies.splice(i, 1);
  
  if (playerHits >= maxHits) {
    music.stop();
    enemies = [];
    bullets = [];
    endType = "lose";
    currentScene = "end";
    return; // sahneyi bitir
  }
  }
}
  
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].draw();

    for (let j = enemies.length - 1; j >= 0; j--) {
      let d = dist(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);
      if (d < enemies[j].size / 2) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        break;
      }
    }

    // ekran dışına çıkan mermyi sil
    if (i < bullets.length && bullets[i].isOffScreen()) {
      bullets.splice(i, 1);
    }
  }
  
  //beat control
  if (millis() - lastBeatTime >= beatInterval) {
  beatCount++;
  lastBeatTime += beatInterval;

  // her kaç beat'te düşman ve mermi
  if (beatCount % 2 === 0) {
    canShoot = true;
    beatFlash = 255;
  }
  else {
    canShoot = false;
  }
  
  if (beatCount % 2 === 0) {    // random yön
    let directions = ["UP", "DOWN", "LEFT", "RIGHT"];
    let dir = random(directions);
    enemies.push(new Enemy(dir, 2, ghostImg)); // hız: 2
  } 
}

  player.update();
  player.draw();
    for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].draw();
    
    if (bullets[i].isOffScreen()) {
      bullets.splice(i, 1);
    }
  }
  
  if (beatFlash > 0) {
  push();
  noFill();
  stroke(255, 255, 255, beatFlash); // beyaz ve şeffaf
  strokeWeight(3);
  ellipse(player.x, player.y, 80 + (255 - beatFlash), 80 + (255 - beatFlash));
  beatFlash -= 10; // opacity azalsın
  pop();
}
    
  textSize(24);
  textFont(cowboys);
  fill(255);    
  let timeImgWidth = 300;  
  let timeImgHeight = 300;
  image(timeImg, 650, 60, timeImgWidth, timeImgHeight);
  timer.draw(650, 87);
    
  fill(255);
  textSize(28);
  text((maxHits - playerHits), 80, 60);
  let healthImgWidth = 100;  
  let healthImgHeight = 100;
  image(healthImg, 50, 50, healthImgWidth, healthImgHeight);

  if (timer.isFinished) {
  music.stop();
  enemies = [];
  bullets = [];
  endType = "win";
  currentScene = "end";
  }
}
  
  // End scene
else if (currentScene == "end") {
  if (endType === "win") {
    image(endWinImg, width / 2, height / 2, width, height);
    restartButtonWin.draw();
    restartButtonWin.enable();
  } else if (endType === "lose") {
    image(endLoseImg, width / 2, height / 2, width, height);
    restartButtonLose.draw();
    restartButtonLose.enable();
  }
}


}

function keyPressed() {
  if (canShoot) {
    if (keyCode === UP_ARROW) {
      player.setDirection("UP");
      player.shoot(bullets);
    } else if (keyCode === RIGHT_ARROW) {
      player.setDirection("RIGHT");
      player.shoot(bullets);
    } else if (keyCode === DOWN_ARROW) {
      player.setDirection("DOWN");
      player.shoot(bullets);
    } else if (keyCode === LEFT_ARROW) {
      player.setDirection("LEFT");
      player.shoot(bullets);
    }
    shootSound.play();
    canShoot = false;
  } else {
    failSound.play(); 
  }
}
