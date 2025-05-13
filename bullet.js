class Bullet {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = 10;
    this.size = 5;
  }

  update() {
    if (this.dir === "UP") this.y -= this.speed;
    else if (this.dir === "DOWN") this.y += this.speed;
    else if (this.dir === "LEFT") this.x -= this.speed;
    else if (this.dir === "RIGHT") this.x += this.speed;
  }

  draw() {
    fill('#333333');
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  isOffScreen() {
    return this.x < 0 || this.x > width || this.y < 0 || this.y > height;
  }
}