class Particle {

  constructor(x, y, hu, firework = false, chase, target) { //firework faux de base
    //particule mère ou non
    this.firework = firework;
    //opacité
    this.lifespan = 255;
    //couleur
    this.hu = hu;
    //position, direction+vitesse, accéleration
    this.pos = createVector(x, y);
    this.acc = createVector();
    this.vel = createVector();
    //si la particule suit un point
    if (chase) {
      this.chaseComplete = false;
      this.target = createVector(target.x, target.y);
    } else {
      this.chaseComplete = true;
    }
    //si c'est la particule mère elle monte vers le haut
    if (this.firework) {
      this.vel = createVector(0, -10);
    }
  }
  //change l'acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    //si la particule suit encore un point
    if (!this.chaseComplete) {
      this.applyForce(this.arrive()); //on applique la force qui la mène au point
    } else { //sinon, si c'est une particule fille on la ralenti un peu et elle disparait petit à petit
      if (!this.firework) {
        this.vel.mult(0.9);
        this.lifespan -= 2;
      }
    }
    //la velocité augmente de l'acceleration
    this.vel.add(this.acc);
    this.pos.add(this.vel); //position change selon vélocité
    this.acc.mult(0); //retour à 0 de l'acceleration
    if (this.chaseComplete == false) //si la particule suit un point on vérifie si elle l'a atteint
      this.checkChase();
  }
  //vérifie si on continu de suivre le point
  checkChase() {
    //si la distance entre le point d'arrivé est la particule est <10
    if (this.target.dist(this.pos) < 10) {
      this.chaseComplete = true; //fin de la chasse
    }
  }
  //force à appliquer pour diriger la particule vers le point ciblé
  arrive() {
    //position de la cible - position de notre particule
    let desired = p5.Vector.sub(this.target, this.pos);
    //soustrait le chemin à faire de notre vélocité actuelle
    let steer = p5.Vector.sub(desired, this.vel);
    //limite la vitesse
    steer.limit(0.2);
    return steer;
  }

  show() {
      colorMode(HSB); //mode de couleur hue, saturation, brightness
      if (!this.firework) { //particule fille
        strokeWeight(4);
        stroke(this.hu, 255, 255, this.lifespan);
      } else { //particule mère
        strokeWeight(8);
        stroke(this.hu, 255, 255);
      }
      point(this.pos.x, this.pos.y);
    
  }
  //enlève les particules quand elles ont disparues, permet d'optimiser le programme
  done() {
    if (this.lifespan <= 0) {
      return true;
    }
    return false;
  }

}