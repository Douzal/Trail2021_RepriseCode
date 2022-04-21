// Etape 1 - Sélectionner nos éléments
let input = document.querySelector('#prix');
let prix; // = input.value;
let error = document.querySelector('.text-danger');
let formulaire = document.querySelector('#formulaire');
let btnDeviner = document.querySelector('.btn.btn-primary');
let instructions = document.querySelector('#instructions');
let compt = 0;

// Etape 2 - Cacher l'erreur
// error.hidden = true;
error.style.display = 'none';

// Etape 3 - Générer un nombre aléatoire
let max = 1000;
let numberToFind = getRandom(0,max);
console.log('numberToFind :', numberToFind);

// adapt placeholder with setted max value
input.placeholder='Devinez le prix ! (entre 0 et '+max+')';

// by default disable button
btnDeviner.disabled = true;

// Etape 4 - Vérifier que l'utilisateur donne bien un nombre
input.addEventListener("keyup", event => {
    prix = input.value;

    if(isNaN(prix) || prix =='') {
        // display error
        error.style.display = 'inline'; // block
        
        // deactivate button validate form
        btnDeviner.disabled = true; //'disabled';

        // add color red on input
        input.style.borderColor = 'red';
    } else {
        // hide error
        error.style.display = 'none';
        
        // activate button validate form
        btnDeviner.disabled = false;

        // remove color red on input
        input.style.borderColor = 'silver';
    }
    // event.preventDefault();
});

// Etape 5 - Agir à l'envoi du formulaire
btnDeviner.addEventListener('click', (e) => {
    // preventDefault !
    e.preventDefault();

    prix = input.value;
    compt++;
    let phrase ='#'+compt+' - '+prix;

    // condition on prix against numberToFind
    // phrase = verifier(prix, phrase)[0]+'</div>';
    let[phr, cas] = [verifier(prix, phrase)[0], verifier(prix, phrase)[1]];
    phrase= phr;

    let phraseToPrepend = document.createElement('div');
    phraseToPrepend.textContent = phrase;
    instructions.insertBefore(phraseToPrepend, instructions.firstChild);
    instructions.firstChild.style.paddingLeft = '55px';

    // mise en forme du dernier element ajoute au div instructions
    switch (cas) {
        case 1:
            instructions.firstChild.classList.add('plus', 'instruction');
            break;
        case 2:
            instructions.firstChild.classList.add('moins', 'instruction');
            break;
        case 3:
            instructions.firstChild.classList.add('fini', 'instruction');
            break;
    }

    // réinitialisons la valeur
    input.value='';
});

// Etape 6 - Créer la fonction vérifier
function verifier(prix, phrase) {
    // usefull for mise en forme du dernier element ajoute au div instructions
    let cas;
    if(prix < numberToFind) {
        phrase+=' est inférieur au juste prix !';

        // bordure en rouge
        input.style.borderColor = "red";
        cas = 1;
    } else if (prix > numberToFind){
        phrase+=' est supérieur au juste prix !';

        // bordure en rouge
        input.style.borderColor = "red";

        cas = 2;
    } else {
        phrase+=' est le JUSTE PRIX bravo ! <t> Vous avez trouvé en '+compt+' tentative(s)';
        // bordure en vert
        input.style.borderColor = "silver";

        // game is over, don't allow to enter values anymore + deactivate button Deviner
        btnDeviner.disabled = true;
        input.disabled =true;

        cas = 3;
    }

    return [phrase, cas];
}

// fonctions auxiliaires
function getRandom (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}