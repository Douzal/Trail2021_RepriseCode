$(function() {
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
    // console.log('localPreference : ', localPreference);
    // existence d'une file
    
    if(localPreference) {
        console.info('File de theme déjà créée en LocalStorage - Affichage en fonction');
        initTheme(localPreference);
    } else {
        console.info('PAS ENCORE de File de theme en LocalStorage');
    }
    
    //
    function initTheme(localPreference) {
        console.log('localPreference 22: ', localPreference);
        if(localPreference==localStorageDark) {
            switchToDark();
        } else if (localPreference==localStorageClair) {
            switchToClair();
        } else {
            console.log('moche');
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
            localStorage.setItem('theme','');
            console.warn('préférences oubliées.');
        }        
    });


    // console.group();
    // console.log(`END PROG -- localStorage.getItem('theme') : ${localStorage.getItem('theme')}`);
    // console.trace();
    // console.groupEnd();

})