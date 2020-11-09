/* eslint-disable no-unused-vars */
import 'select2'
export default {
  init() {
      $('.js-select-stores').select2();

      let listShoppingFeatures = $('.js-select-shopping-features').select2({
        closeOnSelect: false,
        dropdownParent: $('.js-select-choice'),
      }).on('select2:closing', function(e) {
        e.preventDefault();
      }).on('select2:closed', function(e) {
        listShoppingFeatures.select2('open');
      });

      listShoppingFeatures.select2('open');
  },

  // JavaScript to be fired on all pages, after page specific JS is fired
  finalize() {
  },
};
