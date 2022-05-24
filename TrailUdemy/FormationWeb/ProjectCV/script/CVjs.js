$(function() {
    'use strict';
    console.warn('CV bootstrap');

    /* TOOLTIPS */
    let tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    /* allow focus when opening MODALS */
    // var myModal = document.getElementById('exampleModal');
    // var myInput = document.getElementById('myInput');

    // myModal.addEventListener('shown.bs.modal', function () {
    //     myInput.focus();
    // });

    let img100 = $('.img100');
    img100.mouseover(function() {
        img100.animate({
            left: '10px',
            // width: '+=10px'
        }, 200);
    }).mouseout(function() {
        img100.animate({
            left: '-0.8px',
            // width: '-=10px'
        }, 200);
    });


})