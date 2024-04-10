import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
