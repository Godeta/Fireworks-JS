class Firework {

  constructor() {
    //particule mère
    this.firework = new Particle(random(width), height, true);
    this.exploded = false; //la particule n'a pas explosée
    this.particules = []; //tableau de particules filles lors de l'explosion
  }

  update() {
    if (!this.exploded) {
      /*applique le vecteur gravité constamment et s'accélère, donc il finira forcément par retomber peut importe la force du lancé (plus loin il ira, plus haut sera la chute)*/
      this.firework.applyForce(gravity);
      //réactualise le vecteur et les coordonnées
      this.firework.update();

      //lorsque la particule commence à s'arrêter ou redescendre
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode(); //explosion de la particule
      }
    }
    //lorsqu'il explose
    else {
      for (let p of this.particules) { //toutes les particules du tableau
        p.applyForce(gravity); //on applique la gravité
        p.update(); //on actualise leur vecteur et position
        if (p.done() ) { //si la particule a disparue, on l'enlève
         this.particules.splice(p,1); 
        }
      }
    }
  }

  //déclenchement du feu d'artifice
  explode() {
    //création de pleins de particules filles
    for (let i = 0; i < 5; i++) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y);
      this.particules.push(p);
    }
  }

  show() {
    //affiche la particule si elle n'a pas explosée
    if (!this.exploded) {
      this.firework.show();
    } else {
      for (let p of this.particules) {
        p.show();
      }
    }
  }
  
  done() {
    //si il a explosé et il le tableau de particules est vide
    if (this.exploded && this.particules.length ==0) {
      return true;
    }
    return false;
  }
}