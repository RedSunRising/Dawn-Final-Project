// drawing of the spectrum frequnecy analyszer

// set the processing sketch

var canvas = document.getElementsByTagName('canvas')[0];

function sketch(p){

    // global variables for the sketch
    var value = null;
    var array = new Array();
    var Y_AXIS = 1;
    var X_AXIS = 2;
    var b1 = null;
    var b2 = null;
    var c1 = null;
    var c2 = null;

    function setup(){
        p.size(1000, 325);
        b1 = p.color(255);
        b2 = p.color(0);
        c1 = p.color(204, 102, 0);
        c2 = p.color(0, 102, 153);

    };

    function draw(){

        p.background(0);
        //setGradient(50, 90, 540, 80, c1, c2, Y_AXIS);
        drawSpectrum(array);

    };
    javascriptNode.onaudioprocess = function() {

        // array to get the frequencies
        array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        return array;

    };

    function drawSpectrum(array) {
        for ( var i = 0; i < array.length; i++ ){
            value = array[i];

            //p.fill(255, 0, 0);
            setGradient(i*5, 325-value, 3, 325, c1, c2, Y_AXIS);
            p.rect(i*5,325-value,3,325);
        }
    };

    function setGradient(x, y, w, h, c1, c2, axis ) {

    //noFill();

    if (axis == Y_AXIS) {  // Top to bottom gradient
        for (var i = y; i <= y+h; i++) {
          var inter = p.map(i, y, y+h, 0, 1);
          var c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(x, i, x+w, i);
        }
      }  
      else if (axis == X_AXIS) {  // Left to right gradient
        for (var i = x; i <= x+w; i++) {
          var inter = p.map(i, x, x+w, 0, 1);
          var c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(i, y, i, y+h);
        }
      }
    }

    p.setup = setup;
    p.draw = draw;
};

var p = new Processing(canvas, sketch);