class Particle {

  constructor(x, y, firework = false) { //firework faux de base
    this.pos = createVector(x, y);
    //force du lancé/ propulsion
    if (firework) { //si c'est la particule mère
      this.vel = createVector(0, random(-15, -9));
    } //en dessous pour les particules filles/ après l'explosion
    else {
      this.vel = p5.Vector.random2D(); //vecteur random
      this.vel.mult(random(2,10) ); //les vecteurs n'auront pas tous la même //taille sinon cercle parfait
    } 
    this.acc = createVector(0, 0);
    this.firework = firework; //true si particule mère
    //couleur des particules filles
    this.lifespan = 255;

  }
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if(!this.firework) { //si c'est une particule fille
      this.vel.mult(0.9); //ralenti la vitesse
      this.lifespan -=4; //assombri la particule
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
  }

  show() {
    if (!this.firework) {
      strokeWeight(3);
      stroke(random(100,250),random(70,200),random(0,100),this.lifespan);
    }
    else {
      strokeWeight(5);
     stroke(255); 
    }
    point(this.pos.x, this.pos.y);
  }

  //enlève les particules quand elles ont disparues, permet d'optimiser le programme
  done() {
   if(this.lifespan <=0) {
    return true; 
   }
    return false;
  }

}