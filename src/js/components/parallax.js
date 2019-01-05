function parallax() {
  const $container = $('.active .devices');
  const $desktop = $('img.desktop');
  const $laptop = $('img.laptop');
  const $mobile = $('img.mobile');
  let container_w = $container.width();
  let container_h = $container.height();

  $(window).resize(() => {
    container_w = $container.width();
    container_h = $container.height();
  });

  $(window).on('mousemove', event => {
    const pos_x = event.pageX;
    const pos_y = event.pageY;
    const left = container_w / 2 - pos_x;
    const top = container_h / 2 - pos_y;

    function translateTween(args) {
      TweenLite.to(args.el, 1, {
        css: {
          transform: `translateX(${left / args.posLeft}px) translateY(${top / args.posTop}px)`
        },
        ease: Expo.easeOut,
        overwrite: 'all'
      });
    }

    const parallaxPropsArray = [
      { el: $desktop, posLeft: 75, posTop: 35},
      { el: $laptop, posLeft: 45, posTop: 15},
      { el: $mobile, posLeft: 55, posTop: 25}
    ];

    for (let i = 0; i < parallaxPropsArray.length; i++) {
      translateTween(parallaxPropsArray[i]);
    }
  });
}

if ($('body').hasClass('work')) {
  $(() => parallax());
}

$(document).on('workOnEnterCompleted', () => {
  $(() => parallax());
});
