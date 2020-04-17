//tableau de feux d'artifices
let fireworks = [];
//gravité et un vecteur que l'on ajoute et qui sera accéléré dans particle
let gravity;

let hearts = [];
let a =0;

function setup() {
  createCanvas(800, 600);
  gravity = createVector(0, 0.2); //dirige de 0 en abscisse et +0.2 en ordonné
  //défini la couleur et taille du point
  stroke(255);
  strokeWeight(4);
  background(0); //fond noir
}

function draw() {
  background(0,80); //fond noir qui recouvre le premier fond mais avec un //peu de transparence ce qui permet de laisser des traces

  appearHeart();
  
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

function appearHeart() {
  // arrête la boucle après avoir fini le tour du cercle
  
  //nécessite un tableau hearts et la variable a =0
   translate(width/2, height/2);

  //couleur et contour
  stroke(255);
  strokeWeight(5);
  fill(150, 0, 100);
  //trace pour chaque sommet dans le tableau
  beginShape();
  for (let v of hearts) {
    vertex(v.x, v.y);
  }
  endShape();
 
  //donne la valeur des sommets
  const r = height/40;
  const x = r * 16 * pow(sin(a), 3);
  const y = -r*(13 * cos(a) - 5*cos(2*a) - 2*cos(3*a)- cos(4*a));
  hearts.push(createVector(x, y));
  
  //trace un sommet tous les 0.1
  a += 0.1;
  translate(-width / 2, -height / 2);
  
}