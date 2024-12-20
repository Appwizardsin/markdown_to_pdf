/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#333',
            h1: {
              color: '#111',
              fontWeight: '700',
            },
            h2: {
              color: '#222',
              fontWeight: '600',
            },
            h3: {
              color: '#333',
              fontWeight: '600',
            },
            code: {
              color: '#444',
              backgroundColor: '#f5f5f5',
              padding: '0.2em 0.4em',
              borderRadius: '3px',
              fontSize: '0.9em',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            blockquote: {
              borderLeftColor: '#e5e7eb',
              color: '#666',
            },
          },
        },
        invert: {
          css: {
            color: '#d1d5db',
            h1: {
              color: '#fff',
            },
            h2: {
              color: '#e5e7eb',
            },
            h3: {
              color: '#d1d5db',
            },
            code: {
              color: '#e5e7eb',
              backgroundColor: '#1f2937',
            },
            blockquote: {
              borderLeftColor: '#4b5563',
              color: '#9ca3af',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 