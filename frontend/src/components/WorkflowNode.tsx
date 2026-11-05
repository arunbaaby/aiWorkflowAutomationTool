import { Handle, Position, useReactFlow } from '@xyflow/react';
import { GoogleGIcon, GmailIcon } from './Icons';

interface WorkflowNodeData {
  label: string;
  icon?: string;
  nodeType?: string;
  params?: Record<string, any>;
  fieldName?: string;
  fieldType?: string;
  systemPrompt?: string;
  userPrompt?: string;
}

export function WorkflowNode({ id, data }: { id: string; data: WorkflowNodeData }) {
  const nodeType = (data.nodeType || data.label || '').toLowerCase();
  const { updateNodeData } = useReactFlow();

  // 1. Nodq Input Node Style
  if (nodeType.includes('input')) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/90 p-4 min-w-[210px] relative hover:shadow-xl transition-shadow select-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold text-slate-800 text-sm tracking-tight">{data.label || 'Nodq Input'}</span>
          <button className="text-slate-400 hover:text-slate-600 text-xs">⚙</button>
        </div>

        {/* Field Name */}
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-[11px] font-medium text-slate-500">Field Name:</span>
          <input
            type="text"
            placeholder="Enter here"
            className="bg-slate-100/90 text-slate-700 placeholder-slate-400 text-xs px-3 py-1.5 rounded-lg border border-transparent focus:outline-none focus:bg-white focus:border-blue-400 nodrag transition-colors"
            value={data.params?.fieldName || ''}
            onChange={(e) => {
              updateNodeData(id, {
                params: { ...data.params, fieldName: e.target.value }
              });
            }}
          />
        </div>

        {/* Type */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500">Type:</span>
          <button className="bg-[#2563eb] text-white text-xs px-3 py-1 rounded-md font-medium shadow-sm hover:bg-blue-700 transition-colors">
            {data.fieldType || 'Text'}
          </button>
        </div>

        {/* Wire Handle on Right */}
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex items-center">
          <Handle
            id="output"
            type="source"
            position={Position.Right}
            className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
          />
          <span className="absolute left-3.5 text-[10px] font-medium text-slate-400 whitespace-nowrap pointer-events-none">
            Wire
          </span>
        </div>
      </div>
    );
  }

  // 2. Gemini / LLM Node Style
  if (nodeType.includes('gemini') || nodeType.includes('llm') || nodeType.includes('chatgpt') || nodeType.includes('claude')) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(37,99,235,0.12)] border-2 border-blue-400 p-4 min-w-[220px] relative hover:shadow-xl transition-shadow select-none">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-slate-800 text-sm tracking-tight">{data.label || 'Gemini'}</span>
          <button className="text-slate-400 hover:text-slate-600 text-xs">⚙</button>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center my-2">
          <GoogleGIcon className="w-10 h-10" />
        </div>

        {/* System */}
        <div className="flex flex-col gap-1 mb-2.5">
          <span className="text-[11px] font-medium text-slate-500">System:</span>
          <div className="bg-slate-100/90 rounded-lg px-3 py-1.5 flex items-center">
            <span className="text-sm">✨</span>
          </div>
        </div>

        {/* Prompt */}
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium text-slate-500">Prompt:</span>
          <input
            type="text"
            placeholder="Enter here"
            value={data.params?.userPrompt || ''}
            onChange={(e) => {
              updateNodeData(id, {
                params: { ...data.params, userPrompt: e.target.value }
              });
            }}
            className="bg-slate-100/90 text-slate-700 placeholder-slate-400 text-xs px-3 py-1.5 rounded-lg border border-transparent focus:outline-none focus:bg-white focus:border-blue-400 nodrag transition-colors"
          />
        </div>

        {/* Top-left input handle (user prompt) */}
        <div className="absolute -left-1.5 top-[38%] flex items-center">
          <span className="absolute right-3.5 text-[10px] font-medium text-slate-400 whitespace-nowrap pointer-events-none">
            user prompt
          </span>
          <Handle
            id="user-prompt"
            type="target"
            position={Position.Left}
            className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
          />
        </div>

        {/* Bottom-left input handle (prompt) */}
        <div className="absolute -left-1.5 top-[76%] flex items-center">
          <span className="absolute right-3.5 text-[10px] font-medium text-slate-400 whitespace-nowrap pointer-events-none">
            prompt
          </span>
          <Handle
            id="prompt"
            type="target"
            position={Position.Left}
            className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
          />
        </div>

        {/* Right output handle (llm response) */}
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex items-center">
          <Handle
            id="llm-response"
            type="source"
            position={Position.Right}
            className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
          />
          <span className="absolute left-3.5 text-[10px] font-medium text-slate-400 whitespace-nowrap pointer-events-none">
            llm response
          </span>
        </div>
      </div>
    );
  }

  // 3. Output / Gmail Node Style
  if (nodeType.includes('output') || nodeType.includes('gmail') || nodeType.includes('email')) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/90 p-4 min-w-[110px] flex flex-col items-center justify-center relative hover:shadow-xl transition-shadow select-none">
        <span className="font-bold text-slate-800 text-sm mb-1 tracking-tight">Output</span>
        <div className="my-1.5">
          <GmailIcon className="w-8 h-8" />
        </div>
        <span className="text-xs font-semibold text-slate-700">Gmail</span>

        {/* Left Target Handle */}
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex items-center">
          <span className="absolute right-3.5 text-[10px] font-medium text-slate-400 whitespace-nowrap pointer-events-none">
            send email
          </span>
          <Handle
            id="input"
            type="target"
            position={Position.Left}
            className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
          />
        </div>
      </div>
    );
  }

  // 4. General Custom Node Style
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-200/90 p-3.5 min-w-[150px] relative hover:shadow-xl transition-shadow select-none">
      {/* Target handle on left */}
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
      />

      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-800 tracking-tight">{data.label}</span>
        <button className="text-slate-400 hover:text-slate-600 text-xs">⚙</button>
      </div>

      <div className="flex items-center gap-2.5 my-1">
        {data.icon && <span className="text-2xl">{data.icon}</span>}
        <span className="text-[11px] text-slate-500 font-medium">Ready</span>
      </div>

      {/* Source handle on right */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-2.5 !h-2.5 !bg-[#2563eb] !border-2 !border-white !rounded-full"
      />
    </div>
  );
}
