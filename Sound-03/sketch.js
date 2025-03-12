let noise1, noiseEnv, filt1;
let heli, imageOn = false;
let startContext;

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

  startContext = createButton("Start Audio Context");
  startContext.position(0,0);
  startContext.mousePressed(startAudioContext);
}

function draw() {
  background(220);
  if (imageOn) {
    scale(0.5);
    image(heli, 500, 500);
  }
}

function mouseClicked() {
  noiseEnv.triggerAttackRelease(4);
  imageOn = true;
}

function startAudioContext() {
  if(Tone.context.state != 'running') {
    Tone.start();
    console.log("Audio context started");
  }
  else {
    console.log("Audio context is already running");
  }
}
