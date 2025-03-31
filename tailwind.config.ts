import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff',
        black: '#000000',
        gray: {
          100: '#f7f7f7',
          200: '#e6e6e6',
          300: '#d6d6d6',
          400: '#a6a6a6',
          500: '#707070',
          600: '#4d4d4d',
          700: '#333333',
          800: '#262626',
          900: '#171717',
        },
      },
      borderRadius: {
        'xl': '0.75rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

export default config 