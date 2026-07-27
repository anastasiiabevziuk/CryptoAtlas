'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { GRAPH_CONFIG } from '@/config/graphConfig';
import type { GraphData, GraphNode, GraphLink } from '@/types/graph';


const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
});

interface GraphCanvasProps {
    fgRef: any;
    graphData: GraphData;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ fgRef, graphData }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 520 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        if (graphData.nodes.length > 0 && fgRef.current) {
            const timer = setTimeout(() => {
                fgRef.current?.zoomToFit(400, 45);
            }, 150);
            return () => clearTimeout(timer);
        }
    }, [graphData, fgRef]);

    const getNodeColor = (node: any): string => {
        if (node.group === 'crypto') return GRAPH_CONFIG.nodeColors.crypto;
        if (node.group === 'regulator') return GRAPH_CONFIG.nodeColors.regulator;
        return GRAPH_CONFIG.nodeColors.regulation;
    };

    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
                height={dimensions.height}
                graphData={graphData}
                nodeLabel="name"
                nodeColor={getNodeColor}
                nodeVal="val"
                linkDirectionalArrowLength={GRAPH_CONFIG.arrowLength}
                linkDirectionalArrowRelPos={GRAPH_CONFIG.arrowRelPos}
                linkColor={(link: any) => {
                    const linkType = (link as GraphLink).type;
                    return (GRAPH_CONFIG.linkColors as Record<string, string>)[linkType] || GRAPH_CONFIG.linkColors.default;
                }}
                linkWidth={1}
                backgroundColor={GRAPH_CONFIG.background}
                nodeCanvasObject={(node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
                    const typedNode = node as GraphNode & { x: number; y: number };
                    const label = typedNode.name;
                    const fontSize = GRAPH_CONFIG.fontSizeOffset / globalScale;

                    ctx.font = `${fontSize}px Inter, sans-serif`;
                    ctx.fillStyle = GRAPH_CONFIG.nodeColors.default;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(label, typedNode.x, typedNode.y + GRAPH_CONFIG.textOffset);

                    ctx.beginPath();
                    ctx.arc(typedNode.x, typedNode.y, GRAPH_CONFIG.nodeSize, 0, 2 * Math.PI, false);
                    ctx.fillStyle = getNodeColor(typedNode);
                    ctx.fill();
                }}
            />
        </div>
    );
};
