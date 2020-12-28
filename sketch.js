var database ,dog,dog1,dog2
var position
var feed,add
var foodobject
var Feedtime
var Lastfeed,milk3,milk2,FoodS
var sadDog
var dogimg1,dogimg2
var gameState="PLAY"
//Create variables here

function preload(){
  //load images here
  dogimg1 = loadImage("dogImg.png")
  dogimg2 = loadImage("dogImg1.png")
  milk3 = loadImage("Milk.png");
	sadDog =loadImage("Lazy.png")
}

function setup() {
	createCanvas(1000, 500);
  database=firebase.database();
  var location=database.ref("Food")
  location.on("value",readStock)
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    Lastfeed=data.val();
  });
  readStock=database.ref('gameState');
  readStock.on("value",function(data){
    gameState=data.val();
  });

  foodobject=new Food()

 
  dog = createSprite(550,250,10,10);
  dog.addImage(dogimg1)
  dog.scale=0.2  
  
 

  var dog1 = database.ref('Food');
  dog1.on("value", readPosition, showError);
feed = createButton("FEED DRAGO")
feed.position(500,100)
feed.mousePressed(FeedDog)
add = createButton("ADD FOOD")
add.position(400,100)
add.mousePressed(AddFood)

milk2=createSprite(500,310,20,20)
milk2.addImage(milk3)
milk2.scale=0.1
milk2.visible = false;

} 



function draw(){
  background(46,139,87);

  
 foodobject.display()
 if (Lastfeed>=12){
  fill("black");
   text("last Feed :"+Lastfeed%12+"PM",100,30)
 }else if(Lastfeed ==0){
  fill("black");
   text("last Feed : 12 AM",100,30)
 }else {
  fill("black");
   text("last Feed : "+Lastfeed+"AM",100,30)
 }
  
// if (gameState!="Hungry"){
   //feed.hide();
   //add.hide();
   //dog.hide();
  // dog.addImage(sadDog)
 //}else {
   //feed.show();
   //addFood.show();
  
 
 fill("black");
 text("Milk Bottles Remaining  "+FoodS,170,440);
  fill(255,255,254);
 textSize(15);
drawSprites();
}
function readStock(data)
{
  FoodS = data.val();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
  console.log(position.x);
  
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
  
  milk2.visible = false;
  dog.addImage(dogimg1);
  FoodS++;
  database.ref('/').update({
    Food:FoodS
  })
  
}
function FeedDog(){
  FoodS--
  milk2.visible = true;
  
 
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
  Food:FoodS,
   Food:foodobject.getFoodStock(),
   FeedTime:hour()
 })
 dog.addImage(dogimg2)
}
function update(state){
database.ref('/').update({
  gameState:state
})
}
