class Node {
    data: number;
    adjacentNodes: Node[];
    constructor(data: number) {
        this.data = data;
        this.adjacentNodes = [];
    }

    addAdjacent(node: Node): void {
        this.adjacentNodes.push(node);
    }
}

export default Node;