import type { Node } from '@xyflow/react';

interface ConfigPanelProps {
    node: Node;
    onClose: () => void;
    onUpdateLabel: (id: string, newLabel: string) => void;
    onDeleteNode: (id: string) => void;
}

export function ConfigPanel({ node, onClose, onUpdateLabel, onDeleteNode }: ConfigPanelProps) {
    const nodeData = node.data as { label?: string; icon?: string };

    return (
        <aside className="absolute top-4 right-4 z-20 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                    <span className="text-2xl">{nodeData?.icon || '⚙️'}</span>
                    <div>
                        <h3 className="font-bold text-gray-800 text-sm">{nodeData?.label || 'Node'}</h3>
                        <span className="text-[11px] text-gray-400 font-mono">{node.id}</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-600 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                    ✕
                </button>
            </div>

            {/* Settings Fields */}
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Label / Name</label>
                <input
                    type="text"
                    value={nodeData?.label || ''}
                    onChange={(e) => onUpdateLabel(node.id, e.target.value)}
                    onKeyDown={(e) => e.stopPropagation()}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 focus:bg-white transition-all nodrag"
                />
            </div>

            {/* Delete Action */}
            <div className="pt-2 border-t">
                <button
                    onClick={() => onDeleteNode(node.id)}
                    className="w-full py-2 px-3 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                    🗑️ Delete Node
                </button>
            </div>
        </aside>
    );
}
