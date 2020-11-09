import LazyLoad from 'vanilla-lazyload';

document.addEventListener('DOMContentLoaded', function() {
  const lazyLoad = new LazyLoad({
      elements_selector: '.lazy',
  });
  window._lazy = lazyLoad;
});
