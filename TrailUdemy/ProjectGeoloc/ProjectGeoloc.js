// jQuery(document).ready(function($) {
$(function() { // jQuery plus rapide

  /* PARAMS URL */
  const unitsParam        = 'metric';
  const APIkey            = '05803e9fbc8c48d21dddf6073c12979f';
  
  /* PARAMS */
  let ville               = 'Port Louis';
  let villeChoisie        = ville;
  let urlOWM              = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=${APIkey}&units=${unitsParam}`;
  
  /* SELECTEURS */
  let spVille             = $('#ville');
  let spTemperatureLbl    = $('#temperature_label');
  let [divChanger]        = $('#changer'); 


  /* CREATE REQUEST */
  let req = new XMLHttpRequest();
  
  function majTempEtVille() {
    req.open('GET', urlOWM);
    req.responseType = 'json';
    req.send();
    req.onload = () => {
      if(req.readyState === XMLHttpRequest.DONE) {
        if(req.status === 200) {
          let resp = req.response;
          spVille.text(resp.name);
          spTemperatureLbl.text(resp.main.temp);
        } else {
          spVille.text('--\tTemporary unable to join website and load datas\nPlease try again later --');
          console.log('--\tTemporary unable to join website and load datas\nPlease try again later --');
        }
      }
    }
  }

  majTempEtVille();

  /* MANAGE CLICK Changer Ville */
  divChanger.addEventListener('click', (e) => {
    e.preventDefault();
    villeChoisie = prompt('De quelle ville souhaitez vous connaître la temp ?', 'Saint-Sauveur-sur-Tinée');
    urlOWM              = `https://api.openweathermap.org/data/2.5/weather?q=${villeChoisie}&appid=${APIkey}&units=${unitsParam}`;
    majTempEtVille();
  });

  /* PROMISES : add CSS */

  // param : array de cssName
  function chargerCSS(css) {
    return(new Promise((resolve, reject) => {
        /* CREATE THE LINK BALISE, FILL IT, INCLUDE IT ON HEAD */
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', css);
        document.head.appendChild(link);
        
        /* PROMISE USE */
        /* CASE SUCCESS */
        link.onload = () => {
          resolve(`Fichier ${link.href} successfuly loaded`);
        }

        /* CASE FAILED */
        link.onerror = () => {
          reject(new Error(`Fichier ${link.href} UNsuccessfuly loaded`));
        }
    }));
  }

  const prom = chargerCSS('ProjectGeoloc.css');
  prom.then(
    /* succes */
    function (succ) {
      console.log(succ);
    },
    /* erreur */
    function (err) {
      console.log(err);      
    }
  );



  function randomBetweenRange(min, max) {
    return min + Math.floor(Math.floor(max-min+1)*Math.random());
  }

  /////
  /* RECAP POUR VERIFIER L'ACQUIS : TEST DE CHARGEMNT D'UN SCRIPT */

  // function chargerScript(scriptName) {
  //   return new Promise((ok, pasOk) => { // (resolve, reject)

  //     /* create element */
  //     let newScript = document.createElement('script');
  //     // newScript.setAttribute('type', 'text/javascript');
  //     // newScript.setAttribute('src', scriptName);
  //     newScript.type  = 'text/javascript';
  //     newScript.src   = scriptName;
  //     document.head.append(newScript)

  //     /* case resolve */
  //     newScript.onload = () => ok (`\n\tOK load script : ${scriptName}`); 

  //     /* case abort */
  //     newScript.onerror = () => pasOk(new Error (`\n\tPAS OK load script : ${scriptName}`));
  //   });
  // }

  /* call promise */
  /* const prometMoi = chargerScript('test.js');
  prometMoi.then(
    function (err) {
      console.log(err);
    },
    function (res) {
      console.log(`\n\tCASE ERR : ${res}`);
    }
  ) */

  /* permet uniquement de log si erreur
     nb : noter le console.log sans parenthèses*/
  // chargerScript('test.js').catch(console.log());
    
  ///////
  /* await et async */
  function chargerScript2 (nomScript) {
    return new Promise((resolve, reject) => {
      let el = document.createElement('script');
      el.type = 'text/javascript';
      el.src = nomScript;
      document.body.append(el);

      el.onload = () => resolve(console.log(nomScript + ' : script chargé'));
      el.onerror = () => reject(new Error(nomScript + ' : nop script pas chargé'));
      
    })  
  }

  // let prom = chargerScript2('nomScSS');
  // prom.then(function res(res) {
  //   console.log('ok load : '+res);
  // },
  // function err(err) {
  //   console.log('PAS ok load : '+err);
  // });

  // let prom2 = chargerScript2('yoyoyo.js').catch();

  // avec async et await
async function asyncBonjour() {
  let prom = chargerScript2('nomDuScripeuh');

  let resultat = await prom;
  console.log('res : '+resultat);
}

// asyncBonjour();

async function resultat() {
  try {
    let srciptA = chargerScript2('scrrr');
    console.log(srciptA);
    // let srciptB = chargerScript2('test.js');
    // console.log(srciptB);
  } catch (error) {
    console.log(error);
  }
}

// resultat();

});