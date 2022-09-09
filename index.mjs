import Graph from "./graph.mjs";

function makeBoard(){
    const board = []
    for(let i=0; i<8;i++){
        board.push(new Array(8).fill(' '))
    }
    return board
}

const movesArr =  [[+2, -1], [+2, +1],
                   [-2, -1], [-2, +1],
                   [+1, -2], [+1, +2],
                   [-1, -2], [-1, +2]]

const moveGraph = new Graph()
for(let x=0; x<8; x++){
    for(let y=0; y<8; y++){
        moveGraph.addVertex(`[${x},${y}]`) 
    }
}

moveGraph.adjList.forEach((edges, node) => {
    let x, y
    [x, y] = JSON.parse(node)
    movesArr.forEach((move) => {
        let dx, dy
        [dx, dy] = move
        if((x+dx<0)||(x+dx>7)||(y+dy<0)||(y+dy>7)){
            return
        } else {
        const edge = `[${x+dx},${y+dy}]`
        moveGraph.addEdge(node, edge)
        }
    })
})

function knightMoves(start, end){
    const board = makeBoard()
    const [xS, yS] = start
    const [xT, yT] = end
    const knight = 'K'
    const target = 'X'
    board[xS][yS] = knight
    board[xT][yT] = target
    console.table(board)
    const path = moveGraph.shortestPath(start, end)
    
    console.log(`Moving knight from ${start} to ${end}`)
    console.log(`You made it in ${path.length-1} moves. Your path was: \n ${path.join('=>')}`)
    console.log('Your taken path was:')
    for(let i=0; i<path.length; i++){
    const [x,y] = JSON.parse(path[i])
    board[x][y] = i
    }   
    console.table(board)
}

knightMoves([0,0],[7,7])

