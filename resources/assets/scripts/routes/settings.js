import 'jquery-mask-plugin'
export default {
  init() {

      //background change
      
      $('.account-preferences__card').on('click', function() {
        let bgColor = $(this).attr('data-class');
        $('.section-blur').attr('data-class', bgColor);
       })
     
       //mobile tabs
    $('.settings__hide li').click(function() {
       $(this).parent().slideToggle(400);
       $('.mobile-nav').toggleClass('mobile-before')
       $('.svg-show').toggleClass('svg-top-hide');
       $('.main-content').css('margin-top', '0')
     });
     

     $('.settings__toggle').on('click', function() {
       $('.mobile-nav').toggleClass('mobile-before')
       $('.svg-show').toggleClass('svg-top-hide');
       $('.settings__hide').slideToggle(400);
       
      if ($('.nav').hasClass('mobile-before')) {
        let heightPadding = $('.mobile-nav').height();
        $('.main-content').css('margin-top', heightPadding + 'px');
      } else {
        $('.main-content').css('margin-top', '0')
      }
     });

    


    //check input
      $('.nav-item').click(function() {
          $('.nav-item').removeClass('active-item');
          $(this).toggleClass('active-item');
      });

      //check on and off -- text
      $('.slideThree').click(function() {
          $(this).toggleClass('check');
          if ($('.slideThree').hasClass('check')) {
            $(this).next().removeClass('strong-text')
            $(this).prev().addClass('strong-text')
            $(this).prev().removeClass('no-strong')
            $(this).next().addClass('no-strong')
           
          } else {
            $(this).next().addClass('strong-text')
            $(this).prev().removeClass('strong-text')
            $(this).next().removeClass('no-strong')
            $(this).prev().addClass('no-strong')
          }
      });
      $('.account-preferences__check strong').addClass('no-strong')
      

      //password hide
      $('.show').click( function () {
        if ($(this).prev().attr('type') === 'password') {
          $(this).prev().attr('type', 'text');
        } else {
          $(this).prev().attr('type', 'password');
        }
      });

      //mask phone
      
      $('#phone').mask('+38 00 0000 000');

      //tabs link active
      $('.nav-item').click(function (){
       $('.nav-link').removeClass('active');
       $('this').addClass('active');
      });

      //header height
      let mobileLinks = document.querySelector('.mobile-nav');
      let body = document.querySelector('body');
      // let header = document.querySelector('.header');
      

      

      function topMobile() {
        body.addEventListener('wheel', function(e) {
  
          let meNow = false;
  
          for (let i = 0; i < e.path.length - 3; i++) {
            const element = e.path[i];
            if (element) {
              if (element.classList.contains('mobile-nav')) {
                meNow = true
              }
            }
          }
  
          if (!meNow) {
            if (e.deltaY < 0) {
              if (window.matchMedia('(min-width: 767px)').matches) {
                mobileLinks.style.top = '';
              } else {
                mobileLinks.style.top = '55px';
              }
            } else {
              if (window.matchMedia('(min-width: 767px)').matches) {
                mobileLinks.style.top = '';
              } else {
                mobileLinks.style.top = '0';
              }
            }
          }
        })
      }
      topMobile();
      
     
      
  },

  // JavaScript to be fired on all pages, after page specific JS is fired
  finalize() {
  },
};