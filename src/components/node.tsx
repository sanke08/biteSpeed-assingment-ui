import { Handle, Position, type NodeProps } from "reactflow";

export function Node({ data }: NodeProps) {
    return (
        <div className="bg-white border border-blue-300 rounded-lg shadow-lg overflow-hidden min-w-[250px] max-w-[300px]">
            <div className="bg-emerald-400/30 text-sm px-4 py-1 flex items-center justify-between">
                <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Send Message
                </span>
                {data.platform &&  (
                    <img src={data.icon} alt={data.platform} className='h-4 w-4 object-contain' />
                )}
            </div>
            <div className="px-4 py-2 text-gray-800 text-sm break-words">
                {data.label || "No message set"}
            </div>
            <Handle
                type="source"
                position={Position.Right}
                id="a"
                className="w-4 h-4 bg-blue-400 rounded-full border-2 border-blue-600 cursor-grab"
            />
            <Handle
                type="target"
                position={Position.Left}
                id="b"
                className="w-4 h-4 bg-green-400 rounded-full border-2 border-green-600 cursor-grab"
            />
        </div>
    );
}
