var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;
var feedDogBtn, addFoodBtn;
var feedTime, lastFed;
var foodObj,foof,foodS;
var currentTime;

function preload(){
dogImg=loadImage("Dog.png");
dogImg1=loadImage("happy dog.png");

}


function setup() {
  database=firebase.database();
  createCanvas(1200,500);

  dog=createSprite(200,350,150,150);
  dog.addAnimation("dog1",dogImg);
  dog.addAnimation("dog2",dogImg1);
  dog.scale=0.3;


  feedDogBtn = createButton("Feed The Dog");
  feedDogBtn.position(360, 70);
  feedDogBtn.mousePressed(feedDog);

  addFoodBtn = createButton("Add Food!");
  addFoodBtn.position(750,70);
  addFoodBtn.mousePressed(addFoodS);

  foodObj = new Food();
  food = database.ref("Food");
  food.on("value",readStock);
 
  currentTime = hour();
}


function draw() {
  background(46,139,87);

  if (foodS === 0) {
    dog.changeAnimation("dog1",dogImg);
  }


  foodObj.display();

  fedTime = database.ref("Lastfed");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })
 


  drawSprites();
  fill(255,255,254);
  stroke("black");
  text("Food Remaining : "+foodS,300,490);
  textSize(15);
  fill("purple");
   


    if (lastFed >= 12) {
      text("Last Fed Time: " + lastFed % 12 + "PM", 10, 450);
    } else if (lastFed === 0) {
      text("Last Fed Time: 12 AM", 250, 50);
    } else {
      text("Last Fed Time: " +lastFed + " AM",10,450);
    }
}


//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  if (foodS < 0) {
    foodS = 0
  }
}

function feedDog(){
  dog.changeAnimation("dog2",dogImg1);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    LastFed: hour()
  })
}


function addFoodS(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}
