export type FieldType = 'text' | 'textarea' | 'select' | 'number';

export interface NodeField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  description?: string;
}

export interface NodeDefinition {
  type: string;
  category: 'General' | 'LLMs' | 'Integrations' | 'Knowledge Base' | 'Multi-Modal';
  name: string;
  icon: string;
  description: string;
  isFaded?: boolean;
  defaultParams: Record<string, any>;
  fields: NodeField[];
}

export const NODE_REGISTRY: Record<string, NodeDefinition> = {
  // General
  input: {
    type: 'input',
    category: 'General',
    name: 'Input',
    icon: '📥',
    description: 'Initial data or text input for the workflow',
    defaultParams: {
      inputData: 'Summarize the latest trends in AI automation.',
    },
    fields: [
      {
        key: 'inputData',
        label: 'Input Data / Prompt',
        type: 'textarea',
        placeholder: 'Enter starting text or query for the workflow...',
      },
    ],
  },
  output: {
    type: 'output',
    category: 'General',
    name: 'Output',
    icon: '📤',
    description: 'Final workflow output or result preview',
    defaultParams: {
      outputFormat: 'json',
    },
    fields: [
      {
        key: 'outputFormat',
        label: 'Format',
        type: 'select',
        options: ['json', 'markdown', 'plain-text'],
      },
    ],
  },
  text: {
    type: 'text',
    category: 'General',
    name: 'Text',
    icon: '📝',
    description: 'Static text or prompt template',
    defaultParams: {
      content: '',
    },
    fields: [
      {
        key: 'content',
        label: 'Content',
        type: 'textarea',
        placeholder: 'Enter static text content...',
      },
    ],
  },
  file: {
    type: 'file',
    category: 'General',
    name: 'File',
    icon: '📄',
    description: 'File upload or document data source',
    defaultParams: {
      filename: '',
    },
    fields: [
      {
        key: 'filename',
        label: 'File Name / URL',
        type: 'text',
        placeholder: 'document.pdf or https://...',
      },
    ],
  },

  // LLMs
  chatgpt: {
    type: 'chatgpt',
    category: 'LLMs',
    name: 'ChatGPT',
    icon: '🤖',
    description: 'Process prompt with OpenAI GPT models',
    defaultParams: {
      model: 'gpt-4o',
      systemPrompt: 'You are an intelligent assistant in an automation pipeline.',
      userPrompt: '{{input}}',
      temperature: 0.7,
    },
    fields: [
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo'],
      },
      {
        key: 'systemPrompt',
        label: 'System Prompt',
        type: 'textarea',
        placeholder: 'You are a helpful assistant...',
      },
      {
        key: 'userPrompt',
        label: 'User Prompt',
        type: 'textarea',
        placeholder: 'Use {{input}} to refer to incoming data...',
      },
    ],
  },
  claude: {
    type: 'claude',
    category: 'LLMs',
    name: 'Claude',
    icon: '🧠',
    description: 'Process prompt with Anthropic Claude models',
    defaultParams: {
      model: 'claude-3-5-sonnet',
      userPrompt: 'Analyze this input: {{input}}',
    },
    fields: [
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: ['claude-3-5-sonnet', 'claude-3-haiku', 'claude-3-opus'],
      },
      {
        key: 'userPrompt',
        label: 'Prompt',
        type: 'textarea',
        placeholder: 'Prompt text...',
      },
    ],
  },
  gemini: {
    type: 'gemini',
    category: 'LLMs',
    name: 'Gemini',
    icon: '✨',
    description: 'Process prompt with Google Gemini models',
    defaultParams: {
      model: 'gemini-1.5-flash',
      userPrompt: 'Summarize: {{input}}',
    },
    fields: [
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: ['gemini-1.5-flash', 'gemini-1.5-pro'],
      },
      {
        key: 'userPrompt',
        label: 'Prompt',
        type: 'textarea',
        placeholder: 'Prompt text...',
      },
    ],
  },

  // Integrations
  gmail: {
    type: 'gmail',
    category: 'Integrations',
    name: 'Gmail',
    icon: '📧',
    description: 'Send an automated email notification via Gmail',
    defaultParams: {
      recipient: '',
      subject: 'Automated Workflow Notification',
      bodyTemplate: 'Hello,\n\nHere is your workflow result:\n{{input}}',
    },
    fields: [
      {
        key: 'recipient',
        label: 'Recipient Email',
        type: 'text',
        placeholder: 'user@example.com',
      },
      {
        key: 'subject',
        label: 'Subject Line',
        type: 'text',
        placeholder: 'Subject...',
      },
      {
        key: 'bodyTemplate',
        label: 'Email Body',
        type: 'textarea',
        placeholder: 'Email body text...',
      },
    ],
  },
  discord: {
    type: 'discord',
    category: 'Integrations',
    name: 'Discord',
    icon: '👾',
    description: 'Post a message to a Discord channel via webhook',
    defaultParams: {
      webhookUrl: '',
      message: 'New alert: {{input}}',
    },
    fields: [
      {
        key: 'webhookUrl',
        label: 'Webhook URL',
        type: 'text',
        placeholder: 'https://discord.com/api/webhooks/...',
      },
      {
        key: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Message to send...',
      },
    ],
  },
  api: {
    type: 'api',
    category: 'Integrations',
    name: 'API',
    icon: '☁️',
    description: 'Make an external HTTP request',
    defaultParams: {
      method: 'POST',
      url: 'https://api.example.com/data',
      body: '{"data": "{{input}}"}',
    },
    fields: [
      {
        key: 'method',
        label: 'HTTP Method',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
      },
      {
        key: 'url',
        label: 'Endpoint URL',
        type: 'text',
        placeholder: 'https://api.example.com/...',
      },
      {
        key: 'body',
        label: 'Request Body (JSON)',
        type: 'textarea',
        placeholder: '{"key": "value"}',
      },
    ],
  },

  // Knowledge Base
  'vector db': {
    type: 'vector db',
    category: 'Knowledge Base',
    name: 'Vector DB',
    icon: '🗄️',
    description: 'Store or query vectors in a vector database',
    defaultParams: {
      collection: 'documents',
      topK: 3,
    },
    fields: [
      {
        key: 'collection',
        label: 'Collection Name',
        type: 'text',
        placeholder: 'default_collection',
      },
    ],
  },
  embeddings: {
    type: 'embeddings',
    category: 'Knowledge Base',
    name: 'Embeddings',
    icon: '🔢',
    description: 'Generate vector embeddings for input text',
    defaultParams: {
      model: 'text-embedding-3-small',
    },
    fields: [
      {
        key: 'model',
        label: 'Embedding Model',
        type: 'select',
        options: ['text-embedding-3-small', 'text-embedding-3-large'],
      },
    ],
  },

  // Multi-Modal
  vision: {
    type: 'vision',
    category: 'Multi-Modal',
    name: 'Vision',
    icon: '👁️',
    description: 'Analyze image inputs with vision models',
    defaultParams: {
      imageUrl: '',
      prompt: 'Describe this image.',
    },
    fields: [
      {
        key: 'imageUrl',
        label: 'Image URL',
        type: 'text',
        placeholder: 'https://...',
      },
      {
        key: 'prompt',
        label: 'Analysis Prompt',
        type: 'textarea',
        placeholder: 'What should the model look for?',
      },
    ],
  },
  audio: {
    type: 'audio',
    category: 'Multi-Modal',
    name: 'Audio',
    icon: '🎧',
    description: 'Transcribe or process audio recordings',
    defaultParams: {
      audioUrl: '',
    },
    fields: [
      {
        key: 'audioUrl',
        label: 'Audio File URL',
        type: 'text',
        placeholder: 'https://...',
      },
    ],
  },
};

export const CATEGORIES = [
  'General',
  'LLMs',
  'Integrations',
  'Knowledge Base',
  'Multi-Modal',
] as const;
