export class StopWatch {
  constructor(counter = 100) {
    this.repeatCount = counter;
    this.counter = counter;
    this.time = NaN;
    this.results = [];
  }

  start() {
    if (this.counter < 0) return;
    this.time = Date.now();
  }

  stop() {
    if (this.counter < 0) return;
    const startTime = this.time ? this.time : 0;
    const endTime = Date.now();
    const delta = endTime - startTime;
    console.log(`${delta} (${this.counter})`);

    this.results.push(delta);
    this.counter--;
    this.time = NaN;

    if (this.counter === -1) {
      const total = this.results.reduce((a, b) => (a + b)); 
      const average = total / this.repeatCount;
      console.log(`average : ${average}`);
    }
  }
}