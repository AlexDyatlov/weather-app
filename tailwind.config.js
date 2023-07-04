export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        alert: {
          '5%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(0)', opacity: 0 }
        }
      },
      animation: {
        alert: 'alert 5s 1'
      }
    },
    fontFamily: {
      ms: ['Montserrat', 'Arial', 'Helvetica', 'sans-serif']
    }
  },
  plugins: []
};
