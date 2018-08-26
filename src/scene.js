import Phaser from 'phaser';

import Grid from './grid.js';
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
    //this.initPoints();
  }

  create() {
    this.windowOnResize();
    //this.drawPoints();
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
}
