class Enemy {
  constructor(direction, speed, img) {
    this.direction = direction;
    this.speed = speed;
    this.size = 160;
    this.img = img;

    // Başlangıç
    if (direction === "UP") {
      this.x = width / 2;
      this.y = 0 - this.size;
    } else if (direction === "DOWN") {
      this.x = width / 2;
      this.y = height + this.size;
    } else if (direction === "LEFT") {
      this.x = 0 - this.size;
      this.y = height / 2;
    } else if (direction === "RIGHT") {
      this.x = width + this.size;
      this.y = height / 2;
    }

    this.targetX = width / 2;
    this.targetY = height / 2;
  }

  update() {
    let dx = this.targetX - this.x;
    let dy = this.targetY - this.y;
    let angle = atan2(dy, dx);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }
  
  isNearPlayer() {
  let d = dist(this.x, this.y, this.targetX, this.targetY);
  return d < this.size / 2;
}

draw() {
  push();
  translate(this.x, this.y);

  let dx = this.targetX - this.x;
  let dy = this.targetY - this.y;
  let angle = atan2(dy, dx);

  rotate(angle + HALF_PI); 

  imageMode(CENTER);
  image(this.img, 0, 0, this.size, this.size);

  pop();
}
}