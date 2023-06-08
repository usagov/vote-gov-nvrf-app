const uswds = require('@uswds/compile');

uswds.settings.version = 3;

uswds.paths.dist.theme = './src/assets/_theme';
uswds.paths.dist.css = './src/assets/uswds/css';
uswds.paths.dist.fonts = './src/assets/uswds/fonts';
uswds.paths.dist.img = './src/assets/uswds/img';
uswds.paths.dist.js = './src/assets/uswds/js';

exports.init = uswds.init;
exports.compile = uswds.compile;
exports.watch = uswds.watch;