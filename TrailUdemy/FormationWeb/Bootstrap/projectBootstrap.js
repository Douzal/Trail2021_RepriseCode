$(function() {
    console.log('yes bootstrap');
    
    $('div .form-select').click(function (e) { 
        console.log('yes bootstrap 2');
        e.preventDefault();
        // console.log($(this).text());
        // $('#out').text($(this).text());

        console.log('fini loading');
        
    });

    /* TOOLTIPS */
    let tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    /* allow focus when opening MODALS */
    var myModal = document.getElementById('exampleModal');
    var myInput = document.getElementById('myInput');

    myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus();
    });
})