var thiccness = Linewidth * 2
var smoll = Linewidth * 0.40
const durration = 10000;
const sizeofpowerups = 20;

var thisroundtimer;

ActivePowerUps = []
const powerups = 
[
[Thicc  ,-1,  true] ,
[NotThicc ,1, true] , 
[Flashbang ,0, false] , 
[WhereColors,-1, false] ,
[ApplyNocolide ,1, true] , 
[ClearBoard,1 , false],
[fast , -1 , true],
[slow , -1 ,true],
[Swap , -1 , false],
[SwapKeys , -1 , true],
[Nothing , 0 , false]
]
function drawPowerups(){
    Fixclear();
    power.clear();
    for(let i = 0 ; i < ActivePowerUps.length ; i++)
{
    ActivePowerUps[i].display()
    

}
drawHeads()
image(power , 0 , 0 )

}

async function SpawnPowerups(){
    try{
    await delay(5000 , players.length)
    
   // let x = await sleep(5000);
    //if(x.signal['aborted']){return;}
    let tmp = Spawnpoint();
    let r = Math.floor((Math.random()*powerups.length))
    ActivePowerUps.push(new Powerup(tmp[0],tmp[1],powerups[r]));
    
    await delay(15000 , 1)
  
    //await sleep(15000)
    SpawnPowerups()
    }
    catch(err){
        console.log('error')
    }


}


class Powerup{
    constructor(X , Y , dane ){
        this.execute = dane[0]
        this.type = dane[1]
        this.range = dane[2]
        this.X = X
        this.Y = Y
       
        this.color;
        this.applycolors()
        this.roll()
    }
    applycolors(){
        switch(this.type){
            case 0:{
                this.color = 'yellow'
                break;
            }
            case 1:{
                this.color = 'lime'
                break;
            }
            case -1:{
                this.color = 'red'
                break;
            }
        }
    }
    roll(){
        if(this.range){
            if((Math.floor(Math.random() * (5 - 1)) + 1)<=2){
                this.target = 'Everyone';
            }
            else if((Math.floor(Math.random() * (5 - 1)) + 1)<=2){
                this.target = 'Allwithout'

            }
        }
    }

    display(){
        power.fill(this.color);
        power.ellipse(this.X , this.Y , sizeofpowerups , sizeofpowerups)
        
    }

    start(data){
        console.log(this.execute)
        console.log(this.target)
        if(this.execute.length == 1){
            this.target ? this.execute(this.target , data) :this.execute(data)
           
        }
        else{this.execute()}

    }

}
/*
typy :
0 - neutralne
-1 - negatywne
1 - pozytywne
*/

function fast(target , x= false){adjustspeed(target , x , 1 , 4)}
function slow(target , x= false){adjustspeed(target , x  , -0.5 , 2.5)}
function Nothing(){return;}
function Thicc(target , data=false){adjuctwidth(target , data ,Linewidth*2)}
function NotThicc(target , data=false){adjuctwidth(target ,data,  -(Linewidth*0.4))}

async function adjuctwidth(target ,index, thiccness){
    
    let duration = 10000
    let Targets = GenerateList(target , index)
    console.log(Targets)
    for(let i=0 ; i < Targets.length ; i++)
    {
        let thissnake = players[Targets[i]].snake
        if(!thissnake.isDead){thissnake.Linewidth += thiccness}
    }
    await sleep(duration);
    for(let i=0 ; i < Targets.length ; i++)
    {
        let thissnake = players[Targets[i]].snake
        if(!thissnake.isDead){thissnake.Linewidth -= thiccness}
    }

}


async function adjustspeed(target , index  , addedspeed , newangle){
    let duration = 5000
    let Targets = GenerateList(target , index)
    console.log(Targets)
    for(let i=0 ; i < Targets.length ; i++)
    {
        let thissnake = players[Targets[i]].snake
        if(!thissnake.isDead)
        {
            thissnake.speed += addedspeed;
            thissnake.angle = newangle
        }
    }
    await sleep(duration);

    for(let i=0 ; i < Targets.length ; i++)
    {
        let thissnake = players[Targets[i]].snake
        if(!thissnake.isDead)
        {
            thissnake.speed -= addedspeed;
            thissnake.angle = angle
        }
    } 
}



async function Flashbang(){

    background(currentBG)
    try{
    while(currentBG != 255){
        currentBG += 5;
        background(currentBG);
        await delay(50 , players.length+1);
    }

    await delay(5000 , 1);
    while(currentBG != 0){
        currentBG -= 5;
        background(currentBG);
        await delay(50 , players.length+1);
    }
}
    catch{
        console.log('end of flashbang')
        currentBG = 0
        background(0)
    }


}

async function WhereColors(){
    background(currentBG)
    snakes.background(254)
    snakes.clear()
    snakes.stroke('grey')
    for(let x = 1 ; x < players.length ; x++){
        let S = false
        for(let i=1;i<players[x].snake.array.length-1;i++) //redraw lines
   {
      snakes.strokeWeight(players[x].snake.array[i][2]);
      if(!S){
      
      snakes.line(players[x].snake.array[i+1][0],players[x].snake.array[i+1][1],players[x].snake.array[i+1][0],players[x].snake.array[i+1][1]);
      
      }
      else{
        snakes.line(players[x].snake.array[i][0],players[x].snake.array[i][1],players[x].snake.array[i+1][0],players[x].snake.array[i+1][1]);
          S=false

        }
      if(players[x].snake.array[i][3]){S=true}
   }
   players[x].snake.color = 'grey';
}
await sleep(15000);
background(currentBG)
snakes.background(254)
snakes.clear()
for(let x = 1; x < players.length ; x++)
{
    let S = false
    
    snakes.stroke(players[x].color)
    for(let i=1;i<players[x].snake.array.length-1;i++)
    { //redraw lines
    snakes.strokeWeight(players[x].snake.array[i][2]);

    if(!S){
      
        snakes.line(players[x].snake.array[i+1][0],players[x].snake.array[i+1][1],players[x].snake.array[i+1][0],players[x].snake.array[i+1][1]);
        
        }
        else{
          snakes.line(players[x].snake.array[i][0],players[x].snake.array[i][1],players[x].snake.array[i+1][0],players[x].snake.array[i+1][1]);
            S=false
  
          }
        if(players[x].snake.array[i][3]){S=true}

players[x].snake.color = players[x].color;

    }
}

}

async function ApplyNocolide(target , index){
    let durration = 2500
    let newtarget = 'Allwithout' ? 'Everyone' : target
    let Targets = GenerateList(newtarget , index)
    
    for(let i=0 ; i < Targets.length ; i++)
    {
        let thissnake = players[Targets[i]].snake
        if(!thissnake.isDead)
        {
            thissnake.Nocolide = true;
            thissnake.splited = true;
        }
    }
    await sleep(durration);
    for(let i=0 ; i < Targets.length ; i++)
    {
        let thissnake = players[Targets[i]].snake
        if(!thissnake.isDead){thissnake.Nocolide = false;}
    }

}


function ClearBoard(){
    Fixclear()
    snakes.clear()
    for(let x = 1 ; x < players.length ; x++){
        if(!players[x].snake.isDead)
        {
        let len = players[x].snake.array.length
        let tmp = [players[x].snake.array[len-2] , players[x].snake.array[len-1]]
        players[x].snake.array = tmp
        }
        else {players[x].snake.array = []}
}
   
}

function Swap(target){
    let mindist = null
    let closest = -1

    for(let x = 1 ; x < players.length ; x++){
        if(!players[x].snake.isDead && x != target){
            let a = players[target].snake.HeadX - players[x].snake.HeadX;
            let b = players[target].snake.HeadY - players[x].snake.HeadY;

            let c = Math.abs(Math.sqrt( a*a + b*b ));
            if(mindist == null){mindist =c ; closest = x}
            else{
                if(mindist > c){closest = x ; mindist = c}

            }


        }
    }

    if(closest != -1){
        let tmp = players[closest].snake.array;
        players[closest].snake.array = players[target].snake.array
        players[target].snake.array = tmp

        tmp = players[closest].snake.HeadX
        players[closest].snake.HeadX = players[target].snake.HeadX
        players[target].snake.HeadX = tmp

        tmp = players[closest].snake.HeadY
        players[closest].snake.HeadY = players[target].snake.HeadY
        players[target].snake.HeadY= tmp

        //swap vectors

        tmp = players[closest].snake.vectorx
        players[closest].snake.vectorx = players[target].snake.vectorx
        players[target].snake.vectorx= tmp

        tmp = players[closest].snake.vectory
        players[closest].snake.vectory= players[target].snake.vectory
        players[target].snake.vectory= tmp
        
    }


}

async function SwapKeys(target , x = -1){
    let duration = 5000

    let Targets = GenerateList(target , x)
    console.log(Targets)
    for(let i=0 ; i < Targets.length ; i++)
    {
        let thisplayer = players[Targets[i]]
        [thisplayer.keys[0] , thisplayer.keys[1]] = [thisplayer.keys[1] , thisplayer.keys[0]]
        
    }
    await sleep(duration);

    for(let i=0 ; i < Targets.length ; i++)
    {
        let thisplayer = players[Targets[i]]
        [thisplayer.keys[0] , thisplayer.keys[1]] = [thisplayer.keys[1] , thisplayer.keys[0]]
        
    }
}

function SwapVectors(target){ //do wywalenia
    let tmp = players[target].snake.vectory
    players[target].snake.vectory = players[target].snake.vectorx

    players[target].snake.vectorx = tmp
}
