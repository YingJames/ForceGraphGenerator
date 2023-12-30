import Node from "./Node"
import Edge from "./Edge";
import { Queue } from "@datastructures-js/queue";

export class Graph {
    adjacencyList: Map<number, Node> = new Map();
    edgeList: Array<Edge> = [];

    constructor() {
        this.adjacencyList = new Map();
        this.edgeList = new Array<Edge>()
    }

    /**
     * Add a new node if it was not added before
     *
     * @param {number} data
     * @returns {Node<number>}
     */
    addNode(data: number): Node {
        let node = this.adjacencyList.get(data);
        if (node) return node;
        node = new Node(data);
        this.adjacencyList.set(data, node);
        return node;
    }
    addEdge(source: number, destination: number, weight: number = -1): void {
        // add to adjacency list
        const sourceNode = this.addNode(source);
        const destinationNode = this.addNode(destination);
        sourceNode.addAdjacent(destinationNode);

        // add to edge list
        const newEdge: Edge = new Edge(sourceNode, destinationNode, weight);
        this.edgeList.push(newEdge);
    }

    /**
     * Breadth-first search
     *
     * @returns
     * @param node
     * @param visited
     * @param order
     */
    private breadthFirstSearchAux(node: Node, visited: Map<number, boolean>, order: number[]): void {
        const queue: Queue<number> = new Queue<number>();
        if (!node) return;
        queue.push(node.data);
        visited.set(node.data, true);
        // order.push(node.data);
        while (!queue.isEmpty()) {
            const data =  queue.dequeue();
            const  currentNode  =  this.adjacencyList.get(data);
            if (!currentNode) continue;

            order.push(currentNode.data);

            currentNode.adjacentNodes.forEach((item) => {
                if (!visited.has(item.data)) {
                    visited.set(item.data, true);
                    queue.push(item.data);
                }
            });
        }
    }

    breadthFirstSearch() {
        const visited: Map<number, boolean> = new Map();
        const pathOrder: number[] = [];
        this.adjacencyList.forEach((node) => {
            if (!visited.has(node.data)) {
                this.breadthFirstSearchAux(node, visited, pathOrder);
            }
        });
        return pathOrder;
    }
}