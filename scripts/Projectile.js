import {Jeu} from "./Jeu.js";
import {chargeur} from "./index.js";

export class Punch1 extends createjs.Bitmap {

  constructor(cible) {
    super(chargeur.getResult('punch1'));
    this.cible = cible;
    this.initialiser();
    this.alpha = 0.2;
  }

  initialiser() {


    // Démarrer le mouvement dès que l'objet est placé sur la scène avec addChild()
    this.addEventListener("added", this.animer.bind(this))


  }

  animer() {
    if (ndgmr.checkRectCollision(this, this.cible)) {
        this.cible.alpha = 0.5;
        setTimeout(()=>this.cible.alpha = 1, 1000);


      }

      setTimeout(this.detruire.bind(this), 48);


  }

  delayForce(){

  }

  detruire() {
    this.removeAllEventListeners();
    this.parent.removeChild(this);
  }

}