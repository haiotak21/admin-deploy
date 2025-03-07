import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tremor: {
          brand: {
            faint: "#0B1437",
            muted: "#111C44",
            subtle: "#1B254B",
            DEFAULT: "#7928CA",
            emphasis: "#FF0080",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;