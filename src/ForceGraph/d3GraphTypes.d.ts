import * as d3 from "d3";
export type D3Node = d3.SimulationNodeDatum & {
    id: number;
    group?: string;
    radius?: number;
    citing_patents_count?: number;
}

export type D3Link = d3.SimulationLinkDatum<D3Node> & {
    value?: number;
    direction?: boolean;
    weighted?: boolean;
    weight?: number;
};

export type D3Graph = {
    nodes: D3Node[];
    links: D3Link[];
}

export interface D3GraphProperties {
    width: number,
    height: number,
    customColorScheme?: string[] | null,
    linkColor?: string,
    linkOpacity?: number,
    nodeForceStrength?: number,
    nodeRadius?: number,
    nodeOutlineColor?: string,
    nodeOutlineOpacity?: number,
    nodeOutlineWidth?: number
}
