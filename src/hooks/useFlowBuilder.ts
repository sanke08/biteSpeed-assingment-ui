import { useCallback, useMemo, useRef, useState } from "react";
import {
    addEdge,
    useNodesState,
    useEdgesState,
    type Edge,
    type Connection,
    type Node,
} from "reactflow";
import { nodeRegistry } from "../utils/node-registery";
import type { NodeData } from "../utils/types";

export function useFlowBuilder() {
    const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [textValue, setTextValue] = useState("");
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
    const [message, setMessage] = useState<{ type: "errror" | "success" } | null>(null)

    const nodeTypes = useMemo(() => {
        const types: Record<string, any> = {};
        nodeRegistry.forEach((n) => {
            types[`${n.type}Node`] = n.component;
        });
        return types;
    }, []);

    const onConnect = useCallback(
        (params: Edge | Connection) => {
            const fromNodeEdges = edges.filter((e) => e.source === params.source);
            if (fromNodeEdges.length > 0) return;
            setEdges((eds) => addEdge(params, eds));
        },
        [edges, setEdges]
    );


    const onEdgesDelete = useCallback(
        (edgesToDelete: Edge[]) => {
            setEdges((eds) => eds.filter((e) => !edgesToDelete.some((del) => del.id === e.id)));
        },
        [setEdges]
    );

    const onNodesDelete = useCallback((nodesToDelete: Node[]) => {
        setNodes((nds) => nds.filter((n) => !nodesToDelete.some((d) => d.id === n.id)));
        setEdges((eds) => eds.filter((e) => !nodesToDelete.some((d) => d.id === e.source || d.id === e.target)));
        setSelectedNode(null)
    }, [setNodes]);



    const addNode = useCallback(
        (type: string, platform: string, position?: { x: number; y: number }) => {
            const nodeDef = nodeRegistry.find((n) => n.type === type && n.platform === platform);
            if (!nodeDef) return;

            const id = `${Date.now()}`; // cleaner than +new Date()
            const newNode: Node<NodeData> = {
                id,
                type: `${nodeDef.type}Node`,
                position: position ?? { x: 250 + nodes.length * 50, y: 100 + nodes.length * 60 },
                data: {
                    label: nodeDef.defaultData.label ?? `${platform} ${type}`,
                    platform,
                    type,
                    ...nodeDef.defaultData,
                },
            };

            setNodes((nds) => [...nds, newNode]);
            setSelectedNode(newNode);
        },
        [setNodes, setSelectedNode, nodes.length] // add dependencies for correctness
    );


    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();
            if (!reactFlowWrapper.current || !reactFlowInstance) return;
            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const data = event.dataTransfer.getData("application/reactflow");
            if (!data) return;

            const { type, platform } = JSON.parse(data);

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            addNode(type, platform, position);
        },
        [reactFlowInstance, addNode]
    );

    const onPaneClick = useCallback(() => setSelectedNode(null), []);

    const onNodeClick = (_: any, node: Node) => {
        setSelectedNode(node);
        setTextValue(node.data.label);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(e.target.value);
        if (selectedNode) {
            setNodes((nds) =>
                nds.map((n) =>
                    n.id === selectedNode?.id ? { ...n, data: { ...n.data, label: e.target.value } } : n
                )
            );
        }
    };

    const handleSave = useCallback(() => {
        const outgoingIds = edges.map((e) => e.source);
        const noOutgoingNodes = nodes.filter((n) => !outgoingIds.includes(n.id));
        if (nodes.length > 1 && noOutgoingNodes.length > 1) {
            setMessage({ type: "errror" })
            // alert("Error: More than one node without outgoing connection");
            return;
        }
        // const exportData = {
        //     nodes,
        //     edges,
        //     createdAt: new Date().toISOString(),
        // };
        // console.log("Saved Flow:", exportData);
        setMessage({ type: "success" })
        // alert("Flow saved successfully!");
    }, [edges, nodes]);

    return {
        nodes,
        setNodes,
        onNodesChange,
        edges,
        onEdgesChange,
        nodeTypes,
        onConnect,
        onNodeClick,
        onPaneClick,
        handleSave,
        reactFlowWrapper,
        setReactFlowInstance,
        onDrop,
        onDragOver,
        selectedNode,
        textValue,
        handleTextChange,
        onEdgesDelete,
        onNodesDelete,
        message
    };
}
