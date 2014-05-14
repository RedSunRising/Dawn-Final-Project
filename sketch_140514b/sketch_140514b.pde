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
size(1280, 760, P3D);
 minim = new Minim(this);

song = minim.loadFile("07 The Clairvoyant.mp3");
song.play();

fft = new FFT(song.bufferSize(), song.sampleRate());
x = new float[fft.specSize()];
y = new float[fft.specSize()];
angle = new float[fft.specSize()];
frameRate(240);
}
 
void draw() {
  
  background(0);
  fft.forward(song.mix);
  doubleAtomicSprocket();
}
   
void doubleAtomicSprocket() {
  
  pushMatrix();
  translate(width/2, height/2);
  
  for (int i = 0; i < fft.specSize() ; i++) {
    y[i] = y[i] + fft.getBand(i)/100;
    x[i] = x[i] + fft.getFreq(i)/100;
    angle[i] = angle[i] + fft.getFreq(i)/2000;
    
    rotateX(sin(angle[i]/2));
    rotateY(cos(angle[i]/2));
    fill(fft.getFreq(i)*2, 0, fft.getBand(i)*2);
    pushMatrix();
    translate((x[i]+50)%width/3, (y[i]+50)%height/3);
    box(fft.getBand(i)/20+fft.getFreq(i)/15);
    popMatrix();
  }
  
  //popMatrix();
  //pushMatrix();
  translate(width/2, height/2, 0);
  
  for (int i = 0; i < fft.specSize() ; i++) {
    y[i] = y[i] + fft.getBand(i)/1000;
    x[i] = x[i] + fft.getFreq(i)/1000;
    angle[i] = angle[i] + fft.getFreq(i)/100000;
    rotateX(sin(angle[i]/2));
    rotateY(cos(angle[i]/2));
    
    fill(0, 255-fft.getFreq(i)*2, 255-fft.getBand(i)*2);
    pushMatrix();
    translate((x[i]+250)%width, (y[i]+250)%height);
    box(fft.getBand(i)/20+fft.getFreq(i)/15);
    popMatrix();
  }
  
  popMatrix();
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
