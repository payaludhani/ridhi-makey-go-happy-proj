var PLAY=1;
var END=0;
var gameState;
var monkey, monkey_running, monkey_collided;
var banana, bananaImage;
var obstacle, obstacleImage;
var ground;
var bananaGroup, obstacleGroup;
var score;
function preload(){
  bananaImage=loadImage("banana.png");              
  obstacleImage=loadImage("obstacle.png");
  monkey_running=loadImage("sprite_1.png","sprite_2.png","sprite_3.png");
   monkey_collided=loadImage("sprite_0.png")
}

function setup(){
  createCanvas(500,500);
   monkey=createSprite(100,400,20,20);
  
   ground=createSprite(100,430,500,5);
  
  
  bananaGroup=createGroup();
  obstacleGroup=createGroup();
  
  monkey.addImage("mo",monkey_running);
  monkey.addImage("co",monkey_collided);
  monkey.scale=0.1;
  score = 0;
  monkey.debug=false;
  
}

function draw(){
  background("lavender");
  textSize(15);
  text("Score: "+ score, 400,50);
  
  
  ground.velocityX=-6;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  score = score + Math.round(getFrameRate()/60);
 ground.velocityX=-(4+3*score/100);
     monkey.velocityY = monkey.velocityY + 0.9;
  
    
    
    if(gameState===END){
      obstacleGroup.setVelocityXEach(0);
      bananaGroup.setVelocityXEach(0);
      
     obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
      
      ground.velocityX=0;
      monkey.velocityY=0;
      
      
    }
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
       
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
    }
  
  monkey.collide(ground);
 obstacles();
      banana();
  drawSprites();
  
}

function banana(){
  if(frameCount%80===0){
   var banana=createSprite(510,200,20,20);
  banana.addImage("ba", bananaImage);
  banana.scale=0.1;
  banana.y=Math.round(random(300,120));
  banana.velocityX=-6;
  banana.lifetime=400;
   banana.velocityX=-(4+3*score/100);
  bananaGroup.add(banana);
  }
  
}
function obstacles(){
  if(frameCount%60===0){
  var obstacle=createSprite(510,410,20,20);
  obstacle.addImage("ob", obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-6;
  obstacle.lifetime=400;
    obstacle.velocityX=-(4+3*score/100);
  obstacleGroup.add(obstacle);
  }
}








