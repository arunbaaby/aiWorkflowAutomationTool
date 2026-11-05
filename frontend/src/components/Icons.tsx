export function NodqLogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none">
      <circle cx="6" cy="16" r="3.2" fill="#2563eb" />
      <circle cx="17" cy="8" r="3.2" fill="#2563eb" />
      <circle cx="17" cy="24" r="3.2" fill="#2563eb" />
      <line x1="6" y1="16" x2="17" y2="8" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="6" y1="16" x2="17" y2="24" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="17" y1="8" x2="17" y2="24" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="17" y1="16" x2="23" y2="16" stroke="#2563eb" strokeWidth="2.5" />
    </svg>
  );
}

export function GoogleGIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export function GmailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#4caf50" d="M45 16.2v21.8c0 2.2-1.8 4-4 4H31V25.9l14-9.7z" />
      <path fill="#1e88e5" d="M3 16.2l14 9.7V42H7c-2.2 0-4-1.8-4-4V16.2z" />
      <path fill="#e53935" d="M31 25.9V13.8L24 19l-7-5.2v12.1L3 16.2V11c0-2.8 2.2-5 5-5h32c2.8 0 5 2.2 5 5v5.2l-14 9.7z" />
      <path fill="#c62828" d="M37 6h-6l-7 5.2L17 6h-6c-2.8 0-5 2.2-5 5v2.8l18 13.3 18-13.3V11c0-2.8-2.2-5-5-5z" />
    </svg>
  );
}

export function DiscordIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#5865F2">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export function GDocsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#2196f3" d="M37 42H11c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4h18l12 12v24c0 2.2-1.8 4-4 4z" />
      <path fill="#bbdefb" d="M29 6v12h12z" />
      <path fill="#fff" d="M15 22h18v2.5H15zm0 6h18v2.5H15zm0 6h12v2.5H15z" />
    </svg>
  );
}

export function MeetIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <rect width="24" height="20" x="4" y="14" fill="#00ac47" rx="3" />
      <polygon fill="#00832d" points="30,20 42,12 42,36 30,28" />
    </svg>
  );
}

export function NotionIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#000000">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.83a2.91 2.91 0 0 0-2.008-.887L3.992 1.783c-.42.047-.56.28-.373.466l.84 1.959zm-.42 2.518v14.92c0 .653.374.886.98.84l14.896-.887c.607-.047.747-.56.747-1.12V5.888c0-.56-.233-.84-.793-.793l-15.036.886c-.56.047-.794.28-.794.747zm13.448.98c.093.373 0 .746-.374.793l-.933.186v10.354c-.653.373-1.306.56-1.866.56-.933 0-1.213-.28-1.913-1.166l-4.71-7.37v6.997l1.493.327c.373.093.466.466.373.84-.093.373-.466.466-.84.466l-3.36-.046c-.373 0-.466-.374-.373-.747l.84-.233V8.873l-1.12-.093c-.373 0-.466-.374-.373-.747.093-.373.373-.466.84-.466l3.78.047c.793 0 1.493.42 2.053 1.213l4.57 7.043V9.246l-1.353-.233c-.373-.093-.466-.466-.373-.84.093-.373.373-.466.84-.466l2.846.046c.42 0 .56.374.467.747z" />
    </svg>
  );
}

export function AirtableIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#2563eb" d="M22 6L4 16l18 10 18-10L22 6z" />
      <path fill="#facc15" d="M23 28v14l17-9V20L23 28z" />
      <path fill="#ef4444" d="M21 28L4 20v13l17 9V28z" />
    </svg>
  );
}

export function GSheetsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#0f9d58" d="M37 42H11c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4h18l12 12v24c0 2.2-1.8 4-4 4z" />
      <path fill="#a8dab5" d="M29 6v12h12z" />
      <path fill="#fff" d="M16 22h16v16H16z" />
      <path fill="#0f9d58" d="M18 24h12v4H18zm0 6h12v4H18z" />
    </svg>
  );
}

export function GFormsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#7b1fa2" d="M37 42H11c-2.2 0-4-1.8-4-4V10c0-2.2 1.8-4 4-4h18l12 12v24c0 2.2-1.8 4-4 4z" />
      <path fill="#ce93d8" d="M29 6v12h12z" />
      <circle cx="17" cy="24" r="2" fill="#fff" />
      <circle cx="17" cy="30" r="2" fill="#fff" />
      <circle cx="17" cy="36" r="2" fill="#fff" />
      <path fill="#fff" d="M22 23h12v2H22zm0 6h12v2H22zm0 6h12v2H22z" />
    </svg>
  );
}

export function ApiCloudIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      <text x="7" y="16" fontSize="6" fontWeight="bold" fill="#0ea5e9" stroke="none">API</text>
    </svg>
  );
}

export function SlackIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#E01E5A" d="M5.04 14.28a2.52 2.52 0 1 1-2.52-2.52h2.52v2.52zm1.26 0a2.52 2.52 0 1 1 5.04 0v6.3a2.52 2.52 0 1 1-5.04 0v-6.3z" />
      <path fill="#36C5F0" d="M9.72 5.04a2.52 2.52 0 1 1-2.52-2.52v2.52h2.52zm0 1.26a2.52 2.52 0 1 1 0 5.04H3.42a2.52 2.52 0 1 1 0-5.04h6.3z" />
      <path fill="#2EB67D" d="M18.96 9.72a2.52 2.52 0 1 1 2.52 2.52h-2.52V9.72zm-1.26 0a2.52 2.52 0 1 1-5.04 0V3.42a2.52 2.52 0 1 1 5.04 0v6.3z" />
      <path fill="#ECB22E" d="M14.28 18.96a2.52 2.52 0 1 1 2.52 2.52v-2.52h-2.52zm0-1.26a2.52 2.52 0 1 1 0-5.04h6.3a2.52 2.52 0 1 1 0 5.04h-6.3z" />
    </svg>
  );
}

export function AwsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#FF9900">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5h-2v-5h2v5zm4 0h-2v-5h2v5z" />
      <text x="5" y="14" fontSize="8" fontWeight="bold" fill="#232F3E">aws</text>
    </svg>
  );
}

export function DriveIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M17 6L2 32h15L32 6z" />
      <path fill="#4CAF50" d="M32 6l14 24-7 12H17l15-36z" />
      <path fill="#2196F3" d="M39 42H9l8-14h30l-8 14z" />
    </svg>
  );
}
