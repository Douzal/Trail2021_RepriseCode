// scriptSpoiler
window.onload = function get_body() {
    console.log("hello spoiler");
    let body = window.document.body;
    let btn = document.createElement('button');
    btn.innerHTML = 'Afficher';

    let p = document.createElement('p');
    p.textContent = 'texte caché';
    // p.setAttribute('hidden', false);
    p.style.visibility = 'hidden';

    body.append(btn);
    body.append(p);

    // evenement
    btn.addEventListener('click', traitement);

    let hidden = true;

    function traitement() {
        hidden = !hidden;
        if(hidden) {
            // cacher
            // p.setAttribute('hidden', true);
            p.style.visibility = 'visible';
            btn.textContent = 'Afficher';
        } else {
            // montrer
            // p.setAttribute('hidden', false);
            p.style.visibility = 'hidden';
            btn.textContent = 'Cacher';
        }
    }

}