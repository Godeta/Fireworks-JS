class Firework {

  constructor() {
    this.hu = random(255);
    //particule mère
    let x = random(50, width-75); //abscisse
    this.firework = new Particle(x, height,this.hu, true);
    this.exploded = false; //la particule n'a pas explosée
    this.particules = []; //tableau de particules filles lors de l'explosion
    this.allArrived = false; //une fois qu'elles arrivent toutes au point de destination
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
      //vérifie que toutes les particules ont formées une lettre
      for(let p of this.particules) {
     this.allArrived = true;
     if(!p.chaseComplete) {
       this.allArrived = false;
       break;
     }
    }
      
      for (let p of this.particules) { //toutes les particules du tableau
        if(this.allArrived) {
        p.applyForce(gravity); //on applique la gravité
        }
        p.update(); //on actualise leur vecteur et position
        if (p.done() ) { //si la particule a disparue, on l'enlève
         this.particules.splice(p,1); 
        }
      }
    }
  }

  //déclenchement du feu d'artifice
  explode() {
    //position du feu d'artifice
    let x = this.firework.pos.x;
    let y = this.firework.pos.y;
    //création String contenent l'ensemble de la case du tableau letter à l'indice textCounter 
    this.letters = font.textToPoints(letter[textCounter], x, y, 150);
//pour chaque point du String
    for (let l of this.letters) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false, true, l); //particule fille (false), suivi -> true
      //on ajoute la particule qui suit l
      this.particules.push(p);
    }

    textCounter++;
    if (textCounter == letter.length) {
      textCounter = 0;
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