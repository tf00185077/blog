import type { Config } from "tailwindcss";

export default {
  corePlugins: {
    preflight: false,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--background)',     // 主背景色
          main: 'var(--background)',     // 主背景色
          outer: 'var(--background-outer)', // 外層背景色
          header: 'var(--background-header)', // header背景色
        },
        text: {
          DEFAULT: 'var(--foreground)',        // 主要文字顏色
          main: 'var(--foreground)',        // 主要文字顏色
          secondary: 'var(--text-secondary)',   // 次要文字顏色
          accent: 'var(--accent)',             // 強調文字顏色
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
