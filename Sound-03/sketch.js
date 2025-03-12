let noise1, noiseEnv, filt1;
let heli, imageOn = false;

function preload() {
  heli = loadImage("media/helicopter.png");
}

function setup() {
  createCanvas(500, 500);
  imageMode(CENTER);
  filt1 = new Tone.AutoFilter({
    frequency: 6,
    depth: 0.6,
    baseFrequency: 150,
    octaves: 2.5
  }).toDestination().start();
  noiseEnv = new Tone.AmplitudeEnvelope({
    attack: 2.5,
    decay: 0.6,
    sustain: 0.3,
    release: 0.8
  }).connect(filt1)
  noise1 = new Tone.Noise().connect(noiseEnv).start();
}

function draw() {
  background(220);
  if (imageOn) {
    scale(0.5);
    image(heli, 500, 500);
  }
}

function mouseClicked() {
  Tone.Start();
  console.log("tone start");
  noiseEnv.triggerAttackRelease(4);
  imageOn = true;
}
