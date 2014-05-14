//import Minim library
import ddf.minim.*;
  
//for displaying the sound's frequency
import ddf.minim.analysis.*;

Minim minim;
  
//to make it play song files
AudioPlayer song;
  
//for displaying the sound's frequency
FFT fft;

float[] angle;
float[] x, y;

void setup() {
//sketch size
size(1280, 760);
 minim = new Minim(this);

song = minim.loadFile("07 The Clairvoyant.mp3");
song.play();

fft = new FFT(song.bufferSize(), song.sampleRate());
}
 
void draw() {
  
  background(0);
  fft.forward(song.mix);
  
  smooth();
  noStroke();
  ellipseMode(CENTER);
    
    for(int i=0; i < fft.specSize(); i++){
      ellipse(75*i, height - fft.getBand(i)*100-height/3, 
              song.left.get(i)*300, song.right.get(i)*300);
    }
}
   
 
void stop()
{
  //close the AudioPlayer you got from Minim.loadFile()
    song.close();
  
    minim.stop();
 
  //this calls the stop method that 
  //you are overriding by defining your own
  //it must be called so that your application 
  //can do all the cleanup it would normally do
    super.stop();
}
