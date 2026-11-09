/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#080B12',
          bgSecondary: '#0E1420',
          surface: '#141C2A',
          surfaceHover: '#1A2538',
          surfaceLight: '#202D42',
          border: '#263244',
          borderLight: '#384860',
          accent: '#38BDF8', // Cyan / Sky
          accentGlow: 'rgba(56, 189, 248, 0.25)',
          purple: '#8B5CF6', // Violet
          purpleGlow: 'rgba(139, 92, 246, 0.25)',
          emerald: '#10B981',
          amber: '#F59E0B',
          textPrimary: '#F8FAFC',
          textSecondary: '#94A3B8',
          textMuted: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

