import { D3Graph, D3GraphProperties, D3Link, D3Node } from "./d3GraphTypes";
import * as d3 from "d3";
import { ScaleOrdinal } from "d3";
import dragNodes from "./dragNodes";

type updateProperties = {
    links: D3Link[],
    nodes: any,
    simulation: any
}

class ForceGraph {
    private allLinks!: d3.Selection<SVGLineElement, D3Link, SVGGElement, D3Link[]>;
    private allNodes!: d3.Selection<SVGElement, D3Node, SVGGElement, D3Node[]>;
    private allLabels!: d3.Selection<SVGTextElement, any, SVGGElement, D3Node[]>;


    private color: ScaleOrdinal<string, string>;
    private selector: SVGElement;
    private d3Graph: D3Graph;
    private readonly width: number;
    private readonly height: number;
    private readonly customColorScheme;
    private linkColor;
    private linkOpacity;
    private readonly nodeForceStrength;
    private nodeRadius;
    private readonly nodeOutlineColor;
    private nodeOutlineOpacity;
    private nodeOutlineWidth;

    constructor(d3Graph: D3Graph, selector: SVGElement, graphProperties: D3GraphProperties) {
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
        this.selector = selector;
        this.d3Graph = d3Graph;
        this.width = width;
        this.height = height;
        this.customColorScheme = customColorScheme;
        this.linkColor = linkColor;
        this.linkOpacity = linkOpacity;
        this.nodeForceStrength = nodeForceStrength;
        this.nodeRadius = nodeRadius;
        this.nodeOutlineColor = nodeOutlineColor;
        this.nodeOutlineOpacity = nodeOutlineOpacity
        this.nodeOutlineWidth = nodeOutlineWidth;
        this.color = d3.scaleOrdinal();

        this.build();
    }

    public build() {

        const links: D3Link[] = this.d3Graph.links
        const nodes: D3Node[] = this.d3Graph.nodes
        const ticked = () => {
            this.allLinks
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            this.allNodes
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);

            this.allLabels
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y)
        }
        // Create a simulation with several forces.
        const linkForce: d3.ForceLink<D3Node, D3Link> = d3.forceLink<D3Node, D3Link>(links).distance(50)
            .id((d: D3Node) => {
                return d.id;
            });
        const bodyForce: d3.ForceManyBody<D3Node> = d3.forceManyBody().strength(this.nodeForceStrength);
        const simulation: d3.Simulation<D3Node, D3Link> = d3.forceSimulation(nodes)
            .force("link", linkForce)
            .force("charge", bodyForce)
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .on("tick", ticked);

        // Specify the color scale.
        if (this.customColorScheme) {
            this.color = d3.scaleOrdinal(this.customColorScheme);
        } else {
            this.color = d3.scaleOrdinal(d3.schemeTableau10);
        }

        // draw the force graph svg elements
        this.update({links, nodes, simulation});
        d3.select("button.submit")
            .on("click", () => this.update);


    }

    public highlightNode(nodeId: number) {
        const node = d3.select(`[data-value="${nodeId}"]`);
        node
            .style("fill", "red")
            .style("stroke", "#73002c");
    }

    public clearHighlight(nodeId: number) {
        const node = d3.select(`[data-value="${nodeId}"]`);
        node
            .style("fill", this.color(String(nodeId)))
            .style("stroke", this.nodeOutlineColor);

    }

    public clearAllHighlights(allNodeIds: number[]) {
        allNodeIds.forEach((nodeId) => {
            const node = d3.select(`[data-value="${nodeId}"]`);
            node
                .style("fill", this.color(String(nodeId)))
                .style("stroke", this.nodeOutlineColor);
        })
    }

    private update({links, nodes, simulation}: updateProperties) {
        d3.select(this.selector).selectAll("*").remove();
        // Select the SVG container.
        const svg = d3.select(this.selector)
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("viewBox", [-this.width / 2, -this.height / 2, this.width, this.height])

        // Add a line for each link, and a circle for each node.
        const linkGroup = svg.selectAll("g.links")
            .data([links])
        this.allLinks = linkGroup.enter()
            .append("g")
            .attr("stroke", this.linkColor)
            .attr("stroke-opacity", this.linkOpacity)
            .attr("class", "links")
            .selectAll<SVGLineElement, D3Link>("link")
            .data((d: D3Link[]) => d)
            .join("line")
            .attr("stroke-width", (_: D3Link) => Math.sqrt(3));

        const nodeGroup = svg.selectAll("g.nodes")
            .data([nodes])
        this.allNodes = nodeGroup.enter()
            .append("g")
            .attr("class", "nodes")
            .selectAll<SVGElement, D3Node>("circle")
            .data((d: D3Node[]) => d)
            .join("circle")
            .attr("r", this.nodeRadius)
            .attr("stroke", this.nodeOutlineColor)
            .attr("stroke-opacity", this.nodeOutlineOpacity)
            .attr("stroke-width", this.nodeOutlineWidth)
            .attr("fill", (d: D3Node) => this.color(String(d.id)))
            .attr("data-value", (d: D3Node, _: number) => d.id);

        this.allNodes.append("title")
            .text((d: D3Node) => d.id);

        // allNodes.on("click", highlightNodes);

        const labelGroup = svg.selectAll("g.labels")
            .data([nodes])
        this.allLabels = labelGroup.enter()
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
        this.allNodes.call(dragNodes(simulation));
    }


}

export default ForceGraph;