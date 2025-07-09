module.exports = {   
  content: [     
    "./src/**/*.{js,jsx,ts,tsx}",     
    "./public/index.html"   
  ],   
  theme: {     
    extend: {       
      animation: {         
        'fade-in': 'fadeIn 0.5s ease-in',         
        'fade-out': 'fadeOut 0.5s ease-out',         
        'slide-up': 'slideUp 0.5s ease-out',         
        'slide-down': 'slideDown 0.5s ease-out',         
        'slide-left': 'slideLeft 0.5s ease-out',         
        'slide-right': 'slideRight 0.5s ease-out',         
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',         
        'gradient-x': 'gradientX 6s ease infinite',         
        'chart-fade': 'chartFade 1s ease-out',         
        'page-enter': 'pageEnter 0.5s ease-out',         
        'page-exit': 'pageExit 0.5s ease-in',         
        'stagger-child': 'staggerChild 0.5s ease-out forwards',         
        'stagger-delay': 'staggerDelay 0.5s ease-out forwards'       
      },       
      keyframes: {         
        fadeIn: {           
          '0%': { opacity: '0' },           
          '100%': { opacity: '1' },         
        },         
        fadeOut: {           
          '0%': { opacity: '1' },           
          '100%': { opacity: '0' },         
        },         
        slideUp: {           
          '0%': { transform: 'translateY(20px)', opacity: '0' },           
          '100%': { transform: 'translateY(0)', opacity: '1' },         
        },         
        slideDown: {           
          '0%': { transform: 'translateY(-20px)', opacity: '0' },           
          '100%': { transform: 'translateY(0)', opacity: '1' },         
        },         
        slideLeft: {           
          '0%': { transform: 'translateX(20px)', opacity: '0' },           
          '100%': { transform: 'translateX(0)', opacity: '1' },         
        },         
        slideRight: {           
          '0%': { transform: 'translateX(-20px)', opacity: '0' },           
          '100%': { transform: 'translateX(0)', opacity: '1' },         
        },         
        gradientX: {           
          '0%, 100%': { 'background-position': '0% 50%' },           
          '50%': { 'background-position': '100% 50%' }         
        },         
        chartFade: {           
          '0%': { opacity: '0', transform: 'scale(0.95)' },           
          '100%': { opacity: '1', transform: 'scale(1)' }         
        },         
        pageEnter: {           
          '0%': { opacity: '0', transform: 'translateY(10px)' },           
          '100%': { opacity: '1', transform: 'translateY(0)' }         
        },         
        pageExit: {           
          '0%': { opacity: '1', transform: 'translateY(0)' },           
          '100%': { opacity: '0', transform: 'translateY(-10px)' }         
        },         
        staggerChild: {           
          '0%': { opacity: '0', transform: 'translateY(10px)' },           
          '100%': { opacity: '1', transform: 'translateY(0)' }         
        },         
        staggerDelay: {           
          '0%, 50%': { opacity: '0', transform: 'translateY(10px)' },           
          '100%': { opacity: '1', transform: 'translateY(0)' }         
        }       
      },       
      animationDelay: {         
        '100': '100ms',         
        '200': '200ms',         
        '300': '300ms',         
        '400': '400ms',         
        '500': '500ms',       
      },       
      animationDuration: {         
        'slow': '0.7s',         
        'normal': '0.5s',         
        'fast': '0.3s',       
      }     
    },   
  },   
  plugins: [], 
}