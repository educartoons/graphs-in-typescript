import {Graph} from './classes/Graph'

const G = new Graph();
G.addNode("A");
G.addNode("B");
G.addNode("X");
G.addNode("E");
G.addNode("F");
G.addNode("C");
G.addNode("D");

G.addEdge("A", "F");
G.addEdge("A", "B");
G.addEdge("A", "C");
G.addEdge("A", "D");
G.addEdge("B", "X");
G.addEdge("B", "E");
G.addEdge("E", "F");
G.addEdge("C", "F");
G.addEdge("D", "F");
G.print();

G.findAllPaths('A', 'F');