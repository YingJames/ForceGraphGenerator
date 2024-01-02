import React, { useEffect, useState } from 'react';
import './App.css';
import ForceGraphComponent from "./ForceGraph/ForceGraphComponent";
import { D3Graph, GraphEdge } from "./ForceGraph/d3GraphTypes";
import CreateGraph from "./CreateGraph/CreateGraph";
import CreateD3GraphFromGraph from "./CreateGraph/CreateD3GraphFromGraph";
import GraphInputComponent from "./GraphInputComponents/GraphInputComponent";

const sampleEdge: GraphEdge<number>[] = [
    {source: 1, target: 4},
    {source: 4, target: 8},
    {source: 1, target: 3},
    {source: 4, target: 2},
    {source: 3, target: 12},
    {source: 3, target: 9},
];

function App() {
    const [edgeInputs, setEdgeInputs] = useState<GraphEdge<any>[]>(sampleEdge);
    const [graphState, setGraphState] = useState<D3Graph>({nodes:[], links:[]});
    const [nodePathOrder, setNodePathOrder] = useState<number[]>([]);
    // const [graphState, setGraphState] = useState<D3Graph>({nodes: [], links: []});

    useEffect(() => {
        const filteredEdgeInputs: GraphEdge<string>[] = edgeInputs.filter((edge: GraphEdge<string>) => edge.source !== '' && edge.target !== '');

        const graph = CreateGraph(filteredEdgeInputs);
        const d3Graph = CreateD3GraphFromGraph(graph);
        setGraphState(d3Graph);
        const pathOrder: number[] = graph.breadthFirstSearch();
        setNodePathOrder(pathOrder);
    }, [edgeInputs]);

    return (
        <div>
            <ForceGraphComponent
                d3GraphData={graphState}
                nodePathOrder={nodePathOrder}
            />
            <GraphInputComponent setEdgeInputs={setEdgeInputs} />


        </div>
    );
}

export default App;