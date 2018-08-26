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

