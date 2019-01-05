import $ from 'jquery/dist/jquery.min';
import Barba from 'barba.js';
const $document = $(document);
const $body = $('body');

const pageTransitions = () => {

  const Homepage = Barba.BaseView.extend({
    namespace: 'home',
    onEnter: function onEnter() {
      $document.trigger('homepageOnEnter');
      $body.addClass('home');
      $body.attr('id', 'home');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('homepageOnEnterCompleted');
      $body.removeClass().addClass('home');
    },
    onLeave: function onLeave() {
      $document.trigger('homepageOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('homepageOnLeaveCompleted');
    }
  });

  const Work = Barba.BaseView.extend({
    namespace: 'work',
    onEnter: function onEnter() {
      $document.trigger('workOnEnter');
      $body.addClass('work');
      $body.attr('id', 'work');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('workOnEnterCompleted');
      $body.removeClass().addClass('work');
    },
    onLeave: function onLeave() {
      $document.trigger('workOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('workOnLeaveCompleted');
    }
  });

  const About = Barba.BaseView.extend({
    namespace: 'about',
    onEnter: function onEnter() {
      $document.trigger('aboutOnEnter');
      $body.addClass('about');
      $body.attr('id', 'about');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('aboutOnEnterCompleted');
      $body.removeClass().addClass('about');
    },
    onLeave: function onLeave() {
      $document.trigger('aboutOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('aboutOnLeaveCompleted');
    }
  });

  const Contact = Barba.BaseView.extend({
    namespace: 'contact',
    onEnter: function onEnter() {
      $document.trigger('contactOnEnter');
      $body.addClass('contact');
      $body.attr('id', 'contact');
    },
    onEnterCompleted: function onEnterCompleted() {
      $document.trigger('contactOnEnterCompleted');
      $body.removeClass().addClass('contact');
    },
    onLeave: function onLeave() {
      $document.trigger('contactOnLeave');
    },
    onLeaveCompleted: function onLeaveCompleted() {
      $document.trigger('contactOnLeaveCompleted');
    }
  });

  $document.on('homepageOnEnterCompleted workOnEnterCompleted aboutOnEnterCompleted contactOnEnterCompleted', ()=> {
    $document.trigger('allPagesEnterCompleted');
  });

  Homepage.init();
  Work.init();
  About.init();
  Contact.init();

  Barba.Pjax.start();
  Barba.Prefetch.init();

  const speed = 750;

  const transition = Barba.BaseTransition.extend({
    start: function start() {
      Promise.all([this.newContainerLoading, this.transitionOut()]).then(this.transitionIn.bind(this));
    },
    transitionOut: function transitionOut() {
      const $elOld = $(this.oldContainer);

      $elOld.removeClass('transition-in').addClass('transition-out');

      setTimeout(() => $elOld.show().promise(), speed);
    },
    transitionIn: function transitionIn() {
      const _this2 = this;

      const _this = this;
      const $elNew = $(this.newContainer);

      setTimeout(() => {
        $(_this2.oldContainer).hide();
        $(_this2.oldContainer).show();
        _this.done();
      }, speed);

      $elNew.css({
        visibility: 'visible'
      });

      $elNew.addClass('transition-in').removeClass('transition-out');
    }
  });

  Barba.Pjax.getTransition = () => transition;

  Barba.Dispatcher.on('newPageReady', (currentStatus, oldStatus) => {
    $($document).trigger('allPagesEnter');
  });

  Barba.Dispatcher.on('initStateChange', (currentStatus) => {
    $($document).trigger('initStateChange');
  });

  function removeLandingAnimation() {
    setTimeout(() => {
      $('.barba-container').removeClass('landing-animation');
    }, 2000);
  }

  removeLandingAnimation();

  $($document).on('allPagesEnter', ()=> {
    removeLandingAnimation();
  });
};

export default pageTransitions;
