let pSynth;
let filt, rev, volSlider;
let aCol=0, sCol=0, dCol=0, fCol=0, gCol=0, hCol=0, jCol=0, kCol=0;

let keyNotes = {
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

let activeKey = null;

function setup() {
  createCanvas(500, 500);
  colorMode(HSB);
  filt = new Tone.Filter(1250, "lowpass").toDestination();
  rev = new Tone.Reverb(2).connect(filt);
  pSynth = new Tone.PolySynth(Tone.Synth).connect(rev);
  pSynth.set({
    envelope: {
      attack: 0.1,
      decay: 0.1,
      sustain: 0.5,
      release: 0.1
    },
    oscillator: {
      type: 'sawtooth'
    }
  })
  pSynth.volume.value = -6;

  volSlider = createSlider(-10, 10, -6, 0.01);
  volSlider.position(190, 350);
  volSlider.input(() => {pSynth.volume.value = volSlider.value()});
}

function draw() {
  background(220);
  stroke(0);
  //a
  fill(0, aCol, 100);
  square(50, 250, 50);
  //s
  fill(25, sCol, 100);
  square(100, 250, 50);
  //d
  fill(50, dCol, 100);
  square(150, 250, 50);
  //f
  fill(100, fCol, 100);
  square(200, 250, 50);
  //g
  fill(170, gCol, 100);
  square(250, 250, 50);
  //h
  fill(250, hCol, 100);
  square(300, 250, 50);
  //j
  fill(280, jCol, 100);
  square(350, 250, 50);
  //k
  fill(320, kCol, 100);
  square(400, 250, 50);

  fill(0, 0, 100);
  text("C4", 68, 278);
  text("D4", 118, 278);
  text("E4", 168, 278);
  text("F4", 218, 278);
  text("G4", 268, 278);
  text("A4", 318, 278);
  text("B4", 368, 278);
  text("C5", 418, 278);

  fill(0);
  text("Press the keys to play!", 190, 200);
  text("a", 68, 238);
  text("s", 118, 238);
  text("d", 168, 238);
  text("f", 218, 238);
  text("g", 268, 238);
  text("h", 318, 238);
  text("j", 368, 238);
  text("k", 418, 238);
  text("Volume", 232, 340);
}

function keyPressed() {
  let pitch = keyNotes[key];
  pSynth.triggerAttack(pitch);
  switch(key) {
    case 'a':
      aCol = 100;
      break;
    case 's':
      sCol = 100;
      break;
    case 'd':
      dCol = 100;
      break;
    case 'f':
      fCol = 100;
      break;
    case 'g':
      gCol = 100;
      break;
    case 'h':
      hCol = 100;
      break;
    case 'j':
      jCol = 100;
      break;
    case 'k':
      kCol = 100;
      break;
  }
}
function keyReleased() {
  let pitch = keyNotes[key];
  pSynth.triggerRelease(pitch);
  switch(key) {
    case 'a':
      aCol = 0;
      break;
    case 's':
      sCol = 0;
      break;
    case 'd':
      dCol = 0;
      break;
    case 'f':
      fCol = 0;
      break;
    case 'g':
      gCol = 0;
      break;
    case 'h':
      hCol = 0;
      break;
    case 'j':
      jCol = 0;
      break;
    case 'k':
      kCol = 0;
      break;
  }
}