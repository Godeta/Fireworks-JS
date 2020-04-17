//tableau de feux d'artifices
let fireworks = [];
//gravité et un vecteur que l'on ajoute et qui sera accéléré dans particle
let gravity;

function setup() {
  createCanvas(800, 600);
  gravity = createVector(0, 0.2); //dirige de 0 en abscisse et +0.2 en ordonné
  //défini la couleur et taille du point
  stroke(255);
  strokeWeight(4);
  background(0); //fond noir
}

function draw() {
  background(0,25); //fond noir qui recouvre le premier fond mais avec un //peu de transparence ce qui permet de laisser des traces

  //ajoute des feux d'artifices au tableau 1/10 pour chaque frame
  if (random(1) < 0.1) {
    fireworks.push(new Firework());
  }

  //parcours de la fin au début car on retire des objets
  for (let i = fireworks.length-1; i >=0 ; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done() ) {
     fireworks.splice(i,1); 
    }
  }
console.log(fireworks.length); //affiche le nombre de feux d'artifices
}