import * as d3 from "d3";
import {D3Node, D3Link } from "./d3GraphTypes";
// Reheat the simulation when drag starts, and fix the subject position.
function dragNodes(simulation: d3.Simulation<D3Node, D3Link>): d3.DragBehavior<SVGElement, D3Node, D3Node> {
    function dragstarted(event: d3.D3DragEvent<SVGElement, D3Node, D3Node>) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

// Update the subject (dragged node) position during drag.
    function dragged(event: d3.D3DragEvent<SVGElement, D3Node, D3Node>) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

// Restore the target alpha so the simulation cools after dragging ends.
// Unfix the subject position now that it’s no longer being dragged.
    function dragended(event: d3.D3DragEvent<SVGElement, D3Node, D3Node>) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    const dragBehavior: d3.DragBehavior<SVGElement, D3Node, D3Node> = d3.drag<SVGElement, D3Node, D3Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)

    return (dragBehavior);
}

export default dragNodes;
