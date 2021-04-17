class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.milkImage=loadImage('Milk.png');
    }

   // to read food srtock from the db
    getFoodStock() {
      return this.foodStock;
    }

    //update food stock to db
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   display(){
    var x=580;
    var y=40;
    imageMode(CENTER);
    //image(this.milkImage,720,220,70,70);
    
    if(this.foodStock!=0){
      for(var i = 0; i < this.foodStock; i++){
        if(i % 10 === 0){
          x = 580;
          y = y + 50;
        }
        image(this.milkImage, x, y, 50, 50);
        x = x + 30;
      }
    }
  }
}