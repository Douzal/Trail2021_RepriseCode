window.onload = function get_body() {
    console.log("hello js");
    let body = window.document.body;
    let btn = document.createElement('button');
    btn.innerHTML = 'launch timer';

    // ajout evenement
    btn.addEventListener('click', start);
    body.append(btn);

    // variable timer à décrémenter
    const comptInit = 5;
    let compt = comptInit;
    let inter = null;

    // fonctions
    function start(e) {
        console.log('Evenement : ', e.type);
        inter = setInterval(decompte, 1000);;
    }

    decompte = () => {
        if(compt!=0) {
            console.log(compt);
            printCompt(compt);
            compt--;
        } else {
            stop();
            printCompt('stop')
        }
    }

    stop = () => {
        console.log('stop');
        clearInterval(inter);
        compt=comptInit;
    }

    printCompt = (compteur) => {
        let newLine = document.createElement('p');
        newLine.textContent = compteur;
        document.body.append(newLine);
    }
}