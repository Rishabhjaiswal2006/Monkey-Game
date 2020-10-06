
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score
var back,backI;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 backI=loadImage("back2.png");
}



function setup() {
  createCanvas(400,400);
 
  back=createSprite(200,200,600,400);
  back.addImage(backI);
  back.scale=2;
  back.velocityX=-4;
  
   var survival_time=0;
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  
  ground.visible=false;
 
  foodGroup=new Group();
  obstacleGroup=new Group();    
  
  score=0;
}


function draw() {
  background("white");
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
   if(back.x<0){
    back.x=back.width/2;
  }
  if(keyDown("space")){
    monkey.velocityY=-16;
  }
  monkey.velocityY=monkey.velocityY+1;
  
  monkey.collide(ground);
  spawnFood();
  spawnStone();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
  
  if(obstacleGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        foodGroup.setVelocityXEach(0);
        obstacleGroup.setLifetimeEach(-1);
        foodGroup.setLifetimeEach(-1);
    back.velocityX=0;
    
    
    }
  
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate()) 
  
  
  drawSprites();
  text("Survival Time: "+ survivalTime, 120,50);
}
function spawnFood(){
  if(frameCount%80===0){
    banana=createSprite(600,250,40,40);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.scale=0.07;
    banana.velocityX=-6;
    banana.lifetime=100;
    banana.depth=monkey.depth;
    monkey.depth=banana.depth+1;
    foodGroup.add(banana);
    
  }
}
function spawnStone(){
  if(frameCount%200 === 0){
    obstacle=createSprite(800,320,40,40);
    obstacle.velocityX=-8;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.15;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
    
  }
}






