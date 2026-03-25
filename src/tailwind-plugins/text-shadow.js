import plugin from 'tailwindcss/plugin';

export default plugin(function({ addUtilities, theme }) {
  const textShadows = theme('textShadow', {});
  const textShadowUtilities = {};
  
  for (const key in textShadows) {
    textShadowUtilities[`.text-shadow-${key}`] = {
      textShadow: textShadows[key],
    };
  }
  
  addUtilities(textShadowUtilities);
}); 