//Create variables here
var database;
var dog1,dog2;
var I,I2
var FoodS
var foodStock,lastFed,foodObj,FoodStock
var feedDog,addFoods
var feed,addFood
var dog,FoodS,F1
function preload()
{
  //load images here
  I=loadImage("dogImg.png")
  I2=loadImage("dogImg1.png")
}

function setup() {
	createCanvas(800,600);
  database=firebase.database();
  var location=database.ref("Food")
  location.on("value",readStock)
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  dog1 = createSprite(400,500,20,20);
  dog1.addImage(I)
  dog1.scale=0.2
  feed=createButton("Feed the dog");
  feed.position(700,200);
  feed.mousePressed(feedDog,writeStock);
  addFood=createButton("Add Food");
  addFood.position(800,200);
  addFood.mousePressed(addFoods)
}


function draw() {  
   background(0,255,0)
   textSize(20)
   fill(0,0,0)
   text("Note:Press UP_ARROW Key To Feed Drago Milk",200,50)
  // if(mousePressed(writenStock)){
    //writeStock(FoodS)
    //dog1.addImage(I2);
    //}
  drawSprites();
 
  text("Foodremaning:"+FoodS,170,250)
  fill(255,255,254)
  textSize(15)
  if(lastFed>=12){
    text("last Feed :"+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else {
    text("last Feed :"+ lastFed +"AM",350,30)  
  }
}
function readStock(data){
FoodS=data.val();
}
function writeStock(){

  if(x<=0){
    x:0;
  }else{
    x=x-1
  }
database.ref("/").update({
  Food:x
})
}
function feedDog(){
  dog1.addImage(I2)
   
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodStoke(), 
  FeedTime:hour()
  })
}
function addFoods(){
  FoodS++;
  database.ref('/').update({
    Food:FoodS
  })
}