import Phaser from 'phaser';

import Scene from './scene.js';
import Config from './config.js';
const config = Config.getInstance();

export default class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      parent: document.getElementById(config.parentId),
      title: config.title,
      version: config.version,
      url: config.url,
      width: config.fullWidth,
      height: config.fullHeight,
      scene: [Scene],
      backgroundColor: config.backgroundColor,
    });
  }
}
