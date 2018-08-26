import Phaser from 'phaser';

import { toIntColor } from './util.js';
import Config from './config.js';

const config = Config.getInstance();

export default class Grid extends Phaser.GameObjects.Graphics {
  constructor(scene) {
    super(scene, {
      lineStyle: {
        width: config.gridLineWidth,
        color: toIntColor(config.gridLineColor),
      },
    });
    scene.add.existing(this);
    this.lines = [];
  }

  createGridLines() {
    this.lines = [];
    this.createHorizontalGridLines();
    this.createVerticalGridLines();
  }

  createHorizontalGridLines() {
    const lineLength = config.fullWidth;
    const normalLength = config.fullHeight;
    const spacing = config.gridLineSpacing;
    const numLines = Math.ceil(normalLength / spacing) +
      (normalLength % spacing === 0 ? 1 : 0);

    const lines = Array(numLines)
      .fill()
      .map((e, i) => new Phaser.Geom.Line(0, i * spacing, lineLength, i * spacing));
    this.lines.push(...lines);
  }

  createVerticalGridLines() {
    const lineLength = config.fullHeight;
    const normalLength = config.fullWidth;
    const spacing = config.gridLineSpacing;
    const numLines = Math.ceil(normalLength / spacing) +
      (normalLength % spacing === 0 ? 1 : 0);

    const lines = Array(numLines)
      .fill()
      .map((e, i) => new Phaser.Geom.Line(i * spacing, 0, i * spacing, lineLength));
    this.lines.push(...lines);
  }

  draw() {
    this.clear();
    for (let line of this.lines) {
      this.strokeLineShape(line);
    }
  }
}
