$(function() {
    'use strict';
    // console.warn('ok theme');
    const sombre            = 'Thème sombre';
    const clair             = 'Thème clair';
    const localStorageDark  = 'dark';
    const localStorageClair = 'clair';

    /* add le css */
    function addSCC(scriptName) {
        return new Promise((resolve, reject) => {
            // create the file
            const cssFile = document.createElement('link');
            cssFile.setAttribute('href', scriptName);
            cssFile.setAttribute('rel', 'stylesheet');
            document.head.append(cssFile);

            cssFile.onload = () => resolve(console.warn(`css loadé : ${scriptName}`));
            cssFile.onerror = () => reject(console.error(`css NON loadé : ${scriptName}`));
        });    
    }

    addSCC('PersistantTheme.css').then(
        function succ(succ) {
            // console.log('css loadé');
        },
        function err(err) {
            // console.log('css NON loadé');
        }
    );

    /* CHECK FOR EXISTING LOCALPREFERENCE */
    let localPreference = localStorage.getItem('theme');
    let localUsername = localStorage.getItem('user');
    // console.log('localPreference : ', localPreference);
    // existence d'une file
    
    if(localPreference) {
        console.info('File de theme déjà créée en LocalStorage - Affichage en fonction');
        initTheme(localPreference, localUsername);
    } else {
        console.info('PAS ENCORE de File de theme en LocalStorage');
    }
    
    //
    function initTheme(localPreference, localUsername) {
        // console.log('localPreference : ', localPreference);
        if(localPreference==localStorageDark) {
            switchToDark();
        } else if (localPreference==localStorageClair) {
            switchToClair();
        } else {
            console.log('moche');
        }

        if(!localUsername == '') {
            $('p[class="mt-3"]').text('Bonjour '+localStorage.getItem('user'));
        } else {

        }
    }

    function switchToClair() {
        document.querySelector('#mode span').textContent = clair;
        // remove la class sombre & add la clair
        // (document.body.classList.contains('dark')?document.body.classList.remove('dark'):'');
        // document.body.classList.add('clair');
        document.body.classList.toggle('clair', true);
        document.body.classList.toggle('dark', false);
        localStorage.setItem('theme', 'clair')
        console.log('\tCAS DARK - ', document.body.classList);
    }

    function switchToDark() {
        document.querySelector('#mode span').textContent = sombre;
        // (document.body.classList.contains('clair')?document.body.classList.remove('clair'):'');
        // document.body.classList.add('dark');
        document.body.classList.toggle('dark', true);
        document.body.classList.toggle('clair', false);
        localStorage.setItem('theme', 'dark');
        console.log(`localStorage.getItem('theme') : ${localStorage.getItem('theme')}`);
        // document.body.classList.replace('clair', 'dark');
        console.log('\tCAS CLAIR - ', document.body.classList);
    }
    
    // fonction affichage etc
    function switchButtonLabel () {
        let actualTheme = document.querySelector('#mode span');
        actualTheme = actualTheme.textContent;
        console.warn(`actualTheme : ${actualTheme}`);

        // get le theme actuel et set l'autre
        switch(actualTheme) {
            case (sombre):
                switchToClair();
                break;
            case(clair):
                switchToDark();
                break;
            default:
                console.warn('woopsie thème hors des cordes');
        }
    }

    // document.body.classList.contains('dark');

    /* bouton + évenement */
    let modeBtn = document.querySelector('#mode');
    modeBtn.addEventListener('click', switchButtonLabel);

    /* Ajoutd'un bouton pour effacer le LocalStorage */
    let deleteBtn = document.createElement('button');
    deleteBtn = $(deleteBtn); // convertir en utilisable par jQuery
    deleteBtn.html('Effacer préférence de thème'); 
    deleteBtn.appendTo($('#thisDiv'));

    deleteBtn.click(function (e) { 
        if(confirm('Effacer les préférences ?')) {
            localStorage.removeItem('theme');
            localStorage.removeItem('user');
            console.warn('préférences oubliées.');
        }        
    });

    /* Ajoutd'un bouton pour nom user */
    let usernameBtn = document.createElement('button');
    usernameBtn = $(usernameBtn); // convertir en utilisable par jQuery
    usernameBtn.html('Username'); 
    usernameBtn.appendTo($('#thisDiv'));

    usernameBtn.click(function (e) { 
        let username = prompt('Nom du user ?');
        if(username) {
            localStorage.setItem('user',username);
            $('p[class="mt-3"]').text('Bonjour '+username);
            console.warn('Name set to ', username);
        }        
    });

    /* Ajout de la géoloc */
    if('geolocation' in navigator) {
        const options = {
            enableHighAccuracy: true,
            maximumAge: 10000
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // create div
                let newDiv = document.createElement('div');
                newDiv = $(newDiv); // convertir en utilisable par jQuery
                newDiv.addClass('row justify-content-center').attr('id', 'newDiv').insertAfter($('#thisDiv'));
                // console.log('document.querySelector(\'#newDiv\') : ',document.querySelector('#newDiv'));
                
                let newSpan = document.createElement('p');
                let phraseGeoloc = 'User\'s coordinates :\n\tLat : '+pos.coords.latitude+'\n\tLong : '+pos.coords.longitude;
                newSpan.textContent = phraseGeoloc;
                // newSpan.classList = 'dark';
                document.querySelector('#newDiv').appendChild(newSpan);
                
            },
            errorFunc,
            options
        );
    } else {
        console.console.warn('no geoloc available');
    }

    function errorFunc () {
        console.error('Vous avez refusé la géoloc');
    }

})