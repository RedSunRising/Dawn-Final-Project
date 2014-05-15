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
        p.size(500, 325);
        c1 = p.color(0);
        c2 = p.color(153, 50, 204);
        //setGradient(0, 0, 1000, 325, c1, c2, Y_AXIS);
    };
 
    function draw(){
 
        setGradient(0, 0, 500, 325, c1, c2, Y_AXIS);
        drawSpectrum(array);
    };
 
    javascriptNode.onaudioprocess = function() {
 
        // array to get the frequencies
        array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        return array;
 
    };
 
    function drawSpectrum(array) {
      var average = 0;
        for ( var i = 0; i < array.length; i++ ){
 
          // Drawing the original spectrogram
          // value = array[i];
          // p.fill(0);
          // p.noStroke();
          // p.rect(i*2.5, 0, 2, 325-value);
          
           Drawing arcs whose hue is proportional to the intensity
           p.noFill();
           p.stroke(array[i]);
           p.strokeWeight(0.5);
           p.arc(p.width/2.0, p.height/2.0, i*2, i*2, p.radians(0), p.radians(360));
 
          // Drawing counterRotating boxes proportional to frequency
/*          var counterRotate = 1;
          if (array[i] < 255/2) { counterRotate = -1; } // Counterrotate if the power is < 255/2
 
          if ((i % 10) === 0) {
              drawCross(
                p.width/2,
                p.height/2,
                i*2, array[i],
                10*array[i]/255,
                p.radians(p.millis()*array[i]/512 * counterRotate)
                );
          }
        }*/
 
        // Computing the average frequency
        // average += array[i]/255.0*(86.13*i);
 
        // Print the average pitch being played
        // document.getElementById('freq').innerHTML = average/array.length;
 
        // Draw a circle whose radius is proportional to the average frequency being played
        // p.fill(255,200,100);
        // p.ellipse(p.width/2.0, p.height/2, average/10000, average/10000);
    }
 
    function drawCross(x, y, radius, color, size, angle) {
      var numBoxes = 4;
      for (var i = 0; i < numBoxes; i++) {
        p.fill(color);
        p.rect(x + radius*p.cos(angle + i/numBoxes*p.TWO_PI), y + radius*p.sin(angle + i/numBoxes*p.TWO_PI), size, size);
      }
    }
 
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