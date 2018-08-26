import Phaser from 'phaser';

import { toIntColor, midpoint, distance, bisector, sleep } from './util.js';
import Config from './config.js';

const config = Config.getInstance();

export default class MinCircle extends Phaser.GameObjects.Graphics {
  constructor(scene) {
    super(scene);
    scene.add.existing(this);
    this.circle = new Phaser.Geom.Circle(0, 0, 0);
    scene.input.on('pointerup', () => this.onClick());
    scene.input.keyboard.on('keyup_SPACE', () => this.onClick());
  }

  async solve(points) {
    this.done = false;
    await this.sleep();
    this.circle = await this.welzl(points);
    this.done = true;
    this.draw();
  }

  async welzl(points, boundaryPoints = []) {
    if (points.length === 0 || boundaryPoints.length >= 3) {
      if (boundaryPoints.length === 0) {
        const circle = new Phaser.Geom.Circle(0, 0, 0);
        this.circle = circle;
        return circle;
      } if (boundaryPoints.length === 1) {
        const [{ point: p }] = boundaryPoints;
        const circle = new Phaser.Geom.Circle(p.x, p.y, 0);
        this.circle = circle;
        return circle;
      } else if (boundaryPoints.length === 2) {
        const [{ point: p }, { point: q }] = boundaryPoints;
        const center = midpoint(p, q);
        const diameter = distance(p, q);
        const circle = new Phaser.Geom.Circle(center.x, center.y, diameter / 2);
        this.circle = circle;
        this.draw();
        return circle;
      } else {
        const [{ point: p }, { point: q }, { point: r }, ...otherBoundaryPoints] = boundaryPoints;
        const diameter1 = bisector(p, q);
        const diameter2 = bisector(q, r);
        const center = new Phaser.Geom.Point();
        Phaser.Geom.Intersects.LineToLine(diameter1, diameter2, center);
        const radius = distance(p, center);
        const circle = new Phaser.Geom.Circle(center.x, center.y, radius);
        otherBoundaryPoints.forEach((point) => {
          if (!Phaser.Geom.Circle.ContainsPoint(circle, point.point)) {
            throw new Error('Boundary points are not co-circular');
          }
        });
        this.circle = circle;
        this.draw();
        return circle;
      }
    }

    const i = Math.floor(Math.random() * points.length);
    const removedPoint = points[i];
    const reducedPoints = points.slice(0, i).concat(points.slice(i + 1));
    removedPoint.setInactive();
    this.draw();
    const d = await this.welzl(reducedPoints, boundaryPoints);
    removedPoint.setActive();
    this.draw();
    await this.sleep();
    if (Phaser.Geom.Circle.ContainsPoint(d, removedPoint.point)) {
      removedPoint.setNormal();
      this.draw();
      await this.sleep();
      return d;
    }
    reducedPoints.forEach((point) => point.setNormal());
    removedPoint.setBoundary();
    boundaryPoints.forEach((point) => point.setBoundary());
    this.draw();
    await this.sleep();
    return await this.welzl(reducedPoints, boundaryPoints.concat(removedPoint));
  }

  draw() {
    this.clear();
    if (this.done) {
      this.lineStyle(config.circleLineWidth, toIntColor(config.circleColor), 1);
    } else {
      this.lineStyle(config.circleLineWidth, toIntColor(config.circleColor), config.circlePartialAlpha);
    }
    this.strokeCircleShape(this.circle);
    this.scene.events.emit('redrawPoints');
  }

  sleep() {
    if (config.animated) {
      return sleep(config.animationInterval);
    } else {
      return this.waitForClick();
    }
  }

  waitForClick() {
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }

  onClick() {
    if (this.resolve) {
      this.resolve();
      this.resolve = null;
    }
  }
}
