let cyclops;
let guy;
let meatboy;
let character;
let character2;
let character3;
let flipped = 1;

function preload() {
  cyclops = loadImage("media/cyclops.png");
  guy = loadImage("media/guy.png");
  meatboy = loadImage("media/meatboy.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  character = new Character(random(80, width-80),random(80, height-80));
  character.addAnimation("down", new SpriteAnimation(cyclops, 6, 5, 6));
  character.addAnimation("up", new SpriteAnimation(cyclops, 0, 5, 6));
  character.addAnimation("left", new SpriteAnimation(cyclops, 1, 0, 8));
  character.addAnimation("right", new SpriteAnimation(cyclops, 1, 0, 8));
  character.addAnimation("stand", new SpriteAnimation(cyclops, 0, 0, 1));
  character.currentAnimation = "stand";

  character2 = new Character(random(80, width-80),random(80, height-80));
  character2.addAnimation("down", new SpriteAnimation(guy, 6, 5, 6));
  character2.addAnimation("up", new SpriteAnimation(guy, 0, 5, 6));
  character2.addAnimation("left", new SpriteAnimation(guy, 1, 0, 8));
  character2.addAnimation("right", new SpriteAnimation(guy, 1, 0, 8));
  character2.addAnimation("stand", new SpriteAnimation(guy, 0, 0, 1));
  character2.currentAnimation = "stand";

  character3 = new Character(random(80, width-80),random(80, height-80));
  character3.addAnimation("down", new SpriteAnimation(meatboy, 6, 5, 6));
  character3.addAnimation("up", new SpriteAnimation(meatboy, 0, 5, 6));
  character3.addAnimation("left", new SpriteAnimation(meatboy, 1, 0, 8));
  character3.addAnimation("right", new SpriteAnimation(meatboy, 1, 0, 8));
  character3.addAnimation("stand", new SpriteAnimation(meatboy, 0, 0, 1));
  character3.currentAnimation = "stand";
}

function draw() {
  background(220);

  character.draw();
  character2.draw();
  character3.draw();
}

function keyPressed() {
  character.keyPressed();
  character2.keyPressed();
  character3.keyPressed();
}

function keyReleased() {
  character.keyReleased();
  character2.keyReleased();
  character3.keyReleased();
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "up":
          this.y -= 2;
          break;
        case "down": 
          this.y += 2;
          break;
        case "left":
          flipped = -1;
          this.x -= 2;
          break;
        case "right":
          flipped = 1;
          this.x += 2;
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case UP_ARROW:
        this.currentAnimation = "up";
        break;
      case DOWN_ARROW:
        this.currentAnimation = "down";
        break;
      case LEFT_ARROW:
        this.currentAnimation = "left";
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        break;
    }
  }
  
  keyReleased() {
    this.currentAnimation = "stand";
    //this.animations[this.currentAnimation].flipped = 1;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
  }

  draw() {

    let s = flipped;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}