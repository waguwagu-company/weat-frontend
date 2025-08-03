import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        fixed: '400px',
      },
      maxWidth: {
        mobile: '400px',
      },
    },
  },
  plugins: [],
};

export default config;
