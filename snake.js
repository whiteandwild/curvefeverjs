chance = 5
let holedelay
class Snake{
    constructor(owner ,Xpos , Ypos , color){
        this.speed = speed;
        this.color = color;
        this.Xpos = Xpos;
        this.Ypos = Ypos;
        this.owner = owner;
        this.angle = angle
        this.Linewidth = Linewidth;
        this.array=[];
        this.array.push([Xpos,Ypos , this.Linewidth]);
        this.split = false
        this.splited = false
        this.isDead = false
        this.Nocolide = false;
        this.vectorx
        this.vectory
        this.HeadX = Xpos
        this.HeadY =Ypos
        
    }
    add_position(a,b){
      this.array.push([a,b , this.Linewidth]);
    }
    async hole(){
      try{
        await delay(Math.floor(Math.random() * (5000 - 3500)) + 3500 ,this.owner)
        
        if((Math.floor(Math.random() * (10 - 1)) + 1)<=chance){
            console.log("Making hole")
            this.makehole();
        }
        if(!this.isDead){this.hole()}
    }
    catch{console.log("No hole")}
  }

    async makehole(){
        this.split = true; //dziury w szlaczku
        await sleep(250);
        this.split = false
        this.splited = true
    }
    move(angle)
  {
   // console.log(angle)
    if(this.isDead){return;}
  
    
    let b=this.array[this.array.length-1];
  
    // we take the vector of the previous moove

    // we apply a rotation matrix
    //let x=this.vectorx*Math.cos(angle)-this.vectory*Math.sin(angle)
    //let y=this.vectorx*Math.sin(angle)+this.vectory*Math.cos(angle)
   // console.log(`cos ${Math.cos(angle)} sin ${Math.sin(angle)}`)
    let x=this.vectorx*Math.cos(angle)-this.vectory*Math.sin(angle)
    let y=this.vectorx*Math.sin(angle)+this.vectory*Math.cos(angle)
    this.vectorx = x
    this.vectory = y
    // and add this new vector to the last coord
    
  
    let new_x=this.HeadX+(x) * this.speed

    let new_y=this.HeadY+(y) *this.speed

    this.HeadX = new_x
    this.HeadY = new_y


    
    // print("distance",((new_x-b[0])**2+(new_y-b[1])**2)**0.5)
    if(!this.split && !this.Nocolide){
    this.array.push([new_x,new_y , this.Linewidth]);}
    else if(this.split){(this.array[this.array.length - 1]).push(1);}
 // }
  }
  display()
  {
    
   let i = this.array.length - 2;
   // for(var i=1;i<this.array.length-1;i++)
 //  {
   if(!this.splited){
      snakes.strokeWeight(this.array[i][2]);
      snakes.line(this.array[i][0],this.array[i][1],this.array[i+1][0],this.array[i+1][1]);
   }
   else if(this.splited && !this.Nocolide){
     snakes.strokeWeight(this.Linewidth);
     snakes.line(this.HeadX , this.HeadY , this.HeadX , this.HeadY)
     this.splited = false
   }

 //  }
    
     
  }
  displayHead(){
    
    power.noStroke()
    power.fill(this.color);
    power.ellipse(this.HeadX , this.HeadY , sizeofheads, sizeofheads)
    
    
    
    
    //graphics.triangle(this.array[i][0],this.array[i][1],this.array[i][0],this.array[i][1] , this.array[i][0]+2,this.array[i][1]+10)
  }
   ScheckCollisions(){
     //for every player
      if(!this.isDead && !this.Nocolide){  //only alive players and players without invicibility
        let x = [this.HeadX , this.HeadY]
        for(let j = 1 ; j<players.length ; j++){
        for(let k=0;k<players[j].snake.array.length;k++)
        {
        
          let y = players[j].snake.array[k]
          let line_width = y[2]<this.Linewidth ?  y[2] - (y[2] - this.Linewidth) : y[2]
          if(Math.abs(x[0]-y[0])<line_width*0.8 && (Math.abs(x[1]-y[1])<line_width*0.8))
          {
            if((this.owner==j && k+(60/speed-this.speed)<this.array.length-line_width-1) ||this.owner!=j )
            {
              console.log('Dead');
              killSnake(this.owner)
              return;
            }

          }
      }
      }
    }
  }
Outofbounds(){
  
  if(this.HeadX < 0 || this.HeadX > SizeofBoard || this.HeadY < 0 || this.HeadY > SizeofBoard){console.log('Dead');killSnake(this.owner)}
}
PcheckCollisions(){
    
    if(!this.isDead){
        let Hx = [this.HeadX , this.HeadY]
        for(let k = 0 ; k < ActivePowerUps.length ; k++){
          let dx = Hx[0] - ActivePowerUps[k].X;
          let dy = Hx[1] - ActivePowerUps[k].Y;
  
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < sizeofheads + sizeofpowerups){
            ActivePowerUps[k].start(this.owner);
            ActivePowerUps.splice(k, 1)
            return;
          }
        }
    }
  
  }
}
