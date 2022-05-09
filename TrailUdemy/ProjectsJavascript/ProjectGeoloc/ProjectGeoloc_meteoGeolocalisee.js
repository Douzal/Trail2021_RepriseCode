// jQuery(document).ready(function($) {
$(function() { // jQuery plus rapide
    'use strict';
    

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


    let villeChoisie; // = "saint-saulve";
    // recevoirTemperature(villeChoisie);

    // ajout de la geoloc wach
    if('geolocation' in navigator) {
        let latitude;
        let longitude;
        let options = {
            enableHighAccuracy: true
            // maxAge: 100000
        };
        navigator.geolocation.watchPosition((pos) => {
            latitude    = pos.coords.latitude;
            longitude   = pos.coords.longitude;

            // requete
            const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + longitude
                        + '&lat=' + latitude
                        + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
            let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
            requete.open('GET', url); // Nous récupérons juste des données
            requete.responseType = 'json'; // Nous attendons du JSON
            requete.send(); // Nous envoyons notre requête

            // Dès qu'on reçoit une réponse, cette fonction est executée
            requete.onload = function() {
                if (requete.readyState === XMLHttpRequest.DONE) {
                    if (requete.status === 200) {
                        let reponse = requete.response;
                        // console.log(reponse);
                        let temperature = reponse.main.temp;
                        let ville       = reponse.name;
                        // console.log(temperature);
                        document.querySelector('#temperature_label').textContent = temperature;
                        document.querySelector('#ville').textContent = ville;
                    }
                    else {
                        alert('Un problème est intervenu, merci de revenir plus tard.');
                    }
                }
            }
        }, erreur, options);
    } else {
        villeChoisie = 'Paris';
        recevoirTemperature(villeChoisie);
    }

    let changerDeVille = document.querySelector('#changer');
    changerDeVille.addEventListener('click', () => {
        villeChoisie = prompt('Quelle ville souhaitez-vous voir ?', 'Paris');
        recevoirTemperature(villeChoisie);
    });

    function erreur() {
        villeChoisie = 'Paris';
        recevoirTemperature(villeChoisie);
    }

    function recevoirTemperature(ville) {
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';

        let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
        requete.open('GET', url); // Nous récupérons juste des données
        requete.responseType = 'json'; // Nous attendons du JSON
        requete.send(); // Nous envoyons notre requête

        // Dès qu'on reçoit une réponse, cette fonction est executée
        requete.onload = function() {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if (requete.status === 200) {
                    let reponse = requete.response;
                    // console.log(reponse);
                    let temperature = reponse.main.temp;
                    let ville       = reponse.name;
                    // console.log(temperature);
                    document.querySelector('#temperature_label').textContent = temperature;
                    document.querySelector('#ville').textContent = ville;
                }
                else {
                    alert('Un problème est intervenu, merci de revenir plus tard.');
                }
            }
        }
    }
});