export class Bloc extends createjs.Shape {

  constructor(taille = 100) {
    super();
    this.taille = taille;
    this.initialiser()
  }

  initialiser() {

    this.graphics
      .setStrokeStyle(5, "round")
      .beginStroke("green")
      .beginFill("black") // nécessaire pour la détection de collision
      .drawRect(0, 0, 50, this.taille);

    this.cache(-5, -5, 60, this.taille + 5 * 2);

  }

  detruire() {
    this.parent.removeChild(this);
  }

}
