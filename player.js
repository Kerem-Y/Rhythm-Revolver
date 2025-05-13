class Player {
  constructor(x, y, normalImg, shootingImg) {
  this.x = x;
  this.y = y;
  this.normalImg = normalImg;
  this.shootingImg = shootingImg;
  this.currentImg = normalImg;
  this.direction = "UP";
  this.size = 180;
  this.shootTimer = 0;
}

  update() {
    // Sadece yön güncellendiği için burada başka bir şey yok
  }

  draw() {
  if (this.shootTimer > 0) {
    this.shootTimer--;
    if (this.shootTimer === 0) {
      this.currentImg = this.normalImg;
    }
  }

  push();
  translate(this.x, this.y);
  if (this.direction === "UP") rotate(0);
  else if (this.direction === "RIGHT") rotate(HALF_PI);
  else if (this.direction === "DOWN") rotate(PI);
  else if (this.direction === "LEFT") rotate(-HALF_PI);
  imageMode(CENTER);
  image(this.currentImg, 0, 0, this.size, this.size);
  pop();
}
  
  setDirection(dir) {
    this.direction = dir;
  }
  
shoot(bulletArray) {
  let offsetX = 0;
  let offsetY = 0;
  
  if (this.direction === "UP") {
    offsetX = 10;
  } else if (this.direction === "DOWN") {
    offsetX = -10;
  } else if (this.direction === "LEFT") {
    offsetY = -10;
  } else if (this.direction === "RIGHT") {
    offsetY = 10;
  }
  
  bulletArray.push(new Bullet(this.x + offsetX, this.y + offsetY, this.direction));
  this.currentImg = this.shootingImg;
  this.shootTimer = 5;
}
}
