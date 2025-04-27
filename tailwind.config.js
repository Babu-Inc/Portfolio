/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 1s ease-in-out forwards',
                'gradient-text': 'gradientText 8s ease infinite',
                'bounce-slow': 'bounce 3s infinite',
                'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scroll-down': 'scrollDown 2s ease-in-out infinite',
                'blink': 'blink 1s step-end infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                gradientText: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center'
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center'
                    }
                },
                scrollDown: {
                    '0%': { transform: 'translateY(0)', opacity: '0.8' },
                    '50%': { transform: 'translateY(6px)', opacity: '0.4' },
                    '100%': { transform: 'translateY(0)', opacity: '0.8' }
                },
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0' }
                }
            },
            scale: {
                '102': '1.02',
            },
            opacity: {
                '15': '0.15',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}