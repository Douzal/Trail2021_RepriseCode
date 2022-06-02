$(function () {
    'use strict';
    
    /* VARIABLES */
    let mainMenuItems = $('#main-menu ul li'), item, coloredImage, bwImage; // prof : $('#main-menu ul).children('li');
    let totalMainMenuItems = mainMenuItems.length; // we know it's 5
    // let [act1, act2, act3, act4, act5, ...rest] = mainMenuItems;
    let newIndex, openedIndex = 2;
    let itemParams, coloredImageParam;
    let speedParam = 250;
    
    /* FUNCTIONS */
    let init = function () {
        bindEvents();
        if(validIndex(openedIndex)) {
            item = mainMenuItems.eq(openedIndex);
            animateItem(item, true, 700);
        }
    };
    let validIndex = function (indexToCheck) {
        return (indexToCheck >= 0 && indexToCheck <= totalMainMenuItems)?true:false;
    };
    let animateItem = function (item, toOpen, speed) {
        coloredImage = item.find('.color');
        itemParams = toOpen?{ width : '420px'}:{ width : '140px'};
        coloredImageParam = toOpen?{ left : '0'}:{ left : '140px'};
        console.table(coloredImage);
        coloredImage.animate(coloredImageParam, speed);
        item.animate(itemParams, speed);
    };
    let checkAndAnimateItem = function(ind) {
        item = mainMenuItems.eq(ind);
        if(openedIndex == ind) { // === ?
            // close
            animateItem(item, false, speedParam);
            openedIndex = -1;
        } else {
            if(validIndex(ind)) {
                // close
                item = mainMenuItems.eq(openedIndex);
                animateItem(item, false, speedParam);
                openedIndex = ind;

                // open
                item = mainMenuItems.eq(ind);
                animateItem(item, true, speedParam)
            };
        }
    }

    /* this function bind events */
    let bindEvents = function () {
        /* main menu switch image clicked */
        mainMenuItems.children('.images').click(function(e) {
            newIndex = $(this).parent().index();
            checkAndAnimateItem(newIndex);
        });

        /* bottom buttons : cas par cas sur CHAQUE bouton en sélectionant
           pourtant bien .class, grâce au $(this) */
        $('.button').hover(
            // if IN
            function() {
                $(this).addClass('hovered');
            },
            // if OUT
            function () {
                $(this).removeClass('hovered');
            }
        );

        $('.button').click(function () {
                newIndex = $(this).index();
                checkAndAnimateItem(newIndex);
                
            }
        );
    };

    init();
    
})