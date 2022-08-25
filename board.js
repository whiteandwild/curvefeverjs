

  // display line foreach player
  function display_lines(players){
    for (var i=1;i<players.length;i++)
    {
      if(!players[i].snake.isDead){
      snakes.stroke(players[i].snake.color);
      
      players[i].snake.display();
      
     // players[i].snake.displayHead();
    }}
    image(snakes , 0 ,0)
    
    
  }
  function Spawnpoint(){
    return [(Math.floor(Math.random() * ( SizeofBoard- 100)) + 100) , (Math.floor(Math.random() * ( SizeofBoard- 100)) + 100)]
  }

function killSnake(target){
  players[target].snake.isDead = true
  am = 0
  for(let i = 1 ; i<players.length ; i++){
    if(i!=target && !players[i].snake.isDead){players[i].score++ , am++}
  }

  if(am <=1){
    RoundEnd()
  }
}

async function RoundEnd(){
  
  
  RemovePauseListener()
  await sleep(100)
  started = false
  ActivePowerUps = []
  for(let i = 0 ; i < promisses.length ; i++){promisses[i].abort()}
  promisses = []
  playing = false
  
  await waitingKeypress()
  snakes.remove()
  graphics.remove()
  power.remove()
  newgame()
}

function delay( millis , i) {
  let timeout_id;
  let rejector;
  const prom = new Promise((resolve, reject) => {
    rejector = reject;
    timeout_id = setTimeout(() => {
      resolve();
    }, millis);
  });
  prom.abort = () => {
    clearTimeout( timeout_id );
    rejector( 'aborted' );
  };
  promisses.splice( i, 1, prom );
  return prom;
}



