export interface GraphNode {
    id: string;
    name: string;
    group: string;
    val?: number;
    x?: number;
    y?: number;
}

export interface GraphLink {
    source: string | GraphNode;
    target: string | GraphNode;
    type: string;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}