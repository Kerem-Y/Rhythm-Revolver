class Timer {
  constructor() {
    this.countDown = 0;
    this.startTime = 0;
    this.isRunning = false;
    this.isFinished = false;
  }

  setCountDown(seconds) {
    this.countDown = seconds;
  }

  start() {
    if (!this.isRunning) {
      this.startTime = millis();
      this.isRunning = true;
      this.isFinished = false;
    }
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
      this.countDown -= (millis() - this.startTime) / 1000;
    }
  }

  restart() {
    this.stop(); // Timer'ı durdur
    this.countDown = 84; // CountDown'ı sıfırla
    this.startTime = 0; // Başlangıç zamanını sıfırla
    this.isRunning = false; // Çalışma durumunu sıfırla
    this.isFinished = false; // Bitme durumunu sıfırla
  }

  update() {
    if (this.isRunning) {
      const elapsedTime = (millis() - this.startTime) / 1000;
      if (elapsedTime >= this.countDown) {
        this.isRunning = false;
        this.isFinished = true;
        this.countDown = 0;
      }
    }
  }

  draw(_x = 0, _y = 0) {
    if (this.isRunning) {
      const elapsedTime = (millis() - this.startTime) / 1000;
      if (elapsedTime >= this.countDown) {
        this.isRunning = false;
        this.isFinished = true;
        this.countDown = 0;
      }
    }

    if (this.isRunning || this.isFinished) {
      const remainingTime = Math.max(0, this.countDown - (millis() - this.startTime) / 1000);
      const displayTime = this.formatTime(remainingTime);

      push();
      textAlign(CENTER, CENTER);
      text(displayTime, _x, _y);
      pop();
    }
  }

  formatTime(seconds) {
    if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    } else {
      return Math.ceil(seconds).toString();
    }
  }
}