import Phaser from 'phaser';

export function toIntColor(color) {
  if (typeof color === 'number') {
    return color;
  }
  return parseInt(color.replace(/^#/, ''), 16);
}

export function toStringColor(color) {
  if (typeof color === 'string') {
    return color;
  }
  return '#' + color.toString(16).padStart(6, '0');
}

export function midpoint(p, q) {
  const line = new Phaser.Geom.Line(p.x, p.y, q.x, q.y);
  return Phaser.Geom.Line.GetMidPoint(line);
}

export function distance(p, q) {
  const dx = p.x - q.x;
  const dy = p.y - q.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function bisector(p, q) {
  const line = new Phaser.Geom.Line(p.x, p.y, q.x, q.y);
  const slope = Phaser.Geom.Line.Slope(line);
  const midpoint = Phaser.Geom.Line.GetMidPoint(line);
  const newSlope = -1 / slope;
  if (newSlope === 0) {
    return new Phaser.Geom.Line(0, midpoint.y, 65536, midpoint.y);
  } else if (isFinite(newSlope)) {
    return new Phaser.Geom.Line(0, midpoint.y - midpoint.x * newSlope, 65536, midpoint.y + (65536 - midpoint.x) * newSlope);
  } else {
    return new Phaser.Geom.Line(midpoint.x, 0, midpoint.x, 65536);
  }
}

export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
