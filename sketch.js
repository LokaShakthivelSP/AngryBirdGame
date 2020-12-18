const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg;
var score = 0;

var birdFlying,birdSelect,pigSnort;

var birds=[];

function preload() {
    bg = loadImage("sprites/bg1.png");    
    birdFlying=loadSound("sounds/bird_flying.mp3");
    birdSelect=loadSound("sounds/bird_select.mp3");
    pigSnort=loadSound("sounds/pig_snort.mp3");
}

function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 505, 300, 170);

    box1 = new Box(700,520,70,70);
    box2 = new Box(920,520,70,70);
    box3 = new Box(700,440,70,70);
    box4 = new Box(920,440,70,70);
    box5 = new Box(810,380,70,70);

    pig1 = new Pig(810, 550);
    pig3 = new Pig(810, 420);

    log1 = new Log(810,460,300, PI/2);
    log3 =  new Log(810,380,300, PI/2);
    log4 = new Log(760,320,150, PI/7);
    log5 = new Log(870,320,150, -PI/7);

    bird = new Bird(200,250);
    bird2=new Bird(150,370);
    bird3=new Bird(100,370);

    birds.push(bird3);
    birds.push(bird2);
    birds.push(bird);

    slingshot = new SlingShot(bird.body,{x:200, y:250});
}

function draw(){
    background(bg);
   
        noStroke();
        textSize(35);
        fill("white");
        textAlign(CENTER);
        text("Score  " + score,900, 50);
        text("Destroy the pigs",600,70);
        textSize(20);
        fill("black");
        text("Press SPACE for next Bird",600,120);
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box1.score();

    box2.display();
    box2.score();
    
    ground.display();

    pig1.display();
    pig1.score();

    log1.display();
    log1.score();

    box3.display();
    box3.score();

    box4.display();
    box4.score();

    pig3.display();
    pig3.score();

    log3.display();
    log1.score();

    box5.display();
    box5.score();

    log4.display();
    log1.score();

    log5.display();
    log1.score();

    bird.display();
    if(displayHeight<displayWidth){
        bird2.display();
        bird3.display();
    }

    platform.display();
    //log6.display();
    slingshot.display(); 
    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(birds[birds.length-1].body, {x: mouseX , y: mouseY});
        Matter.Body.applyForce(birds[birds.length-1].body,birds[birds.length-1].body.position,{x:5,y:-5});
        gameState="onSling";
        return false;
    }
}


function mouseReleased(){
    slingshot.fly();
    birds.pop();
    if(gameState==="onSling"){
        birdFlying.play();
    }
    gameState = "launched";
    return false;
}

function keyPressed(){
    if(keyCode === 32 && gameState==="launched"){
        if(birds.length>=0){
            slingshot.attach(birds[birds.length-1].body);
            Matter.Body.setPosition(birds[birds.length-1].body,{x:200,y:250});
            gameState="onSling";
        }
    }
}

/*async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=15){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}*/