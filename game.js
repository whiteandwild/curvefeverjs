
positions = [-1 , 1];
function CreateSnakes(){
for(let i = 1 ; i<players.length ; i++){
    console.log(`creating snake for player ${i+1}`)
    let spawn = Spawnpoint();
    players[i].snake = new Snake(i , spawn[0] , spawn[1] ,players[i].color);
    let dirX = positions[Math.floor(Math.random()*2)]
    let dirY = positions[Math.floor(Math.random()*2)]
    console.log('dirs ', dirY , dirX)
    players[i].snake.add_position(spawn[0] + 1*dirX ,spawn[1] + 1*dirY)
    players[i].snake.vectorx = dirX
    players[i].snake.vectory = dirY

}}


function checkALLColisions(){
    for (var i=1;i<players.length;i++){
    if(!players[i].snake.isDead){
    players[i].snake.ScheckCollisions()
    players[i].snake.PcheckCollisions()
    players[i].snake.Outofbounds()
    }}



}

function GenerateList(target , index = false){
    let output = []
    if(target == 'Everyone'){
        for(let i = 1 ; i < players.length ; i++){output.push(i)}

    }
    else if(target == 'Allwithout'){for(let i = 1 ; i < players.length ; i++){if(i!=index){output.push(i)}}}
    else{output.push(target)}
    return output;
}
