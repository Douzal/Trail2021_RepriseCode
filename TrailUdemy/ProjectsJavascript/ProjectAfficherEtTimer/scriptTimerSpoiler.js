window.onload = function completeBody() {
    console.log("hello js");
    let body = window.document.body;
    let btn = document.createElement('button');
    btn.innerHTML = capitalize('launch timer');

    /* some CSS */
    css(body, {
        'background-color':'rgb(10,10,155)',
        'color':'#ccc5af'
    });

    btn.className = 'btn btn-outline-primary btn-lg';
    document.querySelector('form').append(btn);

    // ajout evenement
    btn.addEventListener('click', start);


    // variable timer à décrémenter
    let compt;
    let inter;

    // fonctions
    function start(e) {
        e.preventDefault();
        stop();
        clearCompt();
        compt = parseInt(document.querySelector('#timer').value);
        console.log('Evenement : ', e.type);
        inter = setInterval(decompte, 500);;
    }

    function clearCompt () {
        let form = document.querySelectorAll('form p');
        for(let par of form) {
            par.remove();
        }
    }

    decompte = () => {
        if(compt!=0) {
            printCompt(compt);
            compt--;
        } else {
            stop();
            printCompt(capitalizeRestParam('stop'))
        }
    }

    printCompt = (compteur) => {
        let newLine = document.createElement('p');
        // no css file in this project
        css(newLine, {
            'margin-left':'3.5em',
            // 'text-align':'left',
            'font-family':'verdana',
            'color': 'white',
            'border-bottom':'0.1em solid' // '#d1cab7'
        }) 
        newLine.textContent = compteur;
        document.querySelector('form').append(newLine);
    }

    stop = () => {
        console.log('stop');
        clearInterval(inter);
        // compt=comptInit;
    }

    /* add style
    https://www.javascripttutorial.net/dom/css/add-styles-to-an-element */
    function css(element, style) {
        for (const property in style)
            element.style[property] = style[property];
    }

    /* transform a word : xxxx => Xxxx
    https://www.samanthaming.com/pictorials/how-to-capitalize-a-string/ */
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    /* transform a word : xxxx => Xxxx with Rest parameter ! Op
    https://www.samanthaming.com/pictorials/how-to-capitalize-a-string/ */
    function capitalizeRestParam([first, ...rest]) {
        return first.toUpperCase() + rest.join('').toLowerCase();
    }

    /* part Spoiler */
    let hideDiv = document.createElement('div');
    hideDiv.textContent = 'Woopsie';
    css(hideDiv, {
        'border':'2em solid blue',
        'border-radius':'0.2em',
        'margin':'0.3em',
        'position':'absolute',
        'top': '3em',
        'bottom':'50em',
        'max-width':'7em',
        'text-align':'center',
        // 'textContent':'Woopsie !',
        'visibility':'hidden'
    });
    body.append(hideDiv);


    // evenement
    let showHideBtn = document.querySelector('#showHideBtn');
    showHideBtn.addEventListener('click', traitement);

    let hidden = true;

    function traitement() {
        hidden = !hidden;
        if(hidden) {
            // cacher
            // p.setAttribute('hidden', true);
            hideDiv.style.visibility = 'visible';
            showHideBtn.textContent = 'Hide';
        } else {
            // montrer
            // p.setAttribute('hidden', false);
            hideDiv.style.visibility = 'hidden';
            showHideBtn.textContent = 'Show';
        }
    }
}