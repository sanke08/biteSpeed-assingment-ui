import { memo, type DragEventHandler } from "react";
import ReactFlow, { type Edge, type Node, type OnEdgesDelete, type OnNodesDelete, } from "reactflow";

/* ---------- Canvas Component ---------- */
type CanvasProps = {
    nodes: Node[] | undefined;
    edges: Edge[];
    nodeTypes: any;
    onNodesChange: any;
    onEdgesChange: any;
    onConnect: any;
    onNodeClick: any;
    onPaneClick: any;
    onDrop: DragEventHandler<HTMLDivElement>,
    onDragOver: DragEventHandler<HTMLDivElement>,
    setReactFlowInstance: any,
    OnEdgesDelete: OnEdgesDelete
    onNodesDelete:OnNodesDelete
};
export const Canvas = memo(({
    nodes,
    edges,
    nodeTypes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodeClick,
    onPaneClick,
    onDrop,
    onDragOver,
    onNodesDelete,
    OnEdgesDelete,
    setReactFlowInstance,
}: CanvasProps) => (
    <div className="flex-1 h-full">
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onEdgesDelete={OnEdgesDelete}
            onNodesDelete={onNodesDelete}
            fitView
        >
            {/* <MiniMap /> */}
            {/* <Controls /> */}
        </ReactFlow>
    </div>
));

