import Phaser from 'phaser';

import { toIntColor } from './util.js';
import Config from './config.js';

const config = Config.getInstance();

const TYPE_NORMAL = 'normal';

export default class Point extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y) {
    super(scene, {
      fillStyle: {
        alpha: config.pointAlpha,
        color: toIntColor(config.pointNormalColor),
      },
      lineStyle: {
        width: config.pointLineWidth,
        color: toIntColor(config.pointNormalColor),
      },
    });
    scene.add.existing(this);
    this.point = new Phaser.Geom.Point(x, y);
    this.type = TYPE_NORMAL;
  }

  draw() {
    switch (this.type) {
      case TYPE_NORMAL:
        break;
    }
    this.clear();
    this.fillCircle(this.point.x, this.point.y, config.pointSize);
    this.strokeCircle(this.point.x, this.point.y, config.pointSize);
  }
}
