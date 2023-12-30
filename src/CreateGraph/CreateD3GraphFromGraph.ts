import { Graph } from "../Graph/Graph";
import { D3Graph, D3Link, D3Node } from "../ForceGraph/d3GraphTypes";
import Edge from "../Graph/Edge";

function CreateD3GraphFromGraph(graph: Graph) {
    //  retrieve keys from the graph adjacency list map
    const graphNodes: number[] = Array.from(graph.adjacencyList.keys());

    // for a directed graph
/*
    const edgeList: D3Link[] = graph.edgeList.map((edge: Edge) => {
        const sourceNode = edge.source.data
        const targetNode = edge.target.data
        return {source: sourceNode, target: targetNode}
    });
*/

    // create edgeList without duplicates
    const edgeList: D3Link[] = graph.edgeList.reduce((accumulator: D3Link[], edge: Edge) => {
        let sourceNode = edge.source.data;
        let targetNode = edge.target.data;

        // normalize the nodes so that the edge always goes from the smaller node to the larger node
        if (sourceNode > targetNode) {
            let temp = sourceNode;
            sourceNode = targetNode;
            targetNode = temp;
        }

        const currentEdge = {source: sourceNode, target: targetNode}

        // check if the current edge already exists in the accumulator
        if (!accumulator.some(e => e.source === currentEdge.source && e.target === currentEdge.target)) {
            // if not, add it to the accumulator
            accumulator.push(currentEdge);
        }

        return accumulator;
    }, []);

    // convert graph nodes to d3 force graph nodes
    const  d3Nodes : D3Node[] = graphNodes.map((nodeValue ) => {
        return {id: nodeValue}
    })

    const d3Graph: D3Graph = {nodes: d3Nodes, links: edgeList};
    return d3Graph;
}

export default CreateD3GraphFromGraph;