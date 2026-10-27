import { Handle, Position } from '@xyflow/react';

interface WorkflowNodeData {
    label: string;
    icon?: string;
}

export function WorkflowNode({ data }: { data: WorkflowNodeData }) {
    return (
        <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-md border border-gray-200 min-w-[150px] hover:shadow-lg transition-shadow">
            {/* Target handle (Input wire on the left) */}
            <Handle
                type="target"
                position={Position.Left}
                className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white"
            />

            {/* Node Icon */}
            {data.icon && <span className="text-2xl select-none">{data.icon}</span>}

            {/* Node Label */}
            <div className="flex flex-col">
                <span className="text-xs font-semibold text-gray-800">{data.label}</span>
            </div>

            {/* Source handle (Output wire on the right) */}
            <Handle
                type="source"
                position={Position.Right}
                className="!w-3 !h-3 !bg-indigo-500 !border-2 !border-white"
            />
        </div>
    );
}
