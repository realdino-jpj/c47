var tree ;
var treeImg;
var swordImg;
var charaterImg;
var backgroundImg;
var sword;
var health = 5;
var shot;
var berserk_emy;
var berserk_emyImg;
var enemyH = 2;
hungerNum = 9;
var hunger ;
var a;
var b;
var c;
var ground;
var PC;
var edges;
var leftEdges;
var rightEdges;
var portal;
var portalNum = 2;
var portalImg;
var gameState = "start";
var dragonImg;
var dH = 2;
var particles = [];
var slashSound;
var monsterSound;
var endBall;
var backMusic;
var ef = 2;
function preload(){
 treeImg = loadImage("Tree.png");
swordImg = loadImage("sword.png");
charaterImg = loadImage("character.png");
backgroundImg = loadImage("background2.png");
berserk_emyImg = loadImage("berserker.png");
portalImg = loadImage("portal.png");
dragonImg = loadImage("dragon.png");
slashSound = loadSound("slash.mp3");
monsterSound = loadSound("growl.mp3");
backMusic = loadSound("back.mp3");
}
function setup(){
    createCanvas(500,500);
    createEdgeSprites();
    monsterSound.play();
    backMusic.play();
    b = createSprite(100,100,10,10);
    b.velocityX = 6;

     leftEdges = createSprite(0,250,10,600);
     rightEdges = createSprite(500,250,10,600);
ground = createSprite(250,480,1000,20);
ground.visible = false;
tree = createSprite(250,400,20,20);
tree.addImage("tree", treeImg)
tree.scale = 0.2;
PC = createSprite(20,380,20,30);

PC.setCollider("rectangle",0,0,30,30);
PC.debug = true;
berserk_emy = createSprite(400,450,20,30);
berserk_emy.addImage("a",berserk_emyImg );
berserk_emy.scale = 0.3
berserk_emy.collide(ground);

berserk_emy.setCollider("rectangle", 0,0,20,30);
berserk_emy.debug = true;

 hunger = createSprite(400,100,90,30);
 a = createSprite(100,100,10,10);
a.velocityX = 5;
a.visible = false;
c = createSprite(370,100,10,10);
tree.collide(ground);
shot = createSprite(10,10,10,10);
portal = createSprite(400,400,50,50);
portal.visible = false;
endBall = createSprite(100,250,10,10);
endBall.visible = false;
}
function draw(){
background(backgroundImg);
PC.collide(ground);
fill("red");
text ("hunger:"+ hungerNum,400,50);

text("health : " + health, 400, 150);
console.log(enemyH);

if(a.isTouching(hunger)&& hungerNum > 0){
    hunger.width -= 10;
    a.destroy();
    a = createSprite(100,100,10,10);
    a.velocityX = 5;
    a.visible = false;
    hungerNum = hungerNum-1;
    
}
PC.velocityX = 0;
PC.velocityY = 0;
PC.collide(ground);
if (keyDown(RIGHT_ARROW)){
PC.velocityX = 3;


}
if (keyDown(LEFT_ARROW)){
    PC.velocityX = -3;
    
    
    }
    if(keyDown(UP_ARROW)){
PC.velocityY = -4;
        
    }
    
    PC.velocityY = PC.velocityY + 2

    
if(keyCode === 67){
tree.destroy();
Sword();
ef = 1;

}

if ( PC.x > 250){

berserk_emy.velocityX = -3;

}
if ( PC.isTouching(berserk_emy)&& PC.x > 250){
    

    berserk_emy.velocityX = 3;

    
    }

    if (berserk_emy.isTouching(leftEdges)){
berserk_emy.velocityX = 3;

    }
    if (berserk_emy.isTouching(rightEdges)){
        berserk_emy.velocityX = -3;
        
            }
    
    if(b.isTouching(c)){
        
        b.destroy();
         b = createSprite(100,100,10,10);
        b.velocityX = 5;
        b.visible = false;
    shot.destroy();
        shot = createSprite(berserk_emy.x,berserk_emy.y,10,10);
        if(berserk_emy.velocityX < 0){
shot.velocityX = berserk_emy.velocityX -2;

        }
        if(berserk_emy.velocityX > 0){
            shot.velocityX = berserk_emy.velocityX +2;
            
                    }

    }

    if (PC.isTouching(shot)){
shot.destroy();
      health = health-1;
gameState = "end";
    }
    
    if(keyCode === 32 && PC.isTouching(berserk_emy)&& ef === 1){

        enemyH = enemyH - 1;
        slashSound.play();
        
    }

if (enemyH === 0){
berserk_emy.destroy();
b.destroy();

      PC.x = 50;  
      enemyH = 2;
    dH = 1;




}
if (dH === 1){

    var p = new Particle();
    particles.push(p);


for(let i =0; i < particles.length; i++){
particles[i].update();
particles[i].show();
if(particles[i].finished()){
// remove this particle
particles.splice(i,1);


}

}
endBall.velocityX = 3;
if(endBall.x > 500){
endBall.destroy();
dH = 2;

gameState = "WIN";

}


}

if(gameState === "WIN"){
    textSize(30);
    fill ("black");
    text("You Win", 250,250);
    
    }
if (health === 0){
gameState = "Lose";



}
if(gameState === "Lose"){
    textSize(30);
    fill ("black");
    text("You Lose", 250,250);
berserk_emy.velocityX = 0;



}


drawSprites();
}

function Sword(){
    sword = createSprite(250,430,20,20);
sword.addImage("sword", swordImg);
sword.scale = 0.08;

if (sword.isTouching(PC)){

    PC.addImage("PC",charaterImg);
    PC.scale = 0.2;
    sword.destroy();
   PC.collide(ground);
 
    }


}


