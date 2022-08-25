
let paused = false
let started = false
currentBG = 0
function Fixclear(){ //błagam naprawcie to 
  currentBG == 255 ? background(254) : background(currentBG+1)
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms , { signal: ac.signal }));
  }
function setup(){
    canvas=createCanvas(SizeofBoard, SizeofBoard);
   // ctx.canvas.width  = window.innerWidth;
   // ctx.canvas.height = window.innerHeight;
    canvas.parent('curve_fever_canvas');
    //scoreboard = createCanvas(300 , 600);
    //scoreboard.parent('scoreboard')
    colorMode(HSB);
    newgame()
}

async function newgame(){
  background(0);
  snakes =createGraphics(SizeofBoard, SizeofBoard);
  snakes.clear();
  graphics = createGraphics(SizeofBoard, SizeofBoard);
  graphics.clear();
  power = createGraphics(SizeofBoard , SizeofBoard);
  power.clear();
  

  CreateSnakes();
  await waitingKeypress()
  started = true
  playing= true
  SpawnPowerups()
  for(let i = 1 ; i < players.length ;i++){players[i].snake.hole()}
  addPauseListener()
}
function draw() {
    
    
    if (playing)
    {
     
      for (var i=1;i<players.length;i++)
      {
        if (keyIsDown(players[i].keys[0])) {players[i].snake.move(-players[i].snake.angle* Math.PI / 180); }
        else if (keyIsDown(players[i].keys[1])) {players[i].snake.move(players[i].snake.angle* Math.PI / 180);}
        else {players[i].snake.move(0);}
      }
      
      checkALLColisions()
    
      drawPowerups()
      
      display_lines(players);
      
    }
   else{
    drawHeads()
    image(power , 0 , 0 )
    display_lines(players);
   }
   
    
}

function drawHeads(){
  Fixclear()
  graphics.clear();
  for(let i = 1 ; i < players.length ; i++){
   players[i].snake.displayHead()
  }
  image(graphics , 0 ,0)
}

function waitingKeypress() {
  return new Promise((resolve) => {
    document.addEventListener('keydown', onKeyHandler);
    function onKeyHandler(e) {
      if (e.keyCode === 32) {
        
        document.removeEventListener('keydown', onKeyHandler);
        resolve();
        
        
      }
    }
  });
}

async function pause(){
  if(paused) //end of pause
  {
    console.log('pause end')
    playing = true
    paused = false

  }
  else
  {
    paused = true
  
    console.log('pause')
    playing = false
  }
  

  
  
}

//myp5 = new p5(s)

//players[0].snake = new Snake(0 , 60 , 40);

function addPauseListener(){
  document.addEventListener('keydown', PauseHandler);
}

function RemovePauseListener(){document.removeEventListener('keydown', PauseHandler);}

function PauseHandler(e){
  if (e.keyCode === 32) {
    
    pause()
}}