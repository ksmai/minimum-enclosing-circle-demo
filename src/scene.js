import Phaser from 'phaser';

import Grid from './grid.js';
import Points from './points.js';
import MinCircle from './min-circle.js';
import Config from './config.js';
const config = Config.getInstance();

export default class Scene extends Phaser.Scene {
  constructor() {
    super({
      key: 'main',
    });
  }

  init() {
    window.addEventListener('resize', this.windowOnResize.bind(this));
    this.grid = new Grid(this);
    this.points = new Points(this);
    this.minCircle = new MinCircle(this);
    this.events.on('redrawPoints', this.onDrawMinCircle, this);
  }

  create() {
    this.windowOnResize();
    this.points.addRandomPoints(
      config.numRandomPoints,
      config.fullWidth / 4,
      config.fullWidth * 3 / 4,
      config.fullHeight / 4,
      config.fullHeight * 3 / 4,
    );
    this.points.draw();
    this.minCircle.solve(this.points.points);
  }

  update() {
  }

  render() {
  }

  windowOnResize() {
    config.fullWidth = window.innerWidth;
    config.fullHeight = window.innerHeight;
    this.sys.game.resize(config.fullWidth, config.fullHeight);
    this.grid.createGridLines();
    this.grid.draw();
  }

  onDrawMinCircle() {
    this.points.draw();
  }
}
