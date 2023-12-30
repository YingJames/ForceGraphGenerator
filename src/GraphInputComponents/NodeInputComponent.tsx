import React from "react";

interface NodeInputProps {
    nodeInput: string,
    setNodeInput: React.Dispatch<React.SetStateAction<any>>
}

const NodeInputComponent = ({setNodeInput, nodeInput}: NodeInputProps) => {
    return (
        <input onChange={e => setNodeInput(e.target.value)}
               onSubmit={_ => {
                   const inputArray: string[] = nodeInput.split(',');
                   setNodeInput(inputArray);

                   // const graph: Graph<string> = CreateGraph<string>(inputArray);
               }}
        ></input>
    )
}
export default React.memo(  NodeInputComponent );