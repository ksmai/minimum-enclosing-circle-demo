import Phaser from 'phaser';

import { toIntColor, midpoint, distance, bisector } from './util.js';
import Config from './config.js';

const config = Config.getInstance();

export default class MinCircle extends Phaser.GameObjects.Graphics {
  constructor(scene) {
    super(scene, {
      lineStyle: {
        width: config.circleLineWidth,
        color: toIntColor(config.circleColor),
      },
    });
    scene.add.existing(this);
    this.circle = new Phaser.Geom.Circle(0, 0, 0);
  }

  solve(points) {
    this.circle = this.welzl(points);
    this.draw();
  }

  welzl(points, boundaryPoints = []) {
    if (points.length === 0 || boundaryPoints.length >= 3) {
      if (boundaryPoints.length === 0) {
        const circle = new Phaser.Geom.Circle(0, 0, 0);
        return circle;
      } if (boundaryPoints.length === 1) {
        const [p] = boundaryPoints;
        const circle = new Phaser.Geom.Circle(p.x, p.y, 0);
        return circle;
      } else if (boundaryPoints.length === 2) {
        const [p, q] = boundaryPoints;
        const center = midpoint(p, q);
        const diameter = distance(p, q);
        const circle = new Phaser.Geom.Circle(center.x, center.y, diameter / 2);
        return circle;
      } else {
        const [p, q, r, ...otherBoundaryPoints] = boundaryPoints;
        const diameter1 = bisector(p, q);
        const diameter2 = bisector(q, r);
        const center = new Phaser.Geom.Point();
        Phaser.Geom.Intersects.LineToLine(diameter1, diameter2, center);
        const radius = distance(p, center);
        const circle = new Phaser.Geom.Circle(center.x, center.y, radius);
        otherBoundaryPoints.forEach((point) => {
          if (!Phaser.Geom.Circle.ContainsPoint(circle, point)) {
            throw new Error('Boundary points are not co-circular');
          }
        });
        return circle;
      }
    }

    const i = Math.floor(Math.random() * points.length);
    const reducedPoints = points.slice(0, i).concat(points.slice(i + 1));
    const d = this.welzl(reducedPoints, boundaryPoints);
    if (Phaser.Geom.Circle.ContainsPoint(d, points[i])) {
      return d;
    }
    return this.welzl(reducedPoints, boundaryPoints.concat(points[i]));
  }

  draw() {
console.log('draw', this.circle);
    this.clear();
    this.strokeCircleShape(this.circle);
  }
}
