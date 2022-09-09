export default class Graph{
    constructor(){
        this.adjList = new Map()
    }
    addVertex(v){
        this.adjList.set(v, new Set())
    }
    addEdge(v, w){
        this.adjList.get(v).add(w)
        this.adjList.get(w).add(v)
    }
    print(){
        this.adjList.forEach((edges, node) => {
            let edgeList = ''
            for(const edge of edges.values()){
                edgeList += edge
            }
            console.log(`${node} -> ${edgeList}`)
            }
        )}
         

    shortestPath(start, target) {
        start = JSON.stringify(start)
        target = JSON.stringify(target)
        const queue = [ start ]
        const visited = new Set()
        visited.add(start)
        const previous = new Map()
        const paths = []
        while(queue.length>0) {
          let node = queue.shift()
          const neighbors = [...this.adjList.get(node).values()];
          for (let i = 0; i < neighbors.length; ++i) {
            let neighbour = neighbors[i]
            if (visited.has(neighbour)) {
              continue
            }
            visited.add(neighbour)
            if (neighbour === target) {
              let path = [ neighbour ]
              while (node !== start) {
                path.push(node)
                node = previous.get(node)         
              }
              path.push(node)
              path.reverse()
              paths.push(path)
              return path
            }
            previous.set(neighbour, node)
            queue.push(neighbour)
          }
        }
        return('there is no path from ' + start + ' to ' + target);
      }
}
