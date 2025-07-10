import type { Node, NodeMouseHandler, OnNodesDelete } from "reactflow";

/* ---------- SideBar Component ---------- */
type SideBarProps = {
    selectedNode: Node | null;
    textValue: string;
    handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    nodeOptions: { type: string; label: string; icon: string; platform: string }[];
    onNodesDelete: OnNodesDelete
    onNodeClick: NodeMouseHandler
    // addNode: (option: string, platform: string) => void
};

export const SideBar = ({
    selectedNode,
    textValue,
    handleTextChange,
    nodeOptions,
    onNodesDelete,
    onNodeClick
}: SideBarProps) => {
    return (
        <div className="w-96 border-l border-gray-200 bg-white shadow-lg overflow-y-auto">
            {selectedNode ? (
                <div className=" flex flex-col">

                    <div className="p-4  rounded-lg shadow-sm">
                        <div className="relative w-full py-1">
                            {/* @ts-expect-error because we are not setting Node */}
                            <button onClick={(e) => onNodeClick(e, null)} className="absolute left-0 top-1/2 -translate-y-1/2 aspect-square rounded text-black p-1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg> </button>
                            <h2 className="text-xl font-semibold text-center py-1">Message</h2>
                        </div>
                        <label htmlFor="node-text-input" className="block text-sm font-medium text-gray-500 mb-2 mt-4">Text</label>
                        <textarea
                            id="node-text-input"
                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm min-h-20 max-h-40 text-start"
                            value={textValue}
                            onChange={handleTextChange}
                            placeholder="Enter node text"
                        />
                    </div>
                    <button onClick={() => onNodesDelete([selectedNode])} className="p-2 mt-4 w-[94%] self-center px-4 rounded bg-rose-600 text-white">Delete</button>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4 p-4">
                    {nodeOptions.map((option) => (
                        <div
                            draggable
                            onDragStart={(e) => {
                                e.dataTransfer.setData("application/reactflow", JSON.stringify({ type: option.type, platform: option.platform }))
                                e.dataTransfer.effectAllowed = "move"
                            }}
                            key={option.platform}
                            // onClick={() => addNode(option.type, option.platform)}
                            className="p-2 bg-gray-50 rounded flex flex-col items-center justify-center border border-blue-400 cursor-pointer hover:bg-blue-50 transition"
                        >
                            <img src={option.icon} alt="" className="h-8 w-8" />
                            <p className="text-sm font-medium text-gray-600 text-center">{option.label}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
