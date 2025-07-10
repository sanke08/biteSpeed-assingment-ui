import "reactflow/dist/style.css";

import { Canvas } from "./canvas";
import { SideBar } from "./sidebar";
import { nodeRegistry } from "../utils/node-registery";
import { useFlowBuilder } from "../hooks/useFlowBuilder";
import { ReactFlowProvider } from "reactflow";

export default function FlowBuilder() {


    const {
        edges, handleSave, handleTextChange,
        nodeTypes, nodes, onConnect,
        onDragOver, onDrop, onEdgesChange,
        onNodeClick, onNodesChange, onPaneClick,
        reactFlowWrapper, selectedNode, setReactFlowInstance,
        textValue, onEdgesDelete, onNodesDelete, message
    } = useFlowBuilder()


    return (
        <ReactFlowProvider>

            <div className="h-screen flex flex-col">
                {
                    message &&
                    <div className={`absolute top-2 left-1/2 -translate-x-1/2 p-2 px-4 rounded ${message.type == "errror" ? " bg-red-500/30" : " bg-emerald-500/30"} `}>{message.type == "errror" ? ("Cannot save flow") : ("Flow saved")}</div>
                }
                <div className="py-4 border-b border-gray-200 flex justify-end px-4">
                    <button
                        onClick={handleSave}
                        className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M8 7H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3m-1-4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        Save Flow
                    </button>
                </div>
                <div className="flex flex-1 overflow-hidden">
                    <div ref={reactFlowWrapper} className=" flex flex-1">

                        <Canvas
                            nodes={nodes}
                            edges={edges}
                            nodeTypes={nodeTypes}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onNodeClick={onNodeClick}
                            onPaneClick={onPaneClick}
                            setReactFlowInstance={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            OnEdgesDelete={onEdgesDelete}
                            onNodesDelete={onNodesDelete}
                        />
                    </div>
                    <SideBar
                        selectedNode={selectedNode}
                        textValue={textValue}
                        handleTextChange={handleTextChange}
                        nodeOptions={nodeRegistry}
                        onNodesDelete={onNodesDelete}
                        onNodeClick={onNodeClick}
                    />
                </div>
            </div>
        </ReactFlowProvider>
    );
}
