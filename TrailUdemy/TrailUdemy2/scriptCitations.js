// console.log('coucou citation');

let a, b, autreArgs;

let x, y, z;
x=[1, 3, 5, 7, 11];
[y, z] = x;
// console.log(y); //1 ??
// console.log(z); //3 ??

const [un, trois, cinq, sept, onze] = x;
// console.log(cinq);

// Tableau de citations
let citations = [
    ["Pépère", "Alexis"],
    ['Les jours passent comme les voitures', 'Neg Marrons'],
    ["La vie est un mystère qu'il faut vivre, et non un problème à résoudre.", "Gandhi"],
    ["Le plus grand risque est de ne prendre aucun risque.", "Mark Zuckerberg"],
    ["Méritez votre statut de leader chaque jour.", "Mickael Jordan"],
    ["Soyez le changement que vous voulez voir dans le monde.", "Gandhi"],
    ["A chaque fois que vous vous retrouvez du même côté que la majorité, il est temps de prendre du recul, et de réfléchir.", "Mark Twain"],
    ["Seulement ceux qui prendront le risque d’aller trop loin découvriront jusqu’où on peut aller.", "T.S Elliot"],
    ["Le succès c’est tomber sept fois, se relever huit.", "Proverbe japonais"],
    ["Dans vingt ans vous serez plus déçus par les choses que vous n’avez pas faites que par celles que vous avez faites. Alors sortez des sentiers battus. Mettez les voiles. Explorez. Rêvez. Découvrez.", "Mark Twain"],
    ["Si vous attendez pour agir, tout ce que vous gagnerez, avec le temps, c’est de l’âge.", "Brian Tracy"],
    ["Quand on concentre son attention sur un seul projet, l’esprit suggère constamment des idées et des améliorations qui lui échapperaient s’il était occupé avec plusieurs projets en même temps.", "P.T. Barnum"],
    ["Se dédier à faire tout ce que l’on peut pour aider les autres à obtenir ce qu’ils veulent, c’est la clé du succès.", "Brian Sher"],
    ["Si vous pensez que vous êtes trop petit pour avoir de l’impact, essayez d’aller au lit avec un moustique.", "Anita Roddick"],
    ["Ne jugez pas chaque jour sur ce que vous récoltez, mais sur les graines que vous semez.", "Robert Louis Stevenson"],
    ["L’action est la clé fondamentale de tout succès.", "Pablo Picasso"],
    ["Le succès, c’est se promener d’échecs en échecs tout en restant motivé.", "Winston Churchill"],
    ["Votre avenir est créé par ce que vous faîtes aujourd’hui, pas demain.", "Robert T. Kiyosaki"],
    ["Ne vous découragez pas, c’est souvent la dernière clef du trousseau qui ouvre la porte.", "Zig Ziglar"],
    ["Pour gagner votre vie, apprenez à l’école. Pour gagner une fortune, apprenez par vous-même.", "Brian Tracy"],
    ["Les gagnants trouvent des moyens, les perdants des excuses…", "F. D. Roosevelt"],
    ["Vous n’êtes jamais trop vieux pour vous fixer de nouveaux buts, ou rendre vos rêves réalité.", "C.S. Lewis"],
    ["Un pessimiste voit la difficulté dans chaque opportunité. Un optimiste voit une opportunité dans chaque difficulté.", "Winston Churchill"]
  ];

// console.log('ok citations');
let btn = document.body.querySelector('#nouveau');
let citation = document.body.querySelector('#citation');
let auteur = document.body.querySelector('#auteur');
let taille = citations.length;
let random = 0;
let dernier = 0; //citations.indexOf([citation.textContent, auteur.textContent]);

let changeQuote = () => {
  do {
    random = randomIntFromInterval(0, taille-1)
  } while(random==dernier)

  // récupération de l'indice
  dernier = random;

  citation.textContent = citations[random][0];
  auteur.textContent = citations[random][1];
}

btn.addEventListener('click', changeQuote)

// get random
let randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}