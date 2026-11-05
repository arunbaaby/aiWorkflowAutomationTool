import React, { useState } from 'react';
import {
  NodqLogo,
  GmailIcon,
  DiscordIcon,
  GDocsIcon,
  MeetIcon,
  NotionIcon,
  AirtableIcon,
  GSheetsIcon,
  GFormsIcon,
  ApiCloudIcon,
  SlackIcon,
  AwsIcon,
  DriveIcon,
  GoogleGIcon
} from './Icons';

const tabs = ['General', 'LLMs', 'Knowledge Base', 'Integrations', 'Multi-Modal'];

interface TabItem {
  name: string;
  type: string;
  iconComponent?: React.ReactNode;
  iconText?: string;
  isFaded?: boolean;
  badge?: string;
}

const tabItems: Record<string, TabItem[]> = {
  'Integrations': [
    { name: 'Gmail', type: 'gmail', iconComponent: <GmailIcon className="w-7 h-7" /> },
    { name: 'Discord', type: 'discord', iconComponent: <DiscordIcon className="w-7 h-7" /> },
    { name: 'GDocs', type: 'gdocs', iconComponent: <GDocsIcon className="w-7 h-7" /> },
    { name: 'Google Meet', type: 'google-meet', iconComponent: <MeetIcon className="w-7 h-7" /> },
    { name: 'Notion', type: 'notion', iconComponent: <NotionIcon className="w-7 h-7" /> },
    { name: 'Airtable', type: 'airtable', iconComponent: <AirtableIcon className="w-7 h-7" /> },
    { name: 'GSheets', type: 'gsheets', iconComponent: <GSheetsIcon className="w-7 h-7" /> },
    { name: 'GForms', type: 'gforms', iconComponent: <GFormsIcon className="w-7 h-7" /> },
    { name: 'API', type: 'api', iconComponent: <ApiCloudIcon className="w-7 h-7" /> },
    { name: 'Coming Soon', type: 'slack', iconComponent: <SlackIcon className="w-7 h-7 opacity-75" /> },
    { name: 'Coming Soon', type: 'hub', iconText: '🔮' },
    { name: 'Coming Soon', type: 'aws', iconComponent: <AwsIcon className="w-7 h-7" />, badge: 'aws' },
    { name: 'Coming Soon', type: 'drive', iconComponent: <DriveIcon className="w-7 h-7 opacity-80" /> },
    { name: 'Coming Soon', type: 'network', iconText: '🕸️' },
  ],
  'General': [
    { name: 'Nodq Input', type: 'input', iconText: '📥' },
    { name: 'Output', type: 'output', iconText: '📤' },
    { name: 'Text', type: 'text', iconText: '📝' },
    { name: 'File', type: 'file', iconText: '📄' },
  ],
  'LLMs': [
    { name: 'Gemini', type: 'gemini', iconComponent: <GoogleGIcon className="w-7 h-7" /> },
    { name: 'ChatGPT', type: 'chatgpt', iconText: '🤖' },
    { name: 'Claude', type: 'claude', iconText: '🧠' },
  ],
  'Knowledge Base': [
    { name: 'Vector DB', type: 'vector db', iconText: '🗄️' },
    { name: 'Embeddings', type: 'embeddings', iconText: '🔢' },
  ],
  'Multi-Modal': [
    { name: 'Vision', type: 'vision', iconText: '👁️' },
    { name: 'Audio', type: 'audio', iconText: '🎧' },
  ]
};

const onDragStart = (event: React.DragEvent, nodeType: string, label: string, iconText?: string) => {
  event.dataTransfer.setData('application/reactflow/type', nodeType);
  event.dataTransfer.setData('application/reactflow/label', label);
  event.dataTransfer.setData('application/reactflow/icon', iconText || '⚙️');
  event.dataTransfer.effectAllowed = 'move';
};

export function Header() {
  const [activeTab, setActiveTab] = useState('Integrations');
  const currentItems = tabItems[activeTab] || [];

  return (
    <header className="w-full bg-[#f8fafc]/90 backdrop-blur-md text-slate-800 flex flex-col px-6 pt-3 pb-2 gap-2.5 border-b border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.03)] z-10">
      {/* Top Row: Title, Pipelines Dropdown, Logo, and Top-Right Action Buttons */}
      <div className="flex justify-between items-center w-full">
        {/* Left: Project title & Pipelines dropdown */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium cursor-pointer hover:text-slate-800 transition-colors">
            <span>Pipelines</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* Center: Nodq Logo */}
        <div className="flex items-center gap-2 select-none -ml-16">
          <NodqLogo className="w-7 h-7" />
          <span className="text-2xl font-black tracking-tight text-[#1e293b]">Nodq</span>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2.5">
          {/* Share/Export button */}
          <button className="w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors" title="Export">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>

          {/* Bookmark button */}
          <button className="w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-colors" title="Bookmark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {/* Templates Button */}
          <button className="bg-[#2563eb] text-white hover:bg-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5">
            <span>Templates</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Second Row: Category Tabs */}
      < div className="flex gap-2 items-center">
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${isActive
                ? 'bg-[#2563eb] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200/80 hover:bg-slate-50'
                }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Third Row: Draggable Item Cards Row */}
      <div className="flex gap-3 overflow-x-auto pb-1 hide-scrollbars items-center min-h-[5.2rem]">
        {currentItems.map((item, index) => (
          <div
            key={`${activeTab}-${index}`}
            draggable={!item.isFaded}
            onDragStart={(event) =>
              onDragStart(
                event,
                item.type,
                item.name === 'Coming Soon' ? item.type : item.name,
                item.iconText || '⚙️'
              )
            }
            className={`flex flex-col items-center justify-center w-[74px] h-[72px] rounded-2xl bg-white border border-slate-200/70 shadow-[0_2px_6px_rgba(0,0,0,0.03)] shrink-0 transition-all select-none ${item.isFaded
              ? 'opacity-50 grayscale cursor-not-allowed'
              : 'cursor-grab active:cursor-grabbing hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200'
              }`}
          >
            {item.badge && (
              <span className="text-[9px] font-bold text-slate-400 -mb-1">{item.badge}</span>
            )}
            <div className="flex items-center justify-center h-8 my-0.5">
              {item.iconComponent ? (
                item.iconComponent
              ) : (
                <span className="text-2xl">{item.iconText}</span>
              )}
            </div>
            <span className="text-[10px] font-semibold text-slate-700 whitespace-nowrap tracking-tight">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}
