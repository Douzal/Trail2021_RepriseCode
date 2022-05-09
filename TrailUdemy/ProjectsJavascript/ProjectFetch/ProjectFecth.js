let cadre = document.querySelector('#price_label');
cadre.textContent = 'coucou le bébé';


// load css avec une promesse
function loadCSS(cssName) {
    let prom = new Promise((resolve, reject) => {
        let cssFile = document.createElement('link');
        cssFile.setAttribute('href', cssName);
        cssFile.setAttribute('rel', 'stylesheet');
        document.head.append(cssFile);
        
        cssFile.onload = () => {
            resolve(console.log('content chargé le CSS par promise :D'));
        }
        
        cssFile.onerror = () => {
            reject(new Error('pas content erreur'));
        }
     });
    return prom;
}

// loadCSS('ProjectFetch.css').then(
//     function succ(succ) {
//         // console.log(`Succes : ${succ}`);
//     },
//     function err(err) {
//         // console.log(`Erratum : ${err}`);
//     }
// );

loadCSS('ProjectFetch.css').catch();

// load js
function loadScript(script) {
    return new Promise((resolve, reject) => {
        // create script
        let newScript = document.createElement('script');
        newScript.src = script;
        newScript.type = 'text/javascript';
        document.body.append(newScript);

        newScript.onload = () => resolve('message d\'amour');
        newScript.onerror = () => reject(new Error());

    });
}
const script = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
// loadScript(script).then(
//     ok = (kay) => console.info('yeap'),
//     pasok = (pasKay) => console.warn('err') 
// );


/* request by fetch */
async function getPriceFetch(url) {
    const req = await fetch(url, {
        method: 'GET'
    });

    if(!req.ok) {
        console.warn(`erreur fetch`);
    } else {
        console.group();
        console.info(`nickel fetch`);
        // recupération de l'objet en json
        let datas = await req.json();
        console.log(`\n\tjson 1 : %o`, datas);
        // console.log(datas);
        console.groupEnd();

        // set price
        $('#price_label').text(datas.EUR.last);
    }
    
}

let url = 'https://blockchain.info/ticker';
getPriceFetch(url);

async function asynFecth(url) {
    const yoFetch = await fetch(url, {
        method:'GET'
    });

    if(!yoFetch.ok) {
        console.error('pas ok');
    } else {
        let datas = await yoFetch.json();
        // console.log(`json : ${datas}`); // mais marche pas en concaténant la chaine, mieux avec :
        console.info('json : %o', datas);

    }
}

// asynFecth(url);

/* REPRISE CODE XMLHttpRequest AJAX adapté en fetch */
url = 'https://lesoublisdelinfo.com/api/php';

function sendAjaxRequest() {
    let req = new XMLHttpRequest();

    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    req.responseType = 'json';
    req.send('prenom=Aldous');

    req.onload = function () {
        if(req.readyState === req.DONE) {
            if(req.status === 200) {
                let newPar = document.createElement('p');
                let res = req.response;
                newPar.textContent = res.resultat;//'ok AJAX';
                document.body.append(newPar);
            } else {
                console.log('moui AJAX');
            }
        } else {
            console.log('là, moui AJAX');
        }
    }
    
}

sendAjaxRequest();

async function envoyerPrenom(url, prenom) {
    const req = await fetch(url, {
        method:'POST',
        headers:{
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            prenom
        })
    });

    if(!req.ok) {
        console.log('pas ok');
    } else {
        let datas = await req.json();
        console.group();
        // console.log('datas : %o', datas);
        // console.warn('datas : ' + datas); // MARCHE PAS
        console.table('myArray : ',datas);
        console.groupEnd();
        
    }

}

envoyerPrenom(url, 'Al Pacino');




/* USE AXIOS */
/* GET AXIOS */
url = 'https://lesoublisdelinfo.com/api/php';
function axiosGetExemple() {
    axios.get(url)
    .then((donnees) => {
        // console.table(donnees);
        console.group();
        console.warn('\tVoici donnees', donnees);
        console.groupEnd();
        console.info(donnees.data.resultat);
        // cadre.textContent = donnees.data.resultat;
        
        },
        (err) => {
            console.warn('Erreur');
        })
        .catch(console.warn('Erreur bip bip bop'))
        // eventuellement un dernier then en fin de traitement (notamment boucle)
            .then(console.info('Traitement terminé.'));
}
const interval = 1000; // 10 sec
setInterval(axiosGetExemple, interval);

/* POST AXIOS */
const axiosInstance = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    baseUrl: url
});
function axiosPostExemple() {
    // objet utile pour passer les paramètres à notre post
    let postParams = new URLSearchParams({
        prenom:'Juliana :/',

    });
    
    axiosInstance.post(url, postParams)
    .then((donnees) => {
        // console.table(donnees);
        console.group();
        console.warn('\tVoici donnees POST ', donnees.data);
        console.groupEnd();
        
        },
        (err) => {
            console.warn('Erreur');
        })
        .catch(console.warn('Erreur bip bip bop'))
        // eventuellement un dernier then en fin de traitement (notamment boucle)
            .then(console.info('Traitement terminé.'));
}

axiosPostExemple();


