var PLAY=0;
var END=1;
var gameState=PLAY;
var sword,sword_image;
var alien,alien_image,alienGroup;
var fruit1,fruit2,fruit3,fruit4,fruitSprite,fruitGroup;
var gameOver,gameOver_image;
var cutSound,overSound;
var score=0;

function preload(){
  sword_image=loadImage("sword.png");
  alien_image=loadAnimation("alien1.png","alien2.png");
  gameOver_image=loadAnimation("gameover.png");
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  cutSound=loadSound("knifeSwooshSound.mp3")
  overSound=loadSound("gameover.mp3")
  
}
function setup(){
  createCanvas(600,600)
  sword=createSprite(300,300,20,20);
   sword.addImage(sword_image);
  sword.addAnimation("over",gameOver_image)
  sword.scale=0.8;
  
  fruitGroup= new Group();
  alienGroup= new Group();
}
function draw(){
 background("skyblue");
   if(gameState===PLAY){
     sword.x = World.mouseX;
  sword.y= World.mouseY;
     
    
     fruit();
     alienFunction();
     
     if(sword.isTouching(alienGroup)){
      alienGroup.destroyEach();
       fruitGroup.destroyEach();
       overSound.play();
       gameState=END;
    }
     if(sword.isTouching(fruitGroup)){
       fruitGroup.destroyEach();
       cutSound.play();
       score++;
     }
     
   }
  else if(gameState===END){
     sword.changeAnimation("over",gameOver_image);
     sword.x=300;
    sword.y=300;
  }
  drawSprites();
  text("Score:"+score,520,50)
}

function fruit(){
  if(frameCount%90===0){
   var randFruit= Math.round(random(1,2));
    switch(randFruit){
      case 1:fruitSprite=createSprite(600,random(20,370),20,20)
             fruitSprite.velocityX=-(6+score/4);
             fruitGroup.add(fruitSprite);
             fruitSprite.scale=0.2;
             fruitSprite.lifetime=100;
        break;
        case 2: fruitSprite=createSprite(0,random(20,370),20,20)
    fruitSprite.velocityX=+(6+score/4);
    fruitGroup.add(fruitSprite);
    fruitSprite.scale=0.2;
    fruitSprite.lifetime=100;
        break;
        default: break;
    }
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruitSprite.addImage(fruit1);
              break;
      case 2: fruitSprite.addImage(fruit2);
               break;
      case 3: fruitSprite.addImage(fruit3);
              break;
      case 4: fruitSprite.addImage(fruit4);
              break;
      default: break;
    }
  }
}

function alienFunction(){
  if(frameCount%40===0){
    var randAlien= Math.round(random(1,2))
    switch(randAlien){
      case 1: alien=createSprite(600,random(0,370),20,20)
                  alien.velocityX=-(6+score/5);
                  alien.addAnimation("alien",alien_image)
                  alienGroup.add(alien);
                  alien.shapeColor="green";
                  alien.lifetime=100;
        break;
        case 2: alien=createSprite(0,random(0,370),20,20)
    alien.velocityX=+(6+score/5);
    alien.addAnimation("alien",alien_image)
    alienGroup.add(alien);
    alien.shapeColor="green";
    alien.lifetime=100;
    }
   
   }
  
}