/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Google+ / Facebook-era console font stack (lucida grande, tahoma, verdana)
      fontFamily: {
        sans: ["'Lucida Sans Unicode'", "'Lucida Grande'", 'Tahoma', 'Verdana', 'Arial', 'sans-serif'],
        display: ["'Lucida Sans Unicode'", "'Lucida Grande'", 'Tahoma', 'Verdana', 'Arial', 'sans-serif'],
        mono: ['Consolas', "'Lucida Console'", 'Monaco', 'monospace'],
      },
      colors: {
        fb: {
          // Classic Facebook blues
          blue: '#3B5998',
          hover: '#4A67A6',
          active: '#344E86',
          alt: '#6D84B4',
          light: '#8B9DC3',
          soft: '#C6D2E8',
          tint: '#EAF0F8',
          // Surfaces
          bg: '#E9EBEE',
          panel: '#F2F2F2',
          panelHover: '#E9EBEE',
          // Borders
          border: '#D3D6DB',
          borderStrong: '#BDC7D8',
          // Text
          text: '#333333',
          textDark: '#1D2129',
          mid: '#666666',
          textMuted: '#777777',
          textLight: '#9C9C9C',
          link: '#3B5998',
          // Accent red (old facebook error / delete)
          red: '#B94A48',
          redBg: '#F2DEDE',
          redBorder: '#E4B9B7',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'scale-in': 'scaleIn 0.15s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
