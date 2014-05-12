// drawing of the spectrum frequnecy analyszer

// set the processing sketch

var canvas = document.getElementsByTagName('canvas')[0];

function sketch(p){

    // global variables for the sketch
    var value = null;
    var array = null;

    function setup(){
        p.size(1000, 325);
        p.background(0);
    };

    function draw(){

        p.background(0);

        function drawSpectrum(array) {
            for ( var i = 0; i < array.length; i++ ){
                value = array[i];

                p.fill(255, 0, 0);
                p.rect(i*5,325-value,3,325);
            }
        }

    };

    javascriptNode.onaudioprocess = function() {

        // array to get the frequencies
        array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);

};