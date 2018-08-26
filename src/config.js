class Config {
  static _instance;

  static getInstance() {
    if (!Config._instance) {
      Config._instance = new Config();
    }
    return Config._instance;
  }

  constructor() {
    this.parentId = 'app';
    this.title = 'Minimum Enclosing Circle Demo';
    this.version = 'v1.0.0';
    this.url = 'https://ksmai.github.io/minimum-enclosing-circle-demo';
    this.fullWidth = window.innerWidth;
    this.fullHeight = window.innerHeight;
    this.colors = [
      '#181818',
      '#282828',
      '#383838',
      '#585858',
      '#b8b8b8',
      '#d8d8d8',
      '#e8e8e8',
      '#f8f8f8',
      '#ab4642',
      '#dc9656',
      '#f7ca88',
      '#a1b56c',
      '#86c1b9',
      '#7cafc2',
      '#ba8baf',
      '#a16946',
    ];
    this.backgroundColor = this.colors[0];
    this.gridLineColor = this.colors[1];
    this.gridLineWidth = 2;
    this.gridLineSpacing = 50;
    this.pointNormalColor = this.colors[7];
    this.pointSize = 8;
    this.pointAlpha = 0.5;
    this.pointLineWidth = 2;
    const numInputMatches = window.location.href.match(/[?&]n=(\d+)/);
    if (numInputMatches && numInputMatches[1]) {
      this.numRandomPoints = parseInt(numInputMatches[1]);
    } else {
      this.numRandomPoints = 20;
    }
    this.circleColor  = this.colors[6];
    this.circleLineWidth = 4;
    const animationMatches = window.location.href.match(/[?&]auto=(\d+)/);
    if (animationMatches && animationMatches[0]) {
      this.animated = true;
      this.animationInterval = parseInt(animationMatches[0]);
    } else {
      this.animated = false;
      this.animationInterval = 0;
    }
  }
}

export default Config;
