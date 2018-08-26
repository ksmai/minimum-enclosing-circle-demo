import Phaser from 'phaser';

import { toIntColor } from './util.js';
import Config from './config.js';

const config = Config.getInstance();

const TYPE_NORMAL = 'normal';
const TYPE_ACTIVE = 'active';
const TYPE_BOUNDARY = 'boundary';
const TYPE_INACTIVE = 'inactive';

export default class Point extends Phaser.GameObjects.Graphics {
  constructor(scene, x, y) {
    super(scene);
    scene.add.existing(this);
    this.point = new Phaser.Geom.Point(x, y);
    this.setNormal();
  }

  setNormal() {
    this.type = TYPE_NORMAL;
  }

  setActive() {
    this.type = TYPE_ACTIVE;
  }

  setInactive() {
    this.type = TYPE_INACTIVE;
  }

  setBoundary() {
    this.type = TYPE_BOUNDARY;
  }

  draw() {
    this.clear();
    switch (this.type) {
      case TYPE_ACTIVE:
        this.fillStyle(toIntColor(config.pointActiveColor), config.pointAlpha);
        this.lineStyle(config.pointLineWidth, toIntColor(config.pointActiveColor), 1);
        break;
      case TYPE_NORMAL:
        this.fillStyle(0xffffff, config.pointAlpha);
        this.lineStyle(config.pointLineWidth, toIntColor(config.pointNormalColor), 1);
        break;
      case TYPE_INACTIVE:
        this.fillStyle(toIntColor(config.pointInactiveColor), config.pointAlpha);
        this.lineStyle(config.pointLineWidth, toIntColor(config.pointInactiveColor), 1);
        break;
      case TYPE_BOUNDARY:
        this.fillStyle(toIntColor(config.pointBoundaryColor), config.pointAlpha);
        this.lineStyle(config.pointLineWidth, toIntColor(config.pointBoundaryColor), 1);
        break;
    }
    this.fillCircle(this.point.x, this.point.y, config.pointSize);
    this.strokeCircle(this.point.x, this.point.y, config.pointSize);
  }
}
