$(function () {
    'use strict';
    // console.warn('yo les actrices !');

    let mainMenuItems = $('#main-menu ul li'); // teachers -> $('#main-menu ul').children('li');
    // console.table(mainMenuItems);
    let totalMainMenuItems = mainMenuItems.length; // we know it's 5
    let [act1, act2, act3, act4, act5, ...rest] = mainMenuItems;
    let openedIndex = -1;
    let newIndex;
    let init = function () {
        mainMenuItems.children('.images').click(function(e) {
            // console.log(e.type);
            console.log($(this));
            // newIndex = [mainMenuItems].indexOf($(this));
            newIndex = $(this).parent().index();
            console.log(newIndex);
        });
    };

    init();

})