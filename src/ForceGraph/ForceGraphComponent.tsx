import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { D3Graph, D3GraphProperties } from "./d3GraphTypes";
import ForceGraphClass from "./ForceGraph";

function ForceGraphComponent({d3GraphData, nodePathOrder}: {d3GraphData: D3Graph, nodePathOrder: number[]}) {
    const ref: MutableRefObject<null> = useRef(null);
    const forceGraphRef: MutableRefObject<any> = useRef(null);
    const intervalRef: MutableRefObject<any> = useRef(null);

    // const isPlayingRef = useRef(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const stepRef = useRef(0);
    // const [currentIndex, setCurrentIndex] = useState(0);

    function highlight(index: number) {
        forceGraphRef.current.highlightNode(nodePathOrder[index]);
    }
    function clearHighlight(index: number) {
        forceGraphRef.current.clearHighlight(nodePathOrder[index]);
    }
    function clearAllHighlights() {
        forceGraphRef.current.clearAllHighlights(nodePathOrder);
    }
    function pause() {
        clearInterval(intervalRef.current);
        setIsPlaying(false);
    }
    function stop() {
        pause();
        clearAllHighlights();
        setIsPlaying(false);
        stepRef.current = 0;
    }
    function stepForward() {
        pause();
        if (stepRef.current !== nodePathOrder.length) {
            highlight(stepRef.current++);
        } else {
            stop();
        }
    }

    function stepBackward() {
        pause();
        // indexRef.current = (indexRef.current !== 0) ? indexRef.current-1 : 0;
        if (stepRef.current !== 0) {
            clearHighlight(--stepRef.current);
            // stepRef.current--;
        } else {
            stepRef.current = 0;
        }
        // highlight(indexRef.current);
    }

    function play() {
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
            highlight(stepRef.current++);
            if (stepRef.current === nodePathOrder.length+1) {
                stop();
            }

        }, 1000)

    }

    useEffect(() => {
        const graphProperties: D3GraphProperties = {width:800, height:800};
        if (ref.current) {

            // ForceGraphUpdate(d3GraphData, ref.current, graphProperties);
            // const forceGraph: ForceGraphClass = new ForceGraphClass(d3GraphData, ref.current, graphProperties);
            forceGraphRef.current =  new ForceGraphClass(d3GraphData, ref.current, graphProperties);
        }
    }, [d3GraphData]);
    return (
        <>
            <svg ref={ref}></svg>
            <button
                onClick={play}
                disabled={isPlaying}>
                Play
            </button>
            <button onClick={pause}
                    disabled={!isPlaying}
            >Pause</button>
            <button onClick={stop}
                    disabled={!isPlaying}
            >Stop</button>
            <button onClick={stepBackward}>Step Backward</button>
            <button
                onClick={stepForward}
            >
                Step Forward
            </button>
        </>
    );
}

export default React.memo(  ForceGraphComponent );