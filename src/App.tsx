import React, { useState } from 'react';
import './App.css';
import ForceGraphComponent from "./ForceGraph/ForceGraphComponent";
import { D3Graph } from "./ForceGraph/d3GraphTypes";
import CreateGraph from "./CreateGraph/CreateGraph";
import CreateD3GraphFromGraph from "./CreateGraph/CreateD3GraphFromGraph";
import EdgeInputComponent from "./GraphInputComponents/EdgeInputComponent";
import NodeInputComponent from "./GraphInputComponents/NodeInputComponent";

type EdgeValues<T> = { source: T, target: T, weight?: number };

let graphTest: D3Graph = {
    nodes: [
        {id: 1, group: "1"},
        {id: 2, group: "1"},
        {id: 3, group: "1"},
        {id: 4, group: "4"},
        {id: 5, group: "5"},
        // ...
    ],
    links: [
        {source: 1, target: 2, value: 4},
        {source: 1, target: 3, value: 4},
        {source: 2, target: 4, value: 4},
        {source: 2, target: 5, value: 4},

        // ...
    ],
};

function App() {
    const [nodeInput, setNodeInput] = useState<string>('');
    const [edgeInputs, setEdgeInputs] = useState<EdgeValues<any>[]>([]);
    const [graphState, setGraphState] = useState<D3Graph>(graphTest);
    const [nodePathOrder, setNodePathOrder] = useState<number[]>([]);
    // const [graphState, setGraphState] = useState<D3Graph>({nodes: [], links: []});


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const nodeInputArray = nodeInput.replace(/\s/g, '').split(',');
        // const nodeArray: number[] = nodeInputArray.map(item => Number(item))
        const filteredEdgeInputs: EdgeValues<string>[] = edgeInputs.filter((edge: EdgeValues<string>) => edge.source !== '' && edge.target !== '');

        const graph = CreateGraph(nodeInputArray, filteredEdgeInputs)
        const d3Graph = CreateD3GraphFromGraph(graph);
        setGraphState(d3Graph);
        const pathOrder: number[] = graph.breadthFirstSearch();
        setNodePathOrder(pathOrder);
    }

    return (
        <div>
            <ForceGraphComponent
                d3GraphData={graphState}
                nodePathOrder={nodePathOrder}
            />

            <form onSubmit={handleSubmit}>
                <label>Nodes:</label>
                <NodeInputComponent nodeInput={nodeInput} setNodeInput={setNodeInput} />
                <EdgeInputComponent edgeInputs={edgeInputs} setEdgeInputs={setEdgeInputs} />
                <button type={"submit"} className={"submit"}>Submit</button>
            </form>


        </div>
    );
}

export default App;