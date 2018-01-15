const TimerFunction = require('./TimerFunction');

const renderDisplay = require('./renderDisplay');


class Timer {
  constructor(){
    this.display = timerDisplay;
    this.timer = new TimerFunction();
    this.timer.duration(this.countdown);
    this._running = false;
    this.setValue(600000); // 10 minutes
  }

  setValue(value){
    this.countdown = value;
    this.timer.duration(this.countdown);
    renderDisplay(this.display, this.countdown);
  }

  start(){
    this._running = true;
    this.timer.callback((time) => {
      renderDisplay(this.display, time);
      if(0 === time){
        this._end()
      }
    });
    this.timer.start(false);
    this.display.classList.add('animate');
  }

  stop(){
    this.timer.stop();
    this.display.classList.remove('animate');
    this._running = false;
  }

  reset(){
    this.timer.reset();
  }

  restart(){
    this.timer.reset(true);
    renderDisplay(this.display, this.countdown);
  }

  isRunning(){
    return this._running;
  }

  _end(){
    setTimeout(() => {
      this.stop();
      this.restart();
    },3000);
  }

};

module.exports = new Timer();