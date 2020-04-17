//tableau de feux d'artifices
let fireworks = [];
//gravité et un vecteur que l'on ajoute et qui sera accéléré dans particle
let gravity;
//tableau contenant le texte à afficher
let letter = ['Arnaud', 'GODET', 'Trop', 'Fort', 'Titou', 'Lpb', 'T', 'R', 'A', 'I', 'N'];
//compte l'avancée dans le tableau
let textCounter = 0;

function preload() {
  font = loadFont('Montserrat-Regular.ttf');
}

function setup() {
  createCanvas(800, 600);
  gravity = createVector(0, 0.2); //dirige de 0 en abscisse et +0.2 en ordonné
  colorMode(HSB);
  //ajoute un feu d'artifice
  addFirework();
  //créer une boucle qui lance la fonction toutes les 2s
  setInterval(addFirework, 2000);
}

function draw() {
  colorMode(RGB);
  background(0, 25); //fond noir qui recouvre le premier fond mais avec un //peu de transparence ce qui permet de laisser des traces
  allumeLeFeu();
}

//affiche les firework et les enlèves une fois fini
function allumeLeFeu() {
  //parcours de la fin au début car on retire des objets
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].show();
    if (fireworks[i].done()) {
      fireworks.splice(i, 1);
    }
  }
  console.log(fireworks.length); //affiche le nombre de feux d'artifices
}

//ajoute un feu d'artifice
function addFirework() {
  fireworks.push(new Firework());
}