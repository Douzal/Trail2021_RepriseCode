$(function(){
    // console.info('hello cookies !');

    function loadCSS(cssName) {
        return new Promise((resolve, reject) => {
            
            // cssName
            let baliseStyle = document.createElement('link');
            baliseStyle.setAttribute('href', cssName);
            baliseStyle.setAttribute('rel', 'stylesheet');
            document.head.append(baliseStyle);
            
            baliseStyle.onload = () => resolve(console.info('css loaded'));    
            baliseStyle.onerror = () => reject(console.error('css not loaded')); 
        });    
    }

    loadCSS('Cookies.css').then(
        (ok) => console.log('yeap ', ok),
        (pasok) => console.log('nope ', pasok)
    );

    /* COOKIES */
    // creation
    document.cookie = 'prenom=Alexis';

    // modification
    document.cookie = 'prenom=Mark';

    // supprimer un cookie
    document.cookie = 'prenom=';

    // creation d'une date dans 1 an
    const oneYearInMilliSeconds = 31536000000;
    let demain = new Date(Date.now() + oneYearInMilliSeconds);
    demain = demain.toLocaleString('fr-FR', {
        // weekday:'short',
        year:'numeric',
        month:'numeric',
        day:'numeric'
    });
    demain = demain.toUTCString;
    // console.warn(`Date dans un an : ${demain}`);

    // options
    // valide un an
    document.cookie = 'prenom=Douzal; path=/chemin; domain=monUrl.com; expires='+demain;
    // avec max-age
    document.cookie = 'prenom=Douzal; path=/chemin; domain=monUrl.com; max-age='+oneYearInMilliSeconds;

    // secure : pour les https
    document.cookie = 'prenom=Douzal; secure'

    // console.info('document.cookie : ', document.cookie); // marche pas sans un serveur..



    /* localStorage */
    let prenom;
    prenom=localStorage.getItem('prenom');
    console.info(prenom);
    
    if(!prenom) {
        do {
            localStorage.setItem('prenom', prompt('quel est votre prénom ?'));
        } while(!localStorage.getItem('prenom'))
        
        prenom = localStorage.getItem('prenom');
        setPrenom('prenom');
        console.info(`ok prenom FIRST set :\n\t${prenom}`);
    } else {
        // prenom = localStorage.getItem(prenom),
        console.info(`ok prenom DEJA set :\n\t${prenom}`);
        setPrenom(prenom);
    }


    /* functions aux */
    function setPrenom (pren) {
        console.log('setPrenom function');
        $('#price_label').text(pren);
    }

    localStorage.clear();
    // console.trace();
});