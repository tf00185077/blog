export default class MouseTracker {
  private mouseX = 0;
  private mouseY = 0;
  private readonly windowHalfX = window.innerWidth / 2;
  private readonly windowHalfY = window.innerHeight / 2;
  private readonly maxRotationX = 30 * (Math.PI / 180);
  private readonly maxRotationY = 50 * (Math.PI / 180);

  constructor() {
      this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
      document.addEventListener('mousemove', this.onDocumentMouseMove);
  }

  private onDocumentMouseMove(event: MouseEvent) {
      this.mouseX = (event.clientX - this.windowHalfX) / this.windowHalfX;
      this.mouseY = (event.clientY - this.windowHalfY) / this.windowHalfY;
  }

  public getRotation() {
      return {
          x: this.mouseY * this.maxRotationX,
          y: this.mouseX * this.maxRotationY
      };
  }

  public dispose() {
      document.removeEventListener('mousemove', this.onDocumentMouseMove);
  }
}