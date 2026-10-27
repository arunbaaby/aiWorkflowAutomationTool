import React, { useState } from 'react';


const tabs = ['General', 'LLMs', 'Knowledge Base', 'Integrations', 'Multi-Modal'];

const tabItems: Record<string, { name: string, icon: string, isFaded?: boolean }[]> = {
  'General': [
    { name: 'Input', icon: '📥' },
    { name: 'Output', icon: '📤' },
    { name: 'Text', icon: '📝' },
    { name: 'File', icon: '📄' },
  ],
  'Integrations': [
    { name: 'Gmail', icon: '📧' },
    { name: 'Discord', icon: '👾' },
    { name: 'GDocs', icon: '📄' },
    { name: 'Google Meet', icon: '📹' },
    { name: 'Notion', icon: '📓' },
    { name: 'Airtable', icon: '🟩' },
    { name: 'GSheets', icon: '📊' },
    { name: 'GForms', icon: '📝' },
    { name: 'API', icon: '☁️' },
    { name: 'Coming Soon', icon: '🔮', isFaded: true },
    { name: 'Coming Soon', icon: '🔮', isFaded: true },
    { name: 'Coming Soon', icon: '🔮', isFaded: true },
  ],
  'LLMs': [
    { name: 'ChatGPT', icon: '🤖' },
    { name: 'Claude', icon: '🧠' },
    { name: 'Gemini', icon: '✨' },
  ],
  'Knowledge Base': [
    { name: 'Vector DB', icon: '🗄️' },
    { name: 'Embeddings', icon: '🔢' },
  ],
  'Multi-Modal': [
    { name: 'Vision', icon: '👁️' },
    { name: 'Audio', icon: '🎧' },
  ]
};

const onDragStart = (event: React.DragEvent, nodeType: string, label: string, icon: string) => {
  event.dataTransfer.setData('application/reactflow/type', nodeType);
  event.dataTransfer.setData('application/reactflow/label', label);
  event.dataTransfer.setData('application/reactflow/icon', icon);
  event.dataTransfer.effectAllowed = 'move';
}

export function Header() {
  const [activeTab, setActiveTab] = useState('Integrations');
  const currentItems = tabItems[activeTab] || [];

  return (
    <header className="w-full bg-[#6366f1] text-white flex flex-col px-5 py-4 gap-4 shadow-sm z-10">
      {/* Top Row: Pipelines and Action Buttons */}
      <div className="flex justify-between items-center w-full">
        {/* Pipelines Dropdown */}
        <button className="bg-white text-gray-800 px-4 py-1.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-gray-50 transition-colors">
          Pipelines <span className="text-gray-400 text-xs">▼</span>
        </button>

        {/* Top Right Action Buttons */}
        <div className="flex gap-3">
          <button className="bg-[#3730a3] text-white hover:bg-[#312e81] w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" /></svg>
          </button>
          <button className="bg-[#3730a3] text-white hover:bg-[#312e81] w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
          </button>
          <button className="bg-[#3730a3] text-white hover:bg-[#312e81] px-4 py-1.5 rounded-full text-sm font-bold transition-colors shadow-sm flex items-center gap-2">
            Templates
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
        </div>
      </div>

      {/* Second Row: Category Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors shadow-sm ${tab === activeTab
              ? 'bg-[#3730a3] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Third Row: Dynamic Item List */}
      <div className="flex gap-3 overflow-x-auto pb-1 mt-1 hide-scrollbars h-[5.5rem] items-center">
        {currentItems.map((item, index) => (
          <div
            key={`${activeTab}-${index}`}
            draggable={!item.isFaded}
            onDragStart={(event) => onDragStart(event, item.name.toLowerCase(), item.name, item.icon)}
            className={`flex flex-col items-center justify-center w-[5.5rem] h-20 rounded-xl bg-white shadow-sm shrink-0 transition-transform select-none ${item.isFaded
              ? 'opacity-60 grayscale cursor-not-allowed'
              : 'cursor-grab active:cursor-grabbing hover:-translate-y-1 hover:shadow-md'
              }`}
          >
            <div className="text-2xl mb-1.5">{item.icon}</div>
            <span className="text-[11px] font-bold text-gray-700 whitespace-nowrap tracking-wide">{item.name}</span>
          </div>
        ))}
      </div>
    </header >
  );
}
