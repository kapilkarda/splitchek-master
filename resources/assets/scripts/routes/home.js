/* eslint-disable no-unused-vars */
import Swiper from 'swiper/swiper-bundle';
import SimpleScrollbar from 'simple-scrollbar';
import 'lightgallery/dist/js/lightgallery-all.min'

export default {
  init() {

    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const leftAside = document.querySelector('.aside-left');
    const rightAside = document.querySelector('.aside-right');
    const scrollDiv = document.querySelectorAll('.scroll-div');
    const modalCreateGoss = document.querySelector('.modal-create-goss .form__inputs');
    const modalAddTimeline = document.querySelector('.modal-add-timeline .form__inputs');

    //* Swiper
    {
      //* option for swiper
      const optionForSwiperGoss = {
        slidesPerView: 'auto',
        spaceBetween: 12,
        setWrapperSize: true,
        navigation: {
          nextEl: '.card-goss .swiper-button-next',
          prevEl: '.card-goss .swiper-button-prev',
        },
        breakpoints: {
          767: {
            slidesPerView: 4,
            setWrapperSize: false,
            simulateTouch: false,
            preventInteractionOnTransition: true,
            mousewheel: true,
            // freeMode: true,
          },
        },
      }

      const optionForTimeline = {
        slidesPerView: 4,
        setWrapperSize: false,
        simulateTouch: false,
        preventInteractionOnTransition: true,
        mousewheel: true,
        navigation: {
          nextEl: '.card-timeline__slider .swiper-button-next',
          prevEl: '.card-timeline__slider .swiper-button-prev',
        },
        breakpoints: {
          1260: {
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 3,
            // freeMode: true,
          },
          360: {
            slidesPerView: 4,
          },
          250: {
            slidesPerView: 3,
            setWrapperSize: false,
            simulateTouch: false,
            preventInteractionOnTransition: true,
            mousewheel: true,
            // freeMode: true,
          },
        },
      }

      //* swiper init
      let swiperGoss = new Swiper('.card-goss__slider.swiper-container', optionForSwiperGoss);

      let swiperTimeline = new Swiper('.card-timeline__slider .swiper-container', optionForTimeline);
    }

    //* function for "aside-left" and "aside-right" position when scrolling, and calculate height
    {
      const checkAside = (param, any) => {
        if (param) {
          if (window.matchMedia('(max-width: 991px)').matches) {
            param.style.top = '';
          } else {
            param.style.top = any + 'px';
          }
        }
      }

      const positionSt = () => {
        body.addEventListener('wheel', function(e) {
          let meNow = false;

          for (let i = 0; i < e.path.length - 3; i++) {
            const element = e.path[i];
            if (element) {
              if (element.classList.contains('scroll-div')) {
                meNow = true
              }
            }
          }

          if (!meNow) {
            if (e.deltaY < 0) {
              if (leftAside) {
                checkAside(leftAside, 90);
              }
              if (rightAside) {
                checkAside(rightAside, 90);
              }
            } else {
              if (rightAside) {
                checkAside(leftAside, 10);
              }
              if (rightAside) {
                checkAside(rightAside, 10);
              }
            }
          }
        })
      }

      const heightWhat = () => {
        let newHeightDiv = 0
        if (scrollDiv.length) {
          for (let i = 0; i < scrollDiv.length; i++) {
            const el = scrollDiv[i];
            SimpleScrollbar.initEl(el);
            if (el.offsetParent) {
              newHeightDiv = (window.innerHeight - header.clientHeight - 20);

              if (el.offsetParent.classList.contains('aside-right')) {
                if (window.matchMedia('(max-width: 991px)').matches) {
                  el.style.height = '';
                } else {
                  el.style.height = (newHeightDiv - 65) + 'px';
                }
              } else if (el.offsetParent.classList.contains('aside-left')) {
                el.style.height = newHeightDiv + 'px';
              }
            }
            if (el.parentElement.classList.contains('form__inputs')) {
              newHeightDiv = window.innerHeight - 200;

              el.style.height = newHeightDiv + 'px';
            }
          }
        }
      }

      //* function init
      heightWhat();
      positionSt();

      //* function resize
      window.addEventListener('resize', function() {
        heightWhat();
        positionSt();
      }, false);
    }

    //* function button Options(three dots)
    {
      const btnOptionsWrap = document.querySelectorAll('.options');
      const btnOptions = document.querySelectorAll('.options__btn');

      body.addEventListener('click', e => {
        // e.preventDefault();

        if (e.target.offsetParent) {
          const targetoffset = e.target.offsetParent;
          const {type} = e.target.offsetParent.firstElementChild.dataset;

          if (type === 'options') {
            if (!targetoffset.classList.contains('options--open')) {
                const blockBackDrop = document.createElement('div');
                blockBackDrop.classList.add('option-backDrop');

                targetoffset.classList.add('options--open');
                targetoffset.appendChild(blockBackDrop);
              } else {
                targetoffset.classList.remove('options--open')
                targetoffset.querySelector('.option-backDrop').remove();
              }
          }
        } else {

          btnOptionsWrap.forEach(element => {
            element.classList.remove('options--open');
            const thisBackDrop = element.querySelector('.option-backDrop');
            if (thisBackDrop) {
              element.parentNode.lastElementChild.removeChild(thisBackDrop)
            }
          });
        }
      });
    }

    // * function for "Select" template in modal
    {
      $('.form__single--select-default select[data-toggle="select"]').select2({
        minimumResultsForSearch: Infinity,
        width: '100%',
      });
      $('.form__single--select-user select[data-toggle="select"]').select2({
        minimumResultsForSearch: Infinity,
        width: '100%',
        templateResult: function (state) {
          if (!state.id) {
            return state.text;
          }
          var baseUrl = 'images/profiles';
          var $state = $(`
            <div class="profile-list">
              <figure class="profile-list__avatar">
                <img src="${baseUrl}/${state.element.value.toLowerCase()}.png" alt="avatar">
                <span class="profile-list__symbol"></span>
              </figure>
              <span>${state.text}</span>
            </div>
          `);

          return $state;
        },
        // dropdownParent: $('.form__single--select-user'),
      });


    }

    //* function hover "reaction-btn-like"
    {
      const reaction = {
        reactionWrap: document.querySelectorAll('.reaction__link-reaction'),
        ractionDivVisible: document.querySelector('.reaction-btn-like'),
      }

      const hoverReaction = () => {
        let timer = [];
        if (reaction.reactionWrap.length) {
          reaction.reactionWrap.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
              timer[1] = setTimeout(function() {
                element.classList.add('js-reaction-show');
                element.querySelector('.reaction-btn-like').classList.add('js-reaction-show');
              }, 500);
              clearInterval(timer[2]);
              element.classList.add('js-reaction-hover')
            })
            element.addEventListener('mouseleave', (e) => {
              clearInterval(timer[1]);
              timer[2] = setTimeout(function() {
                element.classList.remove('js-reaction-show');
                element.querySelector('.reaction-btn-like').classList.remove('js-reaction-show');
              }, 500);
              element.classList.remove('js-reaction-hover')
            })
          });
        }
      }
      hoverReaction();
    }

    //* init lightGallery
    {
      const postLightGallery = $('.grid-gallery').lightGallery({
        selector: '.grid-gallery__selector',
        thumbnail: false,
        zoom: false,
        share: false,
        rotate: false,
        hash: false,
      });

      // Perform any action the gallery
      postLightGallery.on('onBeforeOpen.lg',function(){
        $('.section-blur').addClass('filter');
        $('.menu-bottom').addClass('filter');
      });
      postLightGallery.on('onCloseAfter.lg',function(){
        $('.section-blur').removeClass('filter');
        $('.menu-bottom').removeClass('filter');
      });
    }
  },

  // JavaScript to be fired on all pages, after page specific JS is fired
  finalize() {
  },
};
