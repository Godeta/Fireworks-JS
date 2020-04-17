class Particle {
  
  constructor(x, y, firework = false) { //firework faux de base
    this.pos = createVector(x, y);
    //force du lancé/ propulsion
    if (firework) { //si c'est la particule mère
      this.vel = createVector(0, random(-15, -9));
    } //en dessous pour les particules filles/ après l'explosion
    else {
      this.vel = p5.Vector.random2D(); //vecteur random
      this.vel.mult(random(2,50) ); //les vecteurs n'auront pas tous la même //taille sinon cercle parfait
    } 
    this.acc = createVector(0, 0);
    this.firework = firework; //true si particule mère
    //couleur des particules filles
    this.lifespan = 255;
    
    let tabImg = []; //tableau avec toutes les images
    tabImg[0] = loadImage("img/paul_conf2.png");
    tabImg[1] = loadImage("img/paulBG.png");
    tabImg[2] = loadImage("img/titouan1.png");
    //l'image de la particule est une image random du tableau
    this.img = random(tabImg); 
    //taille des filles qui augmentent
    this.s =20;

  }
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if(!this.firework) { //si c'est une particule fille
      this.vel.mult(0.8); //ralenti la vitesse
      this.lifespan -=4; //assombri la particule
      this.s++; //augmente la taille des images filles
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
  }

  show() {
    if (!this.firework) {
      image(this.img,this.pos.x,this.pos.y,this.s,this.s);
    }
    else {
      image(this.img,this.pos.x,this.pos.y,50,50);
    }
    
  }

  //enlève les particules quand elles ont disparues, permet d'optimiser le programme
  done() {
   if(this.lifespan <=0) {
    return true; 
   }
    return false;
  }

}