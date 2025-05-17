/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 0.6s ease-in-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'slide-down': 'slideDown 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'float': 'float 3s ease-in-out infinite',
                'gradient-text': 'gradientText 6s ease infinite',
                'bounce-slow': 'bounce 2s infinite',
                'twinkle': 'twinkle 4s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'shooting-star': 'shootingStar 2s linear',
                'spin-slow': 'spin 8s linear infinite',
                'nebula-pulse': 'nebulaPulse 8s ease-in-out infinite'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-30px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                gradientText: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                twinkle: {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '1' },
                },
                glow: {
                    '0%': {
                        boxShadow: '0 0 5px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.3)'
                    },
                    '100%': {
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)'
                    }
                },
                shootingStar: {
                    '0%': {
                        transform: 'translateX(0) translateY(0)',
                        opacity: '1'
                    },
                    '70%': {
                        opacity: '1'
                    },
                    '100%': {
                        transform: 'translateX(300px) translateY(300px)',
                        opacity: '0'
                    }
                },
                nebulaPulse: {
                    '0%, 100%': {
                        opacity: '0.3',
                        transform: 'scale(1)'
                    },
                    '50%': {
                        opacity: '0.5',
                        transform: 'scale(1.05)'
                    }
                }
            },
            colors: {
                // Adding custom monochrome palette
                'mono': {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a',
                },
            },
            boxShadow: {
                'glow-sm': '0 0 5px rgba(255, 255, 255, 0.5)',
                'glow-md': '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
                'glow-lg': '0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3), 0 0 45px rgba(255, 255, 255, 0.1)',
                'glow-xl': '0 0 20px rgba(255, 255, 255, 0.6), 0 0 40px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}