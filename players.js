class Player{
    constructor(keys , color){
        this.keys = keys;
        this.color = color;
        this.score = 0;
        this.snake = null;
    }
  
}


function Addplayer(keys , color){
    players.push(new Player(keys ,color));
}


Addplayer([37 , 39] ,"red" );
Addplayer([65 , 68] ,"cyan" );



