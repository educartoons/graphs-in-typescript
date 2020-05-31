type Nodex = {
  label: string;
};

type Nodes = Set<string>;

export class Graph {
  private nodes: Map<string, Nodex> = new Map();
  private edges: Map<string, Nodes> = new Map();

  private routes = [];

  public addNode(label: string) {
    this.nodes.set(label, { label });
    const edges: Nodes = new Set();
    this.edges.set(label, edges);
  }

  public addEdge(from: string, to: string) {
    const fromNode = this.edges.get(from);
    const toNode = this.edges.get(to);
    if (fromNode !== undefined && toNode !== undefined) {
      fromNode.add(to);
    }
  }

  public removeNode(label: string) {
    const node = this.nodes.has(label);
    if (node) {
      const iterator = this.edges.keys();
      let curr = iterator.next();

      while (!curr.done) {
        const edgesFromNode = this.edges.get(curr.value);
        if (edgesFromNode !== undefined) {
          edgesFromNode.delete(label);
        }
        curr = iterator.next();
      }

      this.nodes.delete(label);
      this.edges.delete(label);
      console.log(`The node ${label} was removed!!!`);
    }
  }

  public removeEdge(from: string, to: string) {
    const fromNode = this.nodes.has(from);
    const toNode = this.nodes.has(to);

    if (fromNode && toNode) {
      const edges = this.edges.get(from);
      if (edges !== undefined) {
        edges.delete(to);
      }
    }
  }

  public print() {
    this.nodes.forEach(node => {
      const following = this.printEdges(node.label);
      console.log(`${node.label} flights ${following}`);
    });
  }

  private printEdges(label: string): string {
    const edges = this.edges.get(label);
    if (edges === undefined) {
      return "";
    }
    const iterator = edges.values();
    let curr = iterator.next();
    const values: string[] = [];
    while (!curr.done) {
      values.push(curr.value);
      curr = iterator.next();
    }
    return values.join(", ");
  }

  public traverseDepthFirst(label: string) {
    const root = this.nodes.get(label);
    if (root !== undefined) {
      this.traverseDF(root, new Set());
    }
  }

  private traverseDF(node: Nodex, visited: Set<string>) {
    console.log(node.label);
    visited.add(node.label);
    const edges = this.edges.get(node.label);
    if (edges !== undefined) {
      const iterator = edges.values();
      let curr = iterator.next();
      while (!curr.done) {
        if (!visited.has(curr.value)) {
          const node = this.nodes.get(curr.value);
          if (node !== undefined) {
            this.traverseDF(node, visited);
          }
        }
        curr = iterator.next();
      }
    }
  }

  public traverseBreadthFirst(label: string){
    const root = this.nodes.get(label);
    if(root===undefined){
      return;
    }
    const visited: Set<string> = new Set();
    const queue: Nodex[] = [];

    queue.push(root);

    while(queue.length!==0){
      const current = queue.shift();
      if(visited.has(current.label)){
        continue;
      }
      
      console.log(current.label);
      visited.add(current.label);

      const edges = this.edges.get(current.label);
      const iterator = edges.values();
      let curr = iterator.next();
      while(!curr.done){

        if(!visited.has(curr.value)){
          const node = this.nodes.get(curr.value);
          queue.push(node);
        }
        curr = iterator.next();
      }
    }

  }

  public findAllPaths(from: string, to: string){
    const visited: Set<string> = new Set();
    const paths = [];

    this.generatePaths(from, to, visited, paths);
    return this.routes;
  }

  private generatePaths(from: string, to: string, visited: Set<string>, paths: any[]){
    visited.add(from);
    paths.push(from);
    if(from===to){
      const route = [];
      for(let i=0; i<paths.length; i++){
        route.push(paths[i]);
      }
      this.routes.push(route);
    }else{
      const node = this.edges.get(from);
      const iterator = node.values();
      let curr = iterator.next();
      while(!curr.done){
        if(!visited.has(curr.value)){
          this.generatePaths(curr.value, to, visited, paths);
        }
        curr = iterator.next();
      }
    }
    paths.pop();
    visited.delete(from);
  }

}