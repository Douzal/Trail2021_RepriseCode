// Etape 1 - Sélectionner nos éléments
let form = document.querySelector('#formulaire');
let inputPrix = document.querySelector('#prix');
let instructions = document.querySelector('#instructions');
let textDdanger = document.querySelector('.text-danger');

// Etape 2 - Cacher l'erreur
textDdanger.hidden = true;

// Etape 3 - Générer un nombre aléatoire
let findMe;

// Etape 4 - Vérifier que l'utilisateur donne bien un nombre
do {
    console.log(inputPrix.textContent);
    //  = randomIntFromInterval(0,10);
} while(isNan(inputPrix.textContent))

// Etape 5 - Agir à l'envoi du formulaire

// Etape 6 - Créer la fonction vérifier


// get random
let randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


// exercice classes
class Animal {
    constructor(nombrePattes, poids) {
        this.nombrePattes = nombrePattes;
        this.poids = poids;
    }

    presentation() {
        console.log('Je suis un animal possédant '+this.nombrePattes+' pattes, pour un poids de '+this.poids+'.');
    }
}


class Oiseau extends Animal {
    constructor(longueurAiles) {
        this.longueurAiles = longueurAiles;
    }

    voler() {
        console.log('l\'oiseau vole');
    }
}



  
  

  