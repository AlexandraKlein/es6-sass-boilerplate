import $ from 'jquery';
const scrollify = require('scrollify');


const settings = {
  section : '.scroll-section',
  easing: 'easeOutExpo',
  scrollSpeed: 1000,
  scrollbars: false,
  setHeights: true,
  overflowScroll: false,
  updateHash: false,
  afterRender() {
    $('.scroll-section')
      .eq(0)
      .addClass('active');

    $('.pagination li')
      .eq(0)
      .addClass('active');
  },
  before(i, panels) {

    const ref = panels[i].attr('data-section-name');
    const classes = 'active previous next';
    const videoWrapper = $('.video-wrapper');
    const btnPlayPause = $('#play-pause-button');
    const video = videoWrapper.find('video').get(0);

    if (videoWrapper.length) {
      video.pause();

      if (video.paused || video.ended) {
        videoWrapper.removeClass('playing');
        btnPlayPause.removeClass().addClass('play').attr('title', 'play');
      }
    }

    $('.pagination .active')
       .removeClass('active');

    $('.pagination')
       .find(`a[href="#${ref}"]`)
       .addClass('active');

    function removeAddClasses(args) {
      args.el.removeClass(classes)
        .addClass(args.classToAdd)
        .siblings('.scroll-section')
        .removeClass(args.classToAdd);
    }

    const removeAddClassesArray = [
      { el: $('.scroll-section').eq(i), classToAdd: 'active'},
      { el: $('.scroll-section').eq(i - 1), classToAdd: 'previous'},
      { el: $('.scroll-section').eq(i + 1), classToAdd: 'next'}
    ];

    if (!$('body').hasClass('contact')) {
      for (let index = 0; index < removeAddClassesArray.length; index++) {
        removeAddClasses(removeAddClassesArray[index]);
      }
    }

    if (i === panels.length - 1) {
      $('.arrow-down').addClass('disabled');
    } else if (i === 0) {
      $('.arrow-up').addClass('disabled');
    } else {
      $('.arrow-up, .arrow-down').removeClass('disabled');
    }
  }
};

const scollifyPage = () => {
  function paginationArrowsMove() {

    $('.pagination a').toArray().forEach((el, i) => {
      $(el).click(e => {
        e.preventDefault();
        $.scrollify.move(i);
      });
    });

    $('.arrow-down').click(() => $.scrollify.next());

    $('.arrow-up').click(() => $.scrollify.previous());
  }

  $(document).on('allPagesEnterCompleted', () => {
    $.scrollify.destroy();
    $.scrollify(settings);
    window.scrollTo(0, 0);
    $.scrollify.move(0);
    paginationArrowsMove();
  });

};

export default scollifyPage;
