import Point from './point.js';

export default class Points {
  constructor(scene) {
    this.points = [];
    this.scene = scene;
  }

  addRandomPoint(xLower, xUpper, yLower, yUpper) {
    const x = Phaser.Math.FloatBetween(xLower, xUpper);
    const y = Phaser.Math.FloatBetween(yLower, yUpper);
    const point = new Point(this.scene, x, y);
    this.points.push(point);
  }

  addRandomPoints(num, xLower, xUpper, yLower, yUpper) {
    for (let i = 0; i < num; ++i) {
      this.addRandomPoint(xLower, xUpper, yLower, yUpper);
    }
  }

  draw() {
    this.points.forEach((point) => point.draw());
  }
}
