/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        anime: {
          white: '#FFFFFF',
          cyan: '#2DFDFF',
          sky: '#4FB0E5',
          blue: '#0077BE',
          deep: '#001144',
          abyss: '#000510',
        }
      },
      fontFamily: {
        // 注意这里的写法，确保带空格的字体名有双引号包裹
        sans: ['Inter', 'sans-serif'],
        michroma: ['Michroma', 'sans-serif'],
        silkscreen: ['Silkscreen', 'cursive'],
        pixelify: ['"Pixelify Sans"', 'sans-serif'],
        'noto-serif': ['"Noto Serif SC"', 'serif'],
        'bodoni': ['"Bodoni Moda"', 'serif'],
        'noto-sans': ['"Noto Sans SC"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'rise': 'rise 15s linear infinite',
        'rise-fast': 'rise 10s linear infinite',
        'rise-slow': 'rise 20s linear infinite',
        'foam-rise': 'foam-rise 12s linear infinite',
        'surface-shimmer': 'shimmer 4s ease-in-out infinite alternate',
        'caustic-wave': 'wave-x 8s linear infinite',
        'blink': 'blink 3s ease-in-out infinite',
        'tumble': 'tumble 15s linear infinite',
        'float-rotate': 'float-rotate 20s linear infinite',
        'spin': 'spin 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-rotate': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-25px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(120vh) scale(0.8)', opacity: '0' },
          '20%': { opacity: '0.6' },
          '80%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-20vh) scale(1.2)', opacity: '0' },
        },
        'foam-rise': {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: '0' },
          '20%': { opacity: '0.4' },
          '80%': { opacity: '0.2' },
          '100%': { transform: 'translateY(-60vh) scale(1.5)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'scaleY(1) translateY(0)', opacity: '0.5' },
          '100%': { transform: 'scaleY(1.2) translateY(15px)', opacity: '0.8' },
        },
        'wave-x': {
          '0%': { transform: 'translateX(-20%)' },
          '50%': { transform: 'translateX(15%)' },
          '100%': { transform: 'translateX(-20%)' },
        },
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '0.8' },
        },
        tumble: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-40px) rotate(180deg)' },
          '100%': { transform: 'translateY(0) rotate(360deg)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}