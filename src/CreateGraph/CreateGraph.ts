import { Graph } from "../Graph/Graph";
import { GraphEdge } from "../ForceGraph/d3GraphTypes";

function CreateGraph(edgeInputValues: GraphEdge<string>[]): Graph {
    let graph: Graph = new Graph();

    // edit these edges to include weights and convert to number
    const edgeList: GraphEdge<number>[] = edgeInputValues.map((edge: GraphEdge<string>) => {
        if (!edge.weight) edge.weight = -1
        return {
            source: Number(edge.source),
            target: Number(edge.target),
            weight: edge.weight
        };
    }).sort((a,b) => {
            // First compare by source
            if (a.source !== b.source) {
                return a.source - b.source;
            }
            // If source is the same, compare by target
            else {
                return a.target - b.target;
            }
    }
    );

    // graph given all numbers in array and converted to Node
    // nodeInputValues.map((item: string) => graph.addNode(Number(item)));

    // convert edge values to Edge type
    edgeList.forEach((edge: any) => {
        graph.addEdge(edge.source, edge.target, edge.weight);
        graph.addEdge(edge.target, edge.source, edge.weight);
    })

    return graph;
}

export default CreateGraph;