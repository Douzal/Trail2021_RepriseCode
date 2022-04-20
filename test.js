$(document).ready(function() {
    /*
    {
        console.log('Hello world'); console.log('Hello');
        // alert('rouge'); // can't work, because exists with Window context 

        const prenom = 'Aldous'; // prompt('Prénom ?') ; 
        const nom = 'Masson'; // prompt('Prénom ?') ; 

        console.log('Bonjour ', prenom, ' ', nom); 
    }


    {
        let centHuit = 108;
        // centHuit+=2;
        centHuit++;centHuit++;
        console.log(centHuit);
    }
    */
    // let confirmation = false;
    // confirmation = confirm('Souhaitez vous continuer ?');
    // if(confirmation) {
    //     console.log('vous voulez continuer');
    // } else {
    //     console.log('vous voulez PAS continuer');

    // }

    // let age = prompt("Quel st votre âge ?");
    // if(isNaN(age)) {
    //     do {
    //         age = prompt("Quel st votre âge ?");
    //     } while (isNaN(age))
    // }

    // console.log("vous avez ", age, " ans.");
    /* let age;
    function askAge() {
        age = prompt('quel est age ?');
    }
    askAge();
    var phrase = 'Vous avez ' + age + ' ans.';

    $('h1').append('h2').text(phrase + ' !!');
    $("h1").append('<br \>').append('<br \>').append('<br \>').append('<p>' + phrase + '</p>'); */

    /* function direBonjour(prenom) {
        alert('bonjour ' + prenom);
    }

    // direBonjour('Aldous)');
    // direBonjour('Bérénice');
    let sum, nb1, nb2;
    function addNumbers(a=10, b=5) {
        sum = a+b;
        console.log(a+'+'+b+'= '+ sum);
    }

    addNumbers(nb1,nb2); */

    /* let prepa= 5, cuisson = 5;

    function cuisiner(nbGateaux, prepa=10, cuisson=15) {
        let result = nbGateaux * (prepa + cuisson);
        return result;
    }

    console.log(cuisiner(5, prepa, cuisson));

    function cuisinerCake(nbGateaux) {
        return cuisiner(nbGateaux, 1, 5);
    }

    console.log(cuisinerCake(5));
    
    let tpsPrepaChocolat = 5;
    console.log('chocolat : '+cuisiner(1, 5)); */

    function demanderAge() {
        let age = prompt('Quel est votre age ?');
        alert('vous avez '+age+' ans.');
    }

    // demanderAge();

    /* function prevoirAge() {
        let age = Number(prompt('quel est votre âge ?'));
        //alert('Vous avez '+parseInt(age)+1+' ans'); // NE MARCHE PAS !
        //alert('Vous avez '+(parseInt(age)+1)+' ans');
        alert('Vous avez '+(age+1)+' ans');
        let age3 = parseFloat(age); // nombres à virgules
        let nombreAParseStringer = parseFloat(age)+'';
        let nombreAParseStringerMIEUX = age.toString();

    }
    prevoirAge(); */

    /* let functionAnonyme = function () { 
        console.log('je suis anonyme');
     };
     
     functionAnonyme(); */
     //let functionAnonyme = (function () {console.log('je suis anonyme'); })();


     // EXERCICE 1 - Fonction abracadabra 
     /* let prenom, nom, age;
     function abracadabra () {
         prenom = prompt('quel est votre prenom ?');
         nom = prompt('quel est votre nom ?');
         age = prompt('quel est votre age ?');

         return ("Sapristi ! On ne m'avait pas prévenu que c'était vous, "+prenom+
                " ! Euh... Je veux dire... Monsieur le grand magicien "+nom+
                "! Cela fait déjà "+age+" ans que vous faites rayonner notre contrée !");
     }

    console.log(abracadabra()); */

    // EXERCICE 2 - CALCULATEUR D'IMC
    // set des var
    // let poids, taille, centOuMetr;
    
    // centOuMetr = prompt('Voulez-vous donner votre poids en cm (entrer cm)? (sinon vous le donnerez'
    // + 'en mètres (entrer m))');
    
    // // conversion en m
    // if(centOuMetr=="cm") { // poids initialement donné en cm
    //     taille = prompt('Entrez donc votre taille en cm !');
    //     taille = parseFloat(taille)/100;
    // } else {
    //     taille = prompt('Entrez donc votre taille en m !');
    //     taille = parseFloat(taille)
    // }

    // poids = prompt('Entrez votre poids');
    // poids = parseFloat(poids);
    
    // function calculerIMC(pd, t) {
    //     pd = parseFloat(pd);
    //     t = parseFloat(t);
    //     /* console.log('cm ou m :'+centOuMetr
    //                 +'poids : '+pd
    //                 + 'Taille : '+t); */
    //     return pd/Math.pow(taille, 2);
    // }

    // console.log('Votre IMC : '+calculerIMC(poids, taille));

    // EXERCICE MAJEUR
    /* let age;
    do {
        age = prompt('quel est votre âge ?'); 
    } while (isNaN(age));

    if(age <18) {
        console.log('Vous êtes un bébé mineur !');
    } else if (age >= 18 && age <= 20) {
        console.log('Vous êtes maj en France uniquement !');
    } else {
        console.log('Vous êtes un ancien !');
    } */

    /* let consommable ='carotte';
    switch (consommable) {
        case 'carotte':
            console.log('C\'est une carotte');
            break;
        default:
            console.log('C\'est un merguez, peut être ?');
            break;
    } */

    /* let gareArrivee= prompt('Ou voulez-vous aller ?') || 'Montparnasse';//"Valenciennes";
    let gareDepart="Gare du Nord";
    let chauffeur = 'Aldous';
    if (!(gareArrivee == null) && gareArrivee.length >= 1) {
        if((gareArrivee != "" || gareDepart != "")
            && chauffeur!='') {
            console.log('le train va démarrer à destination de ' + gareArrivee +'.');
        } else {
            console.log('need une gare d\'arrivée et une de départ');
        }
    } */

    /* let x = 10;
    console.log(x>5?'vrai x >5':'faux : x >=5'); */
    // console.log(x>5);
    
    /* do {
        var prenom = prompt('Quel est votre prénom ?');
    } while (prenom == "" || prenom == null) */
    
    /* let arme = prompt('Choisissez une arme : 1 ou 2');
    try {
        switch (arme) {
            case '1':
                console.log('Choix arme 1');
                break;
            case '2':
                console.log('Choix arme 1');
                break;
            default:
                throw new Error('Vous ne pouvez pas tricher');
            }
    } catch (error){
        console.log('Erreur :' +error);
    } */

    // let num1=0, num2=0, operation=1,operationPossibles = [1,2,3, 4];
    // //1- ask for numbers num1 & num2
    // do {
    //     do {
    //         num1 = parseInt(prompt('Nombre 1 ?'));
    //     } while (isNaN(num1))

    //     do {
    //         num2 = parseInt(prompt('Nombre 2 ?'));
    //     } while (isNaN(num2))

    //     //2- ask OPERATION and get a good value
    //     do {
    //         operation = parseInt(prompt('Que souhaitez-vous faire ?\n\n1- '+
    //             'Addition\n2-Multiplication\n3- Soustraction\n4- Division'));
    //         console.log('operation est une string ? : '+isNaN(operation));
    //     } while (!operationPossibles.includes(operation))
        
    //     //3- création de la fonction
    //     function calculate(n1=0, n2=0, op ='1') {
    //         try {
    //             switch (op) {
    //                 case 1: // add
    //                     return n1+n2;
    //                     break;
    //                 case 2: // soustr
    //                     return n1-n2;
    //                     break;
    //                 case 3: // mult
    //                     return n1*n2;
    //                     break;
    //                 case 4: // div
    //                     if(parseInt(n2)===0) {
    //                         throw new Error('division par 0 impossible !');
    //                         break;
    //                     } else {
    //                         return n1/n2;
    //                         break;
    //                     }
    //                 default:
    //                     console.log('You should not enter here..');
    //                     break;
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }

    //     }

    //     let recap = calculate(num1, num2, operation);
    //     recap='Le résultat du calcul de '+num1+' '+
    //         operation+' '+num2+' est : '+
    //         recap;
    //     console.log(recap);
    //     $('h1').append('h2').text('Titre changé via jQuery');
    //     $('h1').add('<p>'+recap+'</p>').appendTo(document.body);;

    //     var restart = confirm('Voulez-vous continuer à calculer ?');
    // } while (restart==true)

    // let variable = 'globale';
    // var variable2 = 'globale';
    // if (true){
    //     let variable = 'locale';
    //     var variable2 = 'locale';
    //     console.log('let variable : '+variable);   // locale
    //     console.log('var variable2 : '+variable2); // locale
    // }

    // console.log('let variable : '+variable);  // globale
    // console.log('var variable2 : '+variable2);// locale

    /* function timer(secondes) {
        if(secondes >0) {
            console.log('il reste : ', secondes);
            secondes--;
            timer(secondes);
        } else {
            console.log('Terminé !');
        }
    }

    timer(10); */

    /* FONCTION SOMME RECCURSIVE */
    /* function reccSomme(n) {
        let sum =0;
        do {
            sum+=n;
            n-=1;
        } while (n>0)

        return sum;
    }

    console.log(reccSomme(5)); */

        
    /* let myTab = [5, 1, 2, 3];                   // [5, 1, 2, 3];
    // let myTab2 = new Array(1, 2, 3);
    myTab.pop(); // supp dernier élément        // [5, 1, 2];
    myTab.shift(); // supp premier élement      // [1, 2];
    myTab.unshift(1); // add au début           // [1, 1, 2];
    myTab.unshift(2);                           // [2, 1, 1, 2];
    myTab.push(4, 5, 6);                        // [2, 1, 1, 2, 4, 5, 6];
    console.log(myTab);
    console.log(myTab.indexOf(5));

    // console.log(myTab.join('---')); // 2---1---1---2---4---5---6
    console.log("1- myTab2 : "+myTab);
    let myTab2 = [2, 1, 1, 2, 4, 5, 6];
    // EXERCICE : Je veux [2, 3, 10, 5, 6] et j'ai [2, 1, 1, 2, 4, 5, 6]
    myTab2.splice(1,4,3,10);
    console.log("2- myTab2 : "+myTab2); */

/*     let tableau = ['un', 'deux', 3, 4, 5];
    tableau.splice(1,2,4);
    console.log(tableau); */

    
    
    /* console.log(myTab);
    console.log(myTab2);
    console.log(myTab == myTab2); // false
    console.log(myTab === myTab2); // false */

    // let Tab2Dim = [[1, 2], [3, 4]];
    // console.log('Tab2Dim[1] : \n'+Tab2Dim[1]);
    // console.log(Tab2Dim[2]);

    // en fait un array associatif n'est pas un array, mais un objet.
    // let monTabAssociatif = {'prenom':'Aldous'};
    // monTabAssociatif.marclor = 'Marc';    // 
    // monTabAssociatif['butters'] = "butt"; // add properties (not really elements)

    /* console.log('1- tab : ',monTabAssociatif);
    console.log('\nTab.lenght() : '+monTabAssociatif.length+'\n\n');
    console.dir(monTabAssociatif);
    console.log('\n2- tab : '+monTabAssociatif+
                '\nTab.lenght() : '+monTabAssociatif.length); */

    // console.log('TabAssoc[0] :'+monTabAssociatif[0]);

    // let monTableau2D = [
    //     ['Mark', 'Jeff', 'Bill'],
    //     ['Zuckerberg', 'Bezos', 'Gates']
    // ];
    // monTableau2D[0].pop(); // supprime Bill
    // monTableau2D[0].unshift('Bill'); // rajoute Bill en prem pos
    // console.log('monTableau2D ? : '+ monTableau2D); // balade dans les indices
    // console.log('monTableau2D ? : ', monTableau2D); // balade dans les indices


/*     let Tabl2Dim = [
        ['Mark', 'Jeff', 'Bill'],
        ['Zuck', 'Bezos', 'Gates']
    ];
    Tabl2Dim.splice(2,0, ['45', '50', '10']);
    console.log(Tabl2Dim); */

    // let panier = ['fraise', 'banane', 'poire'];
    // // itération sur les indices des objets
    // for (const f in panier) {
    //     // console.log(f);
    //     console.log(panier[f]);
    // }
    // // itération sur les objets
    // for (const fruit of panier) {
    //     console.log(panier.indexOf(fruit));
    // }

    /* let listeDePays = ['France', 'Belgique', 'Japon', 'Maroc'];
    // boucle forOf
    for (const pays of listeDePays) {
        // console.log(pays);
    }

    // forEach arrow
    listeDePays.forEach(pays => console.log(pays));

    // fonction anonyme
    listeDePays.forEach(function(p) {
        console.log(p);
    }); */

    // let monTableauAssociatif = {
    //     'prenom'    :   'Mark',
    //     'nom'       :   'Zuck',
    //     'poste'     :   'PDG'
    // };

    
    // // function qui return une descr du tableau, un peu toString
    // function concatener(tableau) {
    //     let chaine='';
    //     for (const data in tableau) {
    //         // console.log(tablAss[data]);
    //         chaine+= (data + ' : ' + tableau[data]+', ');
            
    //     }
    //     // console.log(chaine);
    //     return chaine;
    // }

    // console.log(concatener(monTableauAssociatif));


    /* let chien = {
        race        :   'Shiba',
        poil        :   'Court',
        // aboyer      :   function() {
        //     console.log('ouafouaf');
        // }
        aboyer : () => console.log('ouaf')
    };
    
    (() => chien.aboyer())(); */
    
    /* let magicien = {
        attaquer : function() {
            console.log('magicien lance un sort');
        }
    }
    let guerrier = {
        attaquer : function() {
            console.log('guerrier prendre épée !');
        }
    }

    magicien.attaquer();
    guerrier.attaquer(); */
    
    
    // DESTRUCTURING ASSIGNMENT
    // let informations = ['SuperSayen', 25, 'femme'];

    // let [pseudo, age, sexe] = informations;
    // console.log(informations);
    // console.log('pseudo : '+pseudo+'\nage : '+age+'\nsexe : '+sexe+'\n');
    
/*     let nombres = [1,4,2,4,3,4,5,5,6,10,10];
    // let setNombre = new Set(nombres);

    let monSet = new Set();
    monSet.add(1);
    monSet.add(2);

    console.log(monSet); */

    /* let maMap = new Map([
        ['artiste', 'Black M'],
        ['président', 'davidK']
    ]);
    maMap.set('yo', 'bonjour');
    console.log(maMap);
    maMap.delete('yo');

    console.log(maMap); */
/*     let utilisateurs = new Map();
    utilisateurs.set('Marc Z', {
        email : 'marc@hotmail.fr',
        poste : 'pdg',
        phone : 0688537455,
        age : 35
    });
    utilisateurs.set('Aldous', {
        email : '12AL@hotmail.fr',
        poste : 'Directeur du monde',
        phone : '---',
        age : 31
    });
    console.log(utilisateurs); */

    // let voit1 = {
    //     'marque'    : 'tesla',
    //     'prix'      : 50
    // };
    // let voit2 = {
    //     'marque'    : 'BingoVoaturaleau',
    //     'prix'      : 45
    // };

    // let weakS = new WeakSet([voit1, voit2, voit2]);
    
    // weakS.add(voit1);
    // weakS.add(voit2);
    // // weakS.delete(voit1)
    // console.log(weakS);


    // let voitureWMap = new WeakMap();

    // let index = {
    //     id : 1
    // }

    // let voitureA = {
    //     modele : 'Tesla',
    //     prix : 45
    // }

    // voitureWMap.set(index, voitureA);
    // console.log(voitureWMap);

    // let wm = new WeakMap();
    // let obj1 = {titre : 'Duc de Boulogne'};
    // let obj2 = {titre : 'baron'};
    // let Aldous = {prenom : 'aldous'};
    // let Tancrede = {prenom : 'tancrede'};

    // wm.set((Aldous), obj1);
    // wm.set(Tancrede, obj2);

    // console.log(wm);
    
    // //wm.delete(Tancrede);
    // console.log(wm);


    /* function addition (...n) {
        let resultat=0;
        n.forEach(nombre => {
            resultat+=nombre;
        })
        // console.log(resultat);
        return resultat;
    }
            
    let add = addition(4,9,5,415,78,54);
    console.log(add); */

    let fruits = ['fraise', 'banane', 'poire'];
    let aliments = ['choco', 'sucre', 'lait'];
    let deuxTab = aliments.concat(fruits);

    // permet aussi d'ajouter les données de fruits : ...fruits
    let aliments2 = ['choco', 'sucre', 'lait', ... fruits]; 
    
    // console.log(deuxTab);
    // console.log(aliments2);

    let [al1, al2, ...aliments3] = aliments2; 
    // console.log(al1+' =? choco');
    // console.log(al2+' =? sucre');
    // console.log(aliments3);

    let devises = ['yen', 'euro', 'dollar', 'lire', 'lek albanais'];

    let [a, b, c, d, ...finDevises] = devises;
    // let [...debDevises , f, g] = devises;
    // console.log(d);

    let paragraphes = document.querySelectorAll('p');
    for(p of paragraphes) {
    // for (let i=0; i<paragraphes.length; i++) {
        p.style.color = 'green';
        // console.log(p.textContent);
    }

    let a2 = document.querySelector('#lien1');
    let button = document.querySelector('input');

    a2.onclick = () => {
        if(confirm('Sûr ?')) {
            a2.remove();
        }
    }


});
