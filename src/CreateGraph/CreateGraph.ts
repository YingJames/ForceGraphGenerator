import { Graph } from "../Graph/Graph";
type EdgeValues<T> = { source: T, target: T, weight?: number };
function CreateGraph(nodeInputValues: string[], edgeInputValues: EdgeValues<string>[]): Graph {
    let graph: Graph = new Graph();

    // edit these edges to include weights and convert to number
    const edgeList: EdgeValues<number>[] = edgeInputValues.map((edge: EdgeValues<string>) => {
        if (!edge.weight) edge.weight = -1
        return {
            source: Number(edge.source),
            target: Number(edge.target),
            weight: edge.weight
        };
    })

    // graph given all numbers in array and converted to Node
    nodeInputValues.map((item: string) => graph.addNode(Number(item)));

    // convert edge values to Edge type
    edgeList.forEach((edge: any) => {
        graph.addEdge(edge.source, edge.target, edge.weight);
        graph.addEdge(edge.target, edge.source, edge.weight);
    })

    return graph;
}

export default CreateGraph;