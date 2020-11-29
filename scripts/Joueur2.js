import {Punch1} from './Projectile.js';
import {chargeur} from "./index.js";
import {Jeu} from './Jeu.js';

export class Joueur2 extends createjs.Sprite {

  constructor(imgae) {
    super(imgae);

    this.bougerD = false;
    this.bougerG = false;
    this.vie = 10;
    this.initialiser();
  }

  initialiser() {
    console.log('player1 added');
    this.gotoAndPlay("idle");

    // this.graphics
    //   .setStrokeStyle(5, "round")
    //   .beginStroke("green")
    //   .beginFill("black")
    //   .moveTo(-50, 0)
    //   .lineTo(50, -25)
    //   .lineTo(50, 25)
    //   .lineTo(-50, 0);



    // Mise en cache pour StageGL (et performance)
    // this.cache(-52.5, -27.5, 105, 55);

    // Ajout des écouteurs de clavier
    this.ecouteurBouge = this.bouger.bind(this);
    createjs.Ticker.addEventListener('tick',  this.ecouteurBouge);
    this.ecouteurTouchePesee = this.gererTouchePesee.bind(this);
    this.ecouteurToucheRelachee = this.gererToucheRelachee.bind(this);
    window.addEventListener("keydown", this.ecouteurTouchePesee);
    window.addEventListener("keyup", this.ecouteurToucheRelachee);

    // Démarrer le mouvement dès que l'objet est placé sur la scène
    // this.on("added", this.animer.bind(this), this, true);



  }




  gererTouchePesee(e) {

    if (e.key === "6") {
      this.bougerD = true;
      this.bougerG = false;
      this.punched = false;
      this.block = true;
      //this.stop('idle');
      if(this.currentAnimation !== 'backward'){
        this.gotoAndPlay('backward');
      }

      createjs.Ticker.removeEventListener('tick', this.ecouteur);

    } else if (e.key === "4") {
      this.bougerG = true;
      this.bougerD = false;
      this.block = false;
      this.punched = false;
      //this.stop('idle');
      if(this.currentAnimation !== 'walk'){
        this.gotoAndPlay('walk');
      }
      createjs.Ticker.removeEventListener('tick', this.ecouteur);
      console.log('gauche');
    } else if(e.key === "0"){
      this.punched = false;

      //this.punch();
      console.log('hbdfa');
      this.bougerD = false;
      this.bougerG = false;
      this.ecouteur = this.hitbox.bind(this);
      window.removeEventListener('keydown', this.ecouteurTouchePesee);
      createjs.Ticker.removeEventListener('tick', this.ecouteur);







    }

  }

  hitbox(){
    console.log('framdata');

    this.punched = true;
    setTimeout( ()=> createjs.Ticker.removeEventListener('tick', this.ecouteur), 300);
    setTimeout( ()=> this.gotoAndPlay('idle'), 300);
    //console.log(this, this.cible);
    if (ndgmr.checkRectCollision(this, this.cible) && this.cible.block === false) {
      console.log('punch!');
      createjs.Ticker.removeEventListener('tick', this.ecouteur);
      this.cible.bougerG = false;
      this.cible.gotoAndPlay('hit');
      setTimeout(()=> this.cible.gotoAndPlay('idle'), 200);
      createjs.Sound.play('punchHit', {volume:0.3});

      this.cible.vie -=1;
      this.barreVie.scaleX -= 0.12;
      if(this.cible.vie <=0){
        console.log('mort');
        this.win = true;
      }
      if(this.cible.vie === 0){
        this.parent.removeChild(this.barreVie);
        this.win = true;
      }
      return
    } else if(ndgmr.checkRectCollision(this, this.cible) && this.cible.block === true){
      console.log('NOPE');
      createjs.Ticker.removeEventListener('tick', this.ecouteur);
      createjs.Sound.play('blockHit', {volume:0.3});
      this.cible.gotoAndPlay('block');
      this.cible.bougerG = false;
      return;
    }
  }

  gererToucheRelachee(e) {
    if (e.key === "6") {
      this.bougerD = false;

      this.gotoAndPlay('idle');
    } else if(e.key === "4"){
      this.bougerG = false;
      this.gotoAndPlay('idle');
    } else if(e.key === "0"){
      if(this.punched === true){
        console.log('punched');
        return;
      }
      this.block = false;
      this.gotoAndPlay("attack");
      createjs.Sound.play('punchYa', {volume:0.2});
      setTimeout(this.noPunch.bind(this), 1000);

      createjs.Ticker.addEventListener('tick', this.ecouteur);


    }
  }
  bouger(){


    if(this.bougerD === true){
      if(this.x >= 1920){
        this.x = 1920;
      }
      this.x +=6;
      this.block = true;
      setTimeout(()=> this.block = false, 100);
    }

    if(this.bougerG === true){
      if(ndgmr.checkRectCollision(this, this.cible)){
        return
      }
      this.x -=12;
      this.block = false;


    }


  }
  // animer() {
  //   this.animation = createjs.Tween
  //     .get(this, {loop: -1, bounce: true})
  //     .to({y: this.stage.canvas.height - 50}, 2500, createjs.Ease.cubicInOut);
  // }



  noPunch(){
    this.gotoAndPlay('idle');
    window.addEventListener('keydown',this.ecouteurTouchePesee);
  }


  detruire() {
    createjs.Tween.removeTweens(this);
    window.removeEventListener("keydown", this.ecouteurTouchePesee);
    window.removeEventListener("keyup", this.ecouteurToucheRelachee);
    this.parent.removeChild(this);
  }

}