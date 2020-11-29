import {Joueur1} from './Joueur1.js';
import {Bloc} from './Bloc.js';
import {Joueur2} from './Joueur2.js';
import {Punch1} from "./Projectile.js";

export class Jeu {

  constructor() {

    // Référence au canevas dans le DOM
    this.canvas = document.querySelector("canvas");

    // Propriétés définies dans cet objet
    this.chargeur = null;
    this.stage = null;
    this.joueur1 = null;
    this.joueur2 = null;



    // Paramètres modifiable du jeu
    this.params = {
      cadence: 60,
      manifeste: "ressources/manifest.json"
    };

    this.initialiser();
    this.charger(this.lancementJeu2.bind(this));

  }

  initialiser() {

    // Ajustement du canevas à la taille de la fenêtre
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Préparation du StageGL
    this.stage = new createjs.StageGL(this.canvas);


    // Préparation du Ticker
    this.ecouteurTick = e => this.stage.update(e);
    createjs.Ticker.addEventListener("tick", this.ecouteurTick);
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.framerate = this.params.cadence;

    // Ajout d'un écouteur pour la détection de collisions


  }

  charger(fonction) {
    this.chargeur = new createjs.LoadQueue();
    this.chargeur.installPlugin(createjs.Sound);
    this.chargeur.addEventListener("complete", fonction);
    this.chargeur.addEventListener('error', this.abandonner.bind(this));
    this.chargeur.loadManifest(this.params.manifeste);
  }

  abandonner(e) {
    alert("L'élément suivant n'a pu être chargé: " + e.src);
  }

  lancementJeu2(){
    createjs.Sound.stop();
   this.stage.removeAllChildren();
    this.fond = new createjs.Bitmap(this.chargeur.getResult("wall"));
    this.fond.scale /=2.5;
    this.fond.scaleX +=0.25;
    this.fond.scaleY +=0.08;
    this.fond.x -=350;
    this.stage.addChild(this.fond);

    this.creditSong = new createjs.Text("Crédits: Arcade Music Tribute. Droits réservé à qui de droits.", "25px Arial " , "white");
    this.creditSong.cache(0,0, this.creditSong.getBounds().width, this.creditSong.getBounds().height);
    this.creditSong.x = 0;
    this.creditSong.y = this.stage.canvas.height-50;
    this.stage.addChild(this.creditSong);

    this.title = new createjs.Bitmap(this.chargeur.getResult("title"));
    this.title.scale *=2;
    this.title.scaleY *=1.5;
    this.title.x = this.stage.canvas.width/2- this.title.getBounds().width;
    this.title.y = 5;
    this.stage.addChild(this.title);

    createjs.Tween
        .get(this.title)
        .to({y:100}, 1500, createjs.Ease.cubicIn);

    this.jouerBox = new createjs.Bitmap(this.chargeur.getResult("barreCont"));
    this.jouerBox.x = this.stage.canvas.width/2- this.jouerBox.getBounds().width;
    this.jouerBox.scaleX += 2.5;
    this.jouerBox.scaleY -= 0.8;
    this.jouerBox.y = 250;
    this.stage.addChild(this.jouerBox);

    this.jouer = new createjs.Text("Jouer", "75px Arial " , "orange");
    this.jouer.cache(0,0, this.jouer.getBounds().width, this.jouer.getBounds().height);
    this.jouer.x = this.jouerBox.x+25;
    this.jouer.y =275;
    this.jouer.alpha =0;
    this.stage.addChild(this.jouer);

    this.InstruBox = new createjs.Bitmap(this.chargeur.getResult("barreCont"));
    this.InstruBox.x = this.stage.canvas.width/2- this.InstruBox.getBounds().width-85;
    this.InstruBox.scaleX += 5;
    this.InstruBox.scaleY -= 0.8;
    this.InstruBox.y = 400;
    this.stage.addChild(this.InstruBox);

    this.instru = new createjs.Text("Instructions", "75px Arial " , "orange");
    this.instru.cache(0,0, this.instru.getBounds().width, this.instru.getBounds().height);
    this.instru.x = this.InstruBox.x+25;
    this.instru.y =425;
    this.instru.alpha =0;
    this.stage.addChild(this.instru);

    this.left = new createjs.Bitmap(this.chargeur.getResult("left"));
    this.left.x = this.stage.canvas.width/2- this.left.getBounds().width;
    this.left.scale /=2;
    this.left.y = 250;
    this.left.x  = this.jouerBox.x+ this.left.getBounds().width+50;
    this.left.alpha = 0;
    this.stage.addChild(this.left);

    this.right = new createjs.Bitmap(this.chargeur.getResult("left"));
    this.right.x = this.stage.canvas.width/2- this.right.getBounds().width;
    this.right.scale /=2;
    this.right.y = 515;
    this.right.x  = this.jouerBox.x+ this.right.getBounds().width+250;
    this.right.rotation = 180;
    this.right.alpha = 0;
    this.stage.addChild(this.right);




setTimeout(()=>this.jouer.alpha =1, 1500);
setTimeout(()=>this.instru.alpha =1, 1500);
setTimeout(()=>this.left.alpha =1, 1500);
setTimeout(()=>this.right.alpha =1, 1500);



    setTimeout(this.lancementJeu.bind(this), 1500);
  }

  lancementJeu(){
    createjs.Sound.stop();
    createjs.Sound.play('intro', {volume:0.1, loop: -1});


    this.ecouteurTouchePesee = this.gererTouchePesee.bind(this);


    window.addEventListener("keydown", this.ecouteurTouchePesee);




  }

  gererTouchePesee(e){

    if(e.key === "a"){
      console.log('lancer!');
      this.debuter();
      window.removeEventListener('keydown', this.ecouteurTouchePesee);
    } else if(e.key === "d"){
      console.log('instru!');
      this.instruMenu();
    }

  }

  gererTouchePesee2(e){

    if(e.key === "a"){
      console.log('lancer!');
      this.debuter();
      window.removeEventListener('keydown', this.ecouteurTouchePesee2);
    }

  }

  instruMenu(){
    console.log('entered');
    this.stage.removeChild(this.instru, this.InstruBox, this.right);
    window.removeEventListener('keydown', this.ecouteurTouchePesee);

    this.jouerBox.x = this.stage.canvas.width-400;
    this.jouerBox.y = this.stage.canvas.height-200;
    this.jouer.x = this.jouerBox.x+30;
    this.jouer.y = this.jouerBox.y+30;

    this.left.x = this.jouerBox.x+ this.jouerBox.getBounds().width+180;
    this.left.y = this.jouerBox.y;

    this.InstruBox = new createjs.Bitmap(this.chargeur.getResult("barreCont"));
    this.InstruBox.x = this.stage.canvas.width/2- this.InstruBox.getBounds().width-500;
    this.InstruBox.scaleX = 15;
    this.InstruBox.scaleY = 0.9;
    this.InstruBox.y = 300;
    this.stage.addChild(this.InstruBox);

    this.instruTitle = new createjs.Text("Instructions", "80px Arial " , "orange");
    this.instruTitle.cache(0,0, this.instruTitle.getBounds().width, this.instruTitle.getBounds().height);
    this.instruTitle.x = this.InstruBox.x+325;
    this.instruTitle.y =325;
    this.stage.addChild(this.instruTitle);
    this.instruTitle = new createjs.Text("Instructions", "80px Arial " , "orange");
    this.instruTitle.cache(0,0, this.instruTitle.getBounds().width, this.instruTitle.getBounds().height);
    this.instruTitle.x = this.InstruBox.x+325;
    this.instruTitle.y =325;
    this.stage.addChild(this.instruTitle);


    this.instruText = new createjs.Text("Pour vous deplacer utiliser les touches correspondantes", "25px Arial " , "orange");
    this.instruText.cache(0,0, this.instruText.getBounds().width, this.instruText.getBounds().height);
    this.instruText.x = this.InstruBox.x+150;
    this.instruText.y =425;
    this.stage.addChild(this.instruText);

    this.instruText2 = new createjs.Text("Pour attaquer, utiliser la touche d'attaque", "25px Arial " , "orange");
    this.instruText2.cache(0,0, this.instruText2.getBounds().width, this.instruText2.getBounds().height);
    this.instruText2.x = this.InstruBox.x+150;
    this.instruText2.y =515;
    this.stage.addChild(this.instruText2);

    this.attack = new createjs.Bitmap(this.chargeur.getResult("boom"));
    this.attack.x = this.stage.canvas.width/2- this.attack.getBounds().width;
    this.attack.scale /=4;
    this.attack.y = this.instruText2.y-10;
    this.attack.x  = this.instruText.x+ this.instruText.getBounds().width+500;
    this.stage.addChild(this.attack);

    this.left2 = new createjs.Bitmap(this.chargeur.getResult("left"));
    this.left2.x = this.stage.canvas.width/2- this.left2.getBounds().width;
    this.left2.scale /=4;
    this.left2.y = this.instruText.y-15;
    this.left2.x  = this.instruText.x+ this.instruText.getBounds().width+650;
    this.stage.addChild(this.left2);

    this.right2 = new createjs.Bitmap(this.chargeur.getResult("left"));
    this.right2.x = this.stage.canvas.width/2- this.right2.getBounds().width;
    this.right2.scale /=4;
    this.right2.y = this.instruText.y+50;
    this.right2.x  = this.instruText.x+ this.instruText.getBounds().width+810;
    this.right2.rotation = 180;
    this.stage.addChild(this.right2);




    this.ecouteurTouchePesee2 = this.gererTouchePesee2.bind(this);
    window.addEventListener("keydown", this.ecouteurTouchePesee2);


  }

  debuter() {

    createjs.Sound.stop();
    createjs.Sound.play('fightMusic', {volume:0.05});
    this.stage.removeAllChildren();
    this.fond = new createjs.Bitmap(this.chargeur.getResult("wall"));
    this.fond.scale /=2.5;
    this.fond.scaleX +=0.25;
    this.fond.scaleY +=0.08;
    this.fond.x -=350;
    this.stage.addChild(this.fond);


    this.timerBox = new createjs.Bitmap(this.chargeur.getResult("barreCont"));
    this.timerBox.x = this.stage.canvas.width/2-85;
    this.timerBox.scaleX += 1.5;
    this.timerBox.scaleY -= 0.8;
    this.timerBox.y =30;
    this.stage.addChild(this.timerBox);

    this.timer = new createjs.Text("00", "100px Arial " , "white");
    this.timer.cache(0,0, this.timer.getBounds().width, this.timer.getBounds().height);
    this.timer.x = this.stage.canvas.width/2-50;
    this.timer.y =50;
    this.stage.addChild(this.timer);

    this.timer.text = 99;
    parseInt(this.timer.text);
    this.timer.updateCache();

    this.timerTime = setInterval(this.ajusterTimer.bind(this), 1000);




    // Création et ajout de l'attaquant
    this.joueur1 = new Joueur1(this.chargeur.getResult('Joueur1'));
    this.joueur1.x = 200;
    this.joueur1.y = this.canvas.height - 50;
    this.joueur1.scaleX =2.8;
    this.joueur1.scaleY =2.5;
    this.stage.addChild(this.joueur1);
    this.joueur1.addEventListener('tire', this.ajusterPointsAttaque.bind(this));


    // Création et ajout du défenseur
    this.joueur2 = new Joueur2(this.chargeur.getResult('Joueur2'));
    this.joueur2.x = this.canvas.width-500;
    this.joueur2.y = this.canvas.height - 250;
    this.joueur2.scaleX =2.8;
    this.joueur2.scaleY =2.5;
    this.joueur2.scaleX = -2.8;
    this.stage.addChild(this.joueur2);



    this.joueur1.cible = this.joueur2;
    this.joueur2.cible = this.joueur1;
    this.joueur1.block = false;
    this.joueur2.block = false;



    this.joueur1.win = false;
    this.joueur2.win = false;

    this.gameOverTick = this.winner.bind(this);

    createjs.Ticker.addEventListener("tick",  this.gameOverTick);



    this.barreCont1 = new createjs.Bitmap(this.chargeur.getResult("barreCont"));
    this.barreCont1.x = this.stage.canvas.width/2 -200;
    this.barreCont1.y = 65;
    this.barreCont1.rotation =90;
    this.barreCont1.scale -= 0.2;
    this.barreCont1.scaleY +=0.3;
    this.stage.addChild(this.barreCont1);

    this.barreVie1 = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
    this.barreVie1.x = 755;
    this.barreVie1.regX = this.barreVie1.getBounds().width;
    //this.barreVie1.regY = 50;
    this.barreVie1.y = 73;

    //this.barreVie1.scaleX = ;
    this.barreVie1.scale -= 0.2;
    this.barreVie1.scaleX += 0.32;
    this.barreVie1.scaleY +=0.1;
    this.stage.addChild(this.barreVie1);
    this.barreVie1.addEventListener('click', ()=> this.barreVie1.scaleX -= 0.12);


    this.barreCont2 = new createjs.Bitmap(this.chargeur.getResult("barreCont"));
    this.barreCont2.x = this.stage.canvas.width-50;
    this.barreCont2.y = 65;
    this.barreCont2.rotation =90;
    this.barreCont2.scale -= 0.2;
    this.barreCont2.scaleY +=0.3;
    this.stage.addChild(this.barreCont2);

    this.barreVie2 = new createjs.Bitmap(this.chargeur.getResult('barreVie'));
    this.barreVie2.x = this.stage.canvas.width- this.barreVie2.getBounds().width-130;
    this.barreVie2.regX = this.barreVie2.getBounds().width;
    this.barreVie2.regY = 50;
    this.barreVie2.y = 75;

    this.barreVie2.rotation = 180;
    this.barreVie2.scale -= 0.2;
    this.barreVie2.scaleX += 0.32;
    this.barreVie2.scaleY +=0.1;
    this.stage.addChild(this.barreVie2);
    this.barreVie2.addEventListener('click', ()=> this.barreVie2.scaleX -= 0.12);


    this.joueur1.barreVie = this.barreVie2;
    this.joueur2.barreVie = this.barreVie1;


  }

  winner(){

    if(this.joueur1.win ===true){
      this.gameOver();
      this.winnerPop = new createjs.Text("Joueur 1 a gagné", "100px Arial " , "cyan");
      this.winnerPop.cache(0,0, this.winnerPop.getBounds().width, this.winnerPop.getBounds().height);
      this.winnerPop.x = 450;
      this.winnerPop.y = 250;
      this.stage.addChild(this.winnerPop);
      return;

    } else if(this.joueur2.win === true){
      this.gameOver();
      this.winnerPop = new createjs.Text("Joueur 2 a gagné", "100px Arial " , "cyan");
      this.winnerPop.cache(0,0, this.winnerPop.getBounds().width, this.winnerPop.getBounds().height);
      this.winnerPop.x = 450;
      this.winnerPop.y = 250;
      this.stage.addChild(this.winnerPop);
      return;


    }
  }






   ajusterTimer() {
    if(this.timer.text <= 0){
      console.log('fini');
      clearInterval(this.timerTime);
      if(this.joueur1.vie > this.joueur2.vie){
        this.joueur1.win =true;
      } else if(this.joueur1.vie < this.joueur2.vie){
        this.joueur2.win = true;
      } else if(this.joueur1.vie === this.joueur2.vie){
        this.winnerPop = new createjs.Text("Égalité", "100px Arial " , "cyan");
        this.winnerPop.cache(0,0, this.winnerPop.getBounds().width, this.winnerPop.getBounds().height);
        this.winnerPop.x = 450;
        this.winnerPop.y = 250;
        this.stage.addChild(this.winnerPop);
        this.gameOver();
      }
      return
    }
    if(this.timer.text <=10){
      this.timer.text -=1;
      this.timer.text = "0" + parseInt(this.timer.text);
      this.timer.updateCache();
    } else if (this.timer.text >10) {
      this.timer.text -= 1;
      this.timer.text = parseInt(this.timer.text);
      this.timer.updateCache();
    }

  }

  ajusterPointsAttaque() {
    console.log('ouch!');
    this.pointsAttaque.text = parseInt(this.pointsAttaque.text) + 1;
    this.pointsAttaque.updateCache();
  }

  ajusterPointsDef() {
    console.log('ouch2!');
    this.pointsDefenseur.text = parseInt(this.pointsDefenseur.text) + 1;
    this.pointsDefenseur.updateCache();
  }

  gameOver(){

    setTimeout(this.lancementJeu2.bind(this), 3000);
    console.log('fini2');
    this.joueur1.stop();
    this.joueur2.stop();
   window.removeEventListener("keydown", this.joueur1.ecouteurTouchePesee);
   window.removeEventListener("keyup", this.joueur1.ecouteurToucheRelachee);
   window.removeEventListener("keyup", this.joueur2.ecouteurToucheRelachee);
   window.removeEventListener("keydown", this.joueur2.ecouteurTouchePesee);
   createjs.Ticker.removeEventListener("tick", this.joueur1.ecouteurBouge);
   createjs.Ticker.removeEventListener("tick", this.joueur2.ecouteurBouge);
   clearInterval(this.timerTime);



    createjs.Ticker.removeEventListener("tick", this.gameOverTick);

  }



}
