// Polyfills if needed
// require('intersection-observer');

// import external dependencies
import './util/polyfills'
import 'jquery';
import 'bootstrap';

// Import everything from autoload
import './autoload/**/*'

// import local dependencies
import Router from './util/Router';
import common from './routes/common';
import Detection from './util/Detection';
import home from './routes/home';
import early from './routes/early';
import settings from './routes/settings';

window._detector = new Detection({
 detect: ['ie11'],
});
window._detector.init();

// /** Populate Router instance with DOM routes */
const routes = new Router({
  // All pages
  common,
  'home': home,
  'early': early,
  'settings': settings,
});

// // Load Events
jQuery(document).ready(() => routes.loadEvents());
