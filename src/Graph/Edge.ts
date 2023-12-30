import Node from "./Node";

class Edge {
    source: Node;
    target: Node;
    weight?: number;
    constructor(source: Node, target: Node, weight: number) {
        this.source = source;
        this.target = target;
        if (weight !== -1) this.weight = weight;
    }
}

export default Edge;