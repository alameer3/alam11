export function AkwamLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="80"
      height="80"
      viewBox="0 0 100 100"
      fill="white"
    >
      <defs>
        <linearGradient id="akwamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#26baee" />
          <stop offset="100%" stopColor="#0d82ab" />
        </linearGradient>
      </defs>
      
      {/* الخلفية الدائرية */}
      <circle cx="50" cy="50" r="45" fill="url(#akwamGradient)" opacity="0.1" />
      
      {/* رمز اللعب */}
      <path
        d="M35 25 L35 75 L75 50 Z"
        fill="white"
        stroke="none"
      />
      
      {/* النقاط الديناميكية */}
      <circle cx="20" cy="20" r="3" fill="#26baee" opacity="0.7">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="20" r="2" fill="#26baee" opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="80" r="3" fill="#26baee" opacity="0.6">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="20" cy="80" r="2" fill="#26baee" opacity="0.4">
        <animate attributeName="opacity" values="0.1;0.7;0.1" dur="4s" repeatCount="indefinite" />
      </circle>
      
      {/* خطوط ديناميكية */}
      <line x1="10" y1="50" x2="90" y2="50" stroke="#26baee" strokeWidth="1" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3s" repeatCount="indefinite" />
      </line>
      <line x1="50" y1="10" x2="50" y2="90" stroke="#26baee" strokeWidth="1" opacity="0.2">
        <animate attributeName="opacity" values="0.1;0.4;0.1" dur="3.5s" repeatCount="indefinite" />
      </line>
    </svg>
  )
}