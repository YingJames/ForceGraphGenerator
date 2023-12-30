import React from "react";

type EdgeValues<T> = { source: T, target: T, weight?: number };
interface EdgeInputProps {
    edgeInputs: EdgeValues<any>[];
    setEdgeInputs: React.Dispatch<React.SetStateAction<EdgeValues<any>[]>>;
}
const EdgeInputComponent = ({edgeInputs, setEdgeInputs}: EdgeInputProps) => {
    const addEdgeInput = () => {
        setEdgeInputs(prevInputs => [...prevInputs, {source: '', target: ''}]);
    }
    const handleEdgeInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: string) => {
        const newEdgeInputs: EdgeValues<any>[] = [...edgeInputs];
        newEdgeInputs[index][field as 'source' | 'target'] = e.target.value;
        setEdgeInputs(newEdgeInputs);
    }
    return (
        <div>
            {edgeInputs.map((input, index) => (
                <div key={index}>
                    <label>Source Node:</label>
                    <input value={input.source} onChange={e => handleEdgeInputChange(e, index, 'source')} />
                    <label>Target Node:</label>
                    <input value={input.target} onChange={e => handleEdgeInputChange(e, index, 'target')} />
                </div>
            ))}
            <button onClick={addEdgeInput}>Add Edge</button>
        </div>
    );
}

export default React.memo(  EdgeInputComponent );
