    //var ctx = $("#canvas").get()[0].getContext("2d");

    // create a gradient for the fill. Note the strange
    // offset, since the gradient is calculated based on
    // the canvas, not the specific element we draw
 /*   var gradient = ctx.createLinearGradient(0,0,0,300);
    gradient.addColorStop(1,'#000000');
    gradient.addColorStop(0.75,'#ff0000');
    gradient.addColorStop(0.25,'#ffff00');
    gradient.addColorStop(0,'#ffffff');*/

    // set up the processing sketch
    function sketch(p){
        p.size(300, 300);
        p.background(0);
    }

    function draw(){

    }

    function clearRect(){
        p.rect(0, 0, 60, 130);
    }

    function drawRect(average){
        p.fill(50, 50, 50);
        p.rect()
    }

    // when the javascript node is called
    // we use information from the analyzer node
    // to draw the volume
    javascriptNode.onaudioprocess = function() {

        // get the average for the first channel
        var array =  new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        var average = getAverageVolume(array);

        // get the average for the second channel
        var array2 =  new Uint8Array(analyser2.frequencyBinCount);
        analyser2.getByteFrequencyData(array2);
        var average2 = getAverageVolume(array2);

        // clear the current state
        ctx.clearRect(0, 0, 60, 130);

        // set the fill style
        ctx.fillStyle=gradient;

        // create the meters
        ctx.fillRect(0,130-average,25,130);
        ctx.fillRect(30,130-average2,25,130);
    }