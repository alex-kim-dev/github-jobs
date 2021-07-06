module.exports = {
  presets: [
    ['@babel/preset-react', {
      runtime: 'automatic',
      development: process.env.NODE_ENV === 'development',
      importSource: '@welldone-software/why-did-you-render',
   }],
    '@babel/preset-env',
  ],

  plugins: ['@babel/plugin-proposal-class-properties'],
};
