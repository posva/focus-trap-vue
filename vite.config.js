const path = require('path');

module.exports = {
  root: 'demo',
  outDir: 'demo_dist',
  alias: {
    '/@src/': path.resolve(__dirname, 'src'),
  },
  optimizeDeps: {
    include: ['focus-trap'],
  },
};
