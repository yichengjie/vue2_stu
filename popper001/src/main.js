var Popper = require('popper.js') ;//popper.js


function basic(){
    var reference = document.querySelector('.my-button');
    var thePopper = new Popper(
        reference,
        {
            content: ' hello world My awesome popper!'
        },
        {
            // popper options here
        }
    );
}

function advanced(){
    var reference = document.querySelector('.my-button');
    var popper = document.querySelector('.my-popper');
    var anotherPopper = new Popper(
        reference,
        popper,
        {
          top: 0,
            // popper options here
        }
    );
}


function callbacks(){
    var reference = document.querySelector('.my-button');
    var popper = document.querySelector('.my-popper');
    var anotherPopper = new Popper(reference, popper).onCreate(function(instance){
        console.info('instance : ' ,instance) ;
        // instance is Popper.js instance
    }).onUpdate(function(data) {
        // data is an object containing all the informations computed by Popper.js and used to style the popper and its arrow
        console.info('data : ' ,data) ;
    });
}



advanced() ;
