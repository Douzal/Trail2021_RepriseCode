// Etape 1 - Sélectionner nos éléments
let input = document.querySelector('#prix');
let error = document.querySelector('.text-danger');
let formulaire = document.querySelector('#formulaire');
let btnDeviner = document.querySelector('.btn.btn-primary');
let instructions = document.querySelector('#instructions');

// Etape 2 - Cacher l'erreur
// error.hidden = true;
error.style.display = 'none';

// Etape 3 - Générer un nombre aléatoire
let numberToFind = getRandom(0,10);
console.log('numberToFind :', numberToFind);

// Etape 4 - Vérifier que l'utilisateur donne bien un nombre
// btnDeviner.addEventListener('keyup', validInput
//     );
btnDeviner.addEventListener("click", myFunction);

function myFunction() {
    btnDeviner.innerHTML = "Hello World";
}

// do {
    //     textDanger.hidden = false;
    // } while (isNaN(prix))
    
    // textDanger.hidden = true;
    
    // Etape 5 - Agir à l'envoi du formulaire
    // instructions.innerHTML='yo';

    // Etape 6 - Créer la fonction vérifier
    
    // fonctions auxiliaires
    function getRandom (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }
    
    function validInput () {
        console.log('ici ok2');
        if(isNaN(input)) {
            error.style.display = 'block';
        } else {
            error.style.display = 'none';
        }
        console.log('ici ok3');
}