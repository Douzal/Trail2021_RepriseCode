$(document).ready(() => {
    console.log('yo');


    var v = 1;
    var f1 = function() {
        console.log(v);
    }

    var f2 = function () {
        var v = 2;
        f1();
    };

    //f2(); // call de f2
}) 