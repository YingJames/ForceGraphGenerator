import * as d3 from "d3";
import { D3Graph, D3Node, D3Link, D3GraphProperties } from "./d3GraphTypes";
import dragNodes from "./dragNodes"
function ForceGraphUpdate(graph: D3Graph, selector: SVGElement, graphProperties: D3GraphProperties) {
    const {
        width,
        height,
        customColorScheme = null,
        linkColor = "#ffffff",
        linkOpacity = 1,
        nodeForceStrength = -200,
        nodeRadius = 15,
        nodeOutlineColor = "#e5e5e5",
        nodeOutlineOpacity = 1,
        nodeOutlineWidth = 3
    }: D3GraphProperties = graphProperties;

    let allLinks: d3.Selection<SVGLineElement, D3Link, SVGGElement, D3Link[]>;
    let allNodes: d3.Selection<SVGElement, D3Node, SVGGElement, D3Node[]>;
    let allLabels: d3.Selection<SVGTextElement, D3Node, SVGGElement, D3Node[]>;
    // The force simulation mutates links and nodes, so create a copy
    // so that re-evaluating this cell produces the same result.
    const links: D3Link[] = graph.links
    const nodes: D3Node[] = graph.nodes

    // Create a simulation with several forces.
    const linkForce: d3.ForceLink<D3Node, D3Link> = d3.forceLink<D3Node, D3Link>(links).distance(50)
        .id((d: D3Node) => {
            return d.id;
        });
    const bodyForce: d3.ForceManyBody<D3Node> = d3.forceManyBody().strength(nodeForceStrength);
    const simulation: d3.Simulation<D3Node, D3Link> = d3.forceSimulation(nodes)
        .force("link", linkForce)
        .force("charge", bodyForce)
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .on("tick", ticked);

    // Specify the color scale.
    let color: d3.ScaleOrdinal<string, string>;
    if (customColorScheme) {
        color = d3.scaleOrdinal(customColorScheme);
    } else {
        color = d3.scaleOrdinal(d3.schemeTableau10);
    }

    // draw the force graph svg elements
    update();
    d3.select("button.submit")
        .on("click", update);

    function update() {
        d3.select(selector).selectAll("*").remove();
        // Select the SVG container.
        const svg = d3.select(selector)
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])

        // Add a line for each link, and a circle for each node.
        const linkGroup = svg.selectAll("g.links")
            .data([links])
        allLinks = linkGroup.enter()
            .append("g")
            .attr("stroke", linkColor)
            .attr("stroke-opacity", linkOpacity)
            .attr("class", "links")
            .selectAll<SVGLineElement, D3Link>("link")
            .data((d: D3Link[]) => d)
            .join("line")
            .attr("stroke-width", (_: D3Link) => Math.sqrt(3));

        const nodeGroup = svg.selectAll("g.nodes")
            .data([nodes])
        allNodes = nodeGroup.enter()
            .append("g")
            .attr("class", "nodes")
            .selectAll<SVGElement, D3Node>("circle")
            .data((d: D3Node[]) => d)
            .join("circle")
            .attr("r", nodeRadius)
            .attr("stroke", nodeOutlineColor)
            .attr("stroke-opacity", nodeOutlineOpacity)
            .attr("stroke-width", nodeOutlineWidth)
            .attr("fill", (d: D3Node) => color(String(d.id)))
            .attr("data-value", (d: D3Node, _: number) => d.id);

        allNodes.append("title")
            .text((d: D3Node) => d.id);

        // allNodes.on("click", highlightNodes);

        const labelGroup = svg.selectAll("g.labels")
            .data([nodes])
        allLabels = labelGroup.enter()
            .append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .text((d: any) => d.id)
            .attr("dx", -5)
            .attr("dy", 30)
            .style("pointer-events", "none")
            .style("fill", "#52ff3f")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .style("font-family", "sans-serif")

        // Add a drag behavior.
        allNodes.call(dragNodes(simulation));

        // Highlight behavior
/*        allNodes.on("click", function highlightNode (event: any, d: D3Node) {
            // const index: number = parseInt(d3.select(this).attr("data-index"));
            if (d3.select(this).style("fill") === "red") {
                d3.select(this)
                    .style("fill", color(String(d.id)))
                    .style("stroke", nodeOutlineColor);
            } else {
                d3.select(this)
                    .style("fill", "red")
                    .style("stroke", "#73002c");
            }
        })*/
        // Set the position attributes of links and nodes each time the simulation ticks.
    }

    function ticked() {
        allLinks
            .attr("x1", (d: any) => d.source.x)
            .attr("y1", (d: any) => d.source.y)
            .attr("x2", (d: any) => d.target.x)
            .attr("y2", (d: any) => d.target.y);

        allNodes
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y);

        allLabels
            .attr("x", (d: any) => d.x)
            .attr("y", (d: any) => d.y)
    }
}

export default ForceGraphUpdate;
