import $ from 'jquery/dist/jquery.min';
import { isOnScreen } from './libs';


const $window = $(window);
const viewportHeight = $window.height();
const ele = '.promotion-carousel';

let ui = {
  promo: ele + ' .promotion',
  promoText: ele + ' .promo-text',
  navigationItems: '.navigation a'
};

export default class ScrollEvents {

  constructor() {
    function smoothScroll(target) {
      $('body, html').animate({'scrollTop':target.offset().top}, 600);
    }

    $(ui.navigationItems).on('click', e => {
      e.preventDefault();
      smoothScroll($(e.currentTarget.hash));
    });

    $window.on('scroll', () => {

      $(ui.promo).toArray().forEach(el => {
        const $el = $(el);
        if (isOnScreen($el)) {
          this.scrolly($el);
        }
      });

      this.updateNavigation();
      this.fadeAtTop($(ui.promoText));
    });

    this.updateNavigation();
  }

  scrolly(el) {
    const topOffset = el.offset().top;
    const height = el.height();
    let scrollTop = $window.scrollTop();
    const maxPixels = height / 4;
    const percentageScrolled = (scrollTop - topOffset) / height;
    let backgroundOffset = maxPixels * percentageScrolled;

    backgroundOffset = Math.round(Math.min(maxPixels, Math.max(0, backgroundOffset)));

    el.css(`background-position`, `right 0px top ${backgroundOffset}px`);
  }

  fadeAtTop(el) {
    const startPos = 0.25;

    el.toArray().forEach(el => {
      const $el = $(el);
      let position = $el.offset().top - $window.scrollTop() + viewportHeight / 6;
      let opacity = position < viewportHeight * startPos ? position / (viewportHeight * startPos) * 1 : 1;

      $el.css('opacity', opacity);
    });
  }

  updateNavigation() {
    $(ui.promo).toArray().forEach((el) => {
      let $el = $(el);
      let activeSection = $(`.navigation a[href="#${$el.attr('id')}"]`).data('number') - 1;
      const isActive = ( $el.offset().top - $window.height()/2 < $window.scrollTop() ) && ( $el.offset().top + $el.height() - $window.height()/2 > $window.scrollTop() ) ? 'active' : '';
      $(ui.navigationItems).eq(activeSection).removeClass('active').addClass(isActive);
    });
  }
};
