var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["9a379ab5-0384-4848-99d2-4b2f80f4528f","427f617a-55a9-4142-8850-2a2a4abc8f0c","f785c664-e58b-4d64-8190-cf21c6f99914","bbfaa75b-3529-4771-a3a6-a4cf8b7b780a"],"propsByKey":{"9a379ab5-0384-4848-99d2-4b2f80f4528f":{"name":"Key","sourceUrl":null,"frameSize":{"x":63,"y":65},"frameCount":1,"looping":true,"frameDelay":12,"version":"cbLRO9O6ZwxXaVwhL3m2OPaJgwOAESI5","categories":["household_objects"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":63,"y":65},"rootRelativePath":"assets/9a379ab5-0384-4848-99d2-4b2f80f4528f.png"},"427f617a-55a9-4142-8850-2a2a4abc8f0c":{"name":"Boy1","sourceUrl":null,"frameSize":{"x":136,"y":400},"frameCount":1,"looping":true,"frameDelay":12,"version":"kxaIhX73Dkxy9y1HT6jBIyXLh1zheXqL","categories":["people"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":136,"y":400},"rootRelativePath":"assets/427f617a-55a9-4142-8850-2a2a4abc8f0c.png"},"f785c664-e58b-4d64-8190-cf21c6f99914":{"name":"Closed_Door","sourceUrl":null,"frameSize":{"x":256,"y":406},"frameCount":1,"looping":true,"frameDelay":10,"version":"yZpUdGk3DVUOmNEYeD3yKyWeawvJ9r.8","loadedFromSource":true,"saved":true,"sourceSize":{"x":256,"y":406},"rootRelativePath":"assets/f785c664-e58b-4d64-8190-cf21c6f99914.png"},"bbfaa75b-3529-4771-a3a6-a4cf8b7b780a":{"name":"Open_Door","sourceUrl":null,"frameSize":{"x":359,"y":378},"frameCount":1,"looping":true,"frameDelay":12,"version":"MChmPNpQo0VnSBCp7tqawO35kO6c8LQK","loadedFromSource":true,"saved":true,"sourceSize":{"x":359,"y":378},"rootRelativePath":"assets/bbfaa75b-3529-4771-a3a6-a4cf8b7b780a.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var player;
var keySprite,door;
var gameState = 'play';
  door = createSprite(190,50,30,80);
  door.setAnimation("Closed_Door");
  door.scale = 0.4;
  player = createSprite(208,192,40,40);
  player.setAnimation("Boy1");
  player.scale = 0.2;
  keySprite = createSprite(43,206,10,10);
  keySprite.visible = false;
  keySprite.setAnimation("Key");
  keySprite.scale = 1;
  var backGround = "white";
function draw() {
  background(backGround);
   if(keyDown("b")){
   var colours = ["cyan","red","pink","limegreen"];
   var randNum = floor(random(0,4));
   backGround = colours[randNum];
  }
  
  if(gameState === 'play'){
    textSize(12);
  fill("black");
  text("Search for the key to escape",240,36);
  }
  
  if(keyDown("UP_ARROW")&& gameState === 'play'){
    player.y = player.y-5;
  }
  else if(keyDown("DOWN_ARROW")&& gameState === 'play'){
    player.y = player.y+5;
  }
  else if(keyDown("LEFT_ARROW")&& gameState === 'play'){
    player.x = player.x-5;
  }
  else if(keyDown("RIGHT_ARROW")&& gameState === 'play'){
    player.x = player.x+5;
  }
  
  if(keySprite.isTouching(player)){
    gameState = 'end';
    fill("white");
    strokeWeight(3);
    stroke("black");
    textSize(17);
    text("PRESS SPACE",25,120);
  }
  if(keyDown("SPACE")&& gameState === 'end'){
    door.setAnimation("Open_Door");
    gameState = 'escaped';
    keySprite.destroy();
  }
  if(keyDown("UP_ARROW")&& gameState === 'escaped'){
    player.y = player.y-5;
  }
  else if(keyDown("DOWN_ARROW")&& gameState === 'escaped'){
    player.y = player.y+5;
  }
  else if(keyDown("LEFT_ARROW")&& gameState === 'escaped'){
    player.x = player.x-5;
  }
  else if(keyDown("RIGHT_ARROW")&& gameState === 'escaped'){
    player.x = player.x+5;
  }
  
  if(gameState === 'escaped' && player.isTouching(door)){
    gameState = 'over';
    textSize(20);
    text("YOU ESCAPED",200,200);
    player.visible = false;
    door.visible = false;
  }
  if(gameState === 'over'){
    //playSound("mixkit-winning-notification-2018-(online-audio-converter.com).mp3",false);
  }
  //console.log(player.x,player.y);
  drawSprites();
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
