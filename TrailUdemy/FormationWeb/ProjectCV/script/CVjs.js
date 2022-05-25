$(function() {
    'use strict';
    console.warn('CV bootstrap');

    /* TOOLTIPS */
    // let tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    //     return new bootstrap.Tooltip(tooltipTriggerEl);
    // });

    /* MODALS */
    /*allow focus when opening MODALS */
    // var myModal = document.getElementById('exampleModal');
    // var myInput = document.getElementById('myInput');

    // myModal.addEventListener('shown.bs.modal', function () {
    //     myInput.focus();
    // });
    

    /* ANIMATE IMAGE */
    let img100 = $('.img100');
    img100.mouseover(function() {
        img100.stop(true, true); // allows to clear queue : https://api.jquery.com/stop/
        img100.animate({
            left: '10px',
            // width: '+=10px'
        }, 200);
    }).mouseout(function() {
        img100.stop(true, true);
        img100.animate({
            left: '-0.8px',
            // width: '-=10px'
        }, 200);
    });

    /* ANIMATE FORMATION'S BLOCKS */
    /* let animBlocks = $('.formation__block');
    console.log([animBlocks]);
    for(let block of animBlocks) {
        console.log(block);
        block.mouseover(function() {
            animBlocks.animate({
                left: '10px',
                // width: '+=10px'
            }, 200);
        }).mouseout(function() {
            animBlocks.animate({
                left: '-0.8px',
                // width: '-=10px'
            }, 200);
        });
    } */


})