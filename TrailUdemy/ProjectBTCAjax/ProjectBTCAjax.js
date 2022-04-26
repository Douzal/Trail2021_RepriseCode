jQuery(document).ready(function($) {
    
    
    let priceLabel = $('#price_label')[0];
    const url = 'https://blockchain.info/ticker';
    // priceLabel.textContent = url.substring(7,15);
    let reponse;
    
    setInterval(function() {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status == 200) {
                    reponse = request.response;
                    let lastPrixEur = reponse.EUR.last;
                    priceLabel.textContent = lastPrixEur
                    console.log(`prix actualisé ${lastPrixEur}`);
                } else {
                    priceLabel.textContent = `Arreur API - Code erreur ${request.status} - 0`;
                }
            }
        };
    }, 1000)
});