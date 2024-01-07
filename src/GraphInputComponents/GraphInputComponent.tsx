import React, { FormEvent, MutableRefObject, useEffect, useRef } from "react";
import { GraphEdge } from "../ForceGraph/d3GraphTypes";
import "./GraphInputComponent.css"
interface EdgeInputProps {
    setEdgeInputs: React.Dispatch<React.SetStateAction<GraphEdge<any>[]>>;
}
function GraphInputComponent ({setEdgeInputs}: EdgeInputProps)  {
    const graphDataRef: MutableRefObject<string> = useRef('1 3\n1 4\n3 9\n3 12\n4 2\n4 8');
    const textAreaRef: MutableRefObject<HTMLTextAreaElement | null> = useRef(null);

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let lines = graphDataRef.current.split('\n');
        let edgeValues: GraphEdge<number>[];
        try {
            edgeValues = lines.map((line: string) => {
                const splitLine: string[] = line.split(' ');
                let parsedEdge: GraphEdge<number>;
                if (!isNaN(Number(splitLine[0])) && !isNaN(Number(splitLine[1]))) {
                    parsedEdge = {
                        source: Number(splitLine[0]),
                        target: Number(splitLine[1])
                    }
                    return parsedEdge;
                }
                return undefined;
            }).filter(Boolean) as GraphEdge<number>[];
            setEdgeInputs(edgeValues);
        } catch (e) {
            // for number not working
        }
    }

    function editGraphTextAreaOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        graphDataRef.current = e.target.value;
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }

    useEffect(() => {
        if (textAreaRef.current) {
            editGraphTextAreaOnChange({ target: textAreaRef.current } as React.ChangeEvent<HTMLTextAreaElement>);
        }
    }, []);

    return (
        <form
            id={"graphInput--form"}
            onSubmit={(e) => handleSubmit(e)}>
            <label>Graph Data Input:</label>
            <textarea
                ref={textAreaRef}
                id={"graphInput--textarea"}
                onChange={(e)  =>  editGraphTextAreaOnChange(e)}
                defaultValue={'1 3\n1 4\n3 9\n3 12\n4 2\n4 8'}
            ></textarea>
            <button type={"submit"}>Submit</button>
        </form>
    );
}

export default  React.memo( GraphInputComponent );
