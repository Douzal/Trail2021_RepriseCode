// jQuery(document).ready(function($) {
$(function() { // jQuery plus rapide
        // console.log('Hello js');
    // objet constructeur avec prototype

    // création d'un objet voiture : roues, marque, année
    function Voiture(roues, marque, annee) {
        this.roues = roues;
        this.marque = marque;
        this.annee = annee;
    }

    Voiture.prototype.seDecrire = function() {
        // console.log('Voiture\n\tmarque : '+this.marque+'\n\troues motrices : '+this.roues+'\n\tannée : '+this.annee);
        console.log(`Voiture\n\tmarque : ${this.marque}\n\troues motrices : ${this.roues}\n\tannée : ${this.annee}`);
    }

    let tesla = new Voiture('2', 'Tesla', '2020');
    // console.log(tesla);
    // tesla.seDecrire();

    // console.log(tesla.hasOwnProperty()); // function not founded in voiture() constructor, but from Object contstructor (inheritance)

    // Animal
    // function Animal(nbDePates, poids) {
    //     this.nbDePates = nbDePates;
    //     this.poids = poids;
    // }

    // function Mammifere(typePoils) {
    //     Animal.call(this, nbDePates, poids);
    //     this.typePoils = typePoils;
    // }


    // function Oiseau(nbDePates, poids, longueurAiles) {
    //     Animal.call(this, nbDePates, poids);
    //     this.longueurAiles = longueurAiles;
    // }

    // Animal.prototype.seDecrire = function () {
    //     console.log('je suis un oiseau, j\'ai '+this.nbDePates +' pates, je pèse '+this.poids+' et j\'ai des ailes de '+this.longueurAiles);
    // }

    // héritage et paramétrage des constructeurs
    // Oiseau.prototype = Object.create(Animal.prototype);
    // Oiseau.prototype.constructor = Oiseau;// Animal.prototype.constructor; // --> faix :()

    // tests et debugs..
    // let perr = new Oiseau('2', '15g', '20cm');
    // perr.seDecrire();
    // console.log(perr);


    ///////// avec les classes
    class Animal {
        constructor(nbPates, poids) {
            this.nbPates = nbPates;
            this.poids = poids;
        }

        get phrasePresentation() {
            return 'Animal ayant '+this.nbPates+' pates, et pesant '+this.poids+'.';
        }

        sePresenter() {
            console.log('Animal ayant '+this.nbPates+' pates, et pesant '+this.poids+'.');
        }
    }

    class Oiseau extends Animal {
        constructor(nbPates, poids, longueurAiles) {
            super(nbPates, poids);
            this.longueurAiles = longueurAiles;
        }

        get nombreDePates (){
            return this.nbPates
        }
        
        voler() {
            console.log('je suis un oiseau, j\'ai '+this.nbPates +' pates, je pèse '+this.poids+' et j\'ai des ailes de '+this.longueurAiles)
        }
    }

    let perr = new Oiseau(2, '20g', '20cm');
    // perr.sePresenter();
    // perr.voler();
    // console.log('nbPates via Getter : '+perr.nombreDePates);

    class Poisson extends Animal {
        constructor(pattes, pds, nbNageoires, taille) {
            super(pattes, pds);
            this.nbNageoires = nbNageoires;
            this.taille = taille;
        };

        get poissPresentation (){
            return 'Poisson ayant '+this.nbNageoires+' nageoires.';
        }

        set changeNbNageoires(nb) {
            this.nbNageoires = nb;
        }
    }

    let poisson = new Poisson(0, '10g', 4, '1m');
    // console.log('poisson.poissPresentation :'+poisson.poissPresentation);
    // console.log('poisson.phrasePresentation :'+poisson.phrasePresentation);
    // console.log('poisson.sePresenter() :\n\t');
    // poisson.sePresenter();

    //////////////////////////////////////////////////
    // LECON 149
    let gandalf = {titre:"mage blanc"};

    function direBonjour(arme, degat) {
        console.log('Bonjour '+this.titre+', vous faites '+degat+' dégats avec votre '+arme);
    }

    // direBonjour.call(gandalf, 'baton', 200);
    // direBonjour.apply(gandalf, ['baton', 200]);
    // this.valeur = "Window";

    let myObject = {
        val: "Objet",
        getVal: function () {
            console.log(this.val)
        }
    }

    // console.log('myObject: '+myObject.getVal);
    // myObject.getVal();
    let maVal = myObject.getVal;
    // let maVal2 = myObject.getVal();

    // console.log('\tmaVal : '+maVal); //+'\n\tmaVal2 : '+maVal2);


    // create a <span>
    let body = document.body;
    let span = document.createElement('span');
    span.innerHTML = 'yo js'

    $('span').attr('id', 'monSpan');

    body.appendChild(span);

    span.innerHTML = fact(5);

    span.addEventListener('mouseover', function () {
        span.innerHTML = fact2(4);
    });
    span.addEventListener('mouseout', function () {
        span.innerHTML = fact(5);
    });

    // fonction exponentielle
    function fact (n) {
        if(n==0 || n==1) {
            return n;
        } else {
            return n*(fact(n-1))
        }
    }

    // fonction exponentielle via reducer
    const fact2 = n => {
        let factors = range(1, n);
        let red = factors.reduce(
            function(acc, runVal) {
                if(runVal==0 || runVal==1) {
                    return runVal;
                } else {
                    return acc*runVal
                }
            }
        );
        return red;
    }

    function range(n,m) {
        let factors=[];
        for(let i=n;i<=m;i++) {
            factors.push(i);
        }
        return factors;
    }

    // reducer somme
    function sumReducer(arr) {
        let tot = 0;
        return arr.reduce((acc, val) => (acc+val));
    }

    let tab = [1, 2, 3, 4, 5];
    // console.log('sumReducer [1, 2, 3, 4, 5] : '+sumReducer(tab));


    ////// test AJAX
    let div = document.createElement('div');
    body.appendChild(div);

    // fonction AJAX lancée par interval après
    function ajaxBtcRequest() {

        const url = 'https://blockchain.info/ticker';
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            // console.log(response.readyState);
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status === 200) {
                    let response = request.response;
                    let actualPrice = response.EUR.last;
                    div.textContent=actualPrice;
                    console.log(actualPrice);
                    console.log(`Reponse : ${JSON.stringify(response)[0]}`); // debile, ça ramène rien d'interessant
                } else {
                    console.log(`Reponse : ${JSON.stringify(response)[0]}`); // debile, ça ramène rien d'interessant
                    console.log(`Erreur lors de la requête du prix - ${response.status}`); // useless
                }
            }

        };

    }

    // setInterval(ajaxBtcRequest, 1000);


    // requête POST
    const urlPost = 'https://lesoublisdelinfo.com/api.php';
 
    /* let requestPost = new XMLHttpRequest();
    requestPost.open('GET', urlPost);
    requestPost.responseType = 'json';
    requestPost.send();

    requestPost.onload = () => {
        if(requestPost.readyState === requestPost.DONE) {
            if(requestPost.status === 200){ // API accessible
                let [div] = $('div');
                let response = requestPost.response;
                div.textContent = response.resultat;
                console.log(`response : ${response}`);
                console.log(`response.resultat : ${response.resultat}`);
            } else {
                console.log(`Erreur - retour de : ${response.resultat}`);
            }
        }
    } */
    
    // rework de url Post pour vérifier les acquis 10:11
    /* let reqPost = new XMLHttpRequest();
    reqPost.open('POST', urlPost);
    reqPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    reqPost.responseType = 'json';
    reqPost.send('prenom=Alexis');

    reqPost.onload = () => {
        if(reqPost.readyState === XMLHttpRequest.DONE) {
            if(reqPost.status === 200) {
                // ok traitement 10:15
                let resp = reqPost.response;
                console.log(`resp : ${resp.prenom}`);

            } else {
                alert('try again later please');
            }
        }
    }
 */

});