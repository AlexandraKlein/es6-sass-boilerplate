const morphEls = () => {
  function snapMorphHover(args) {
    const s = Snap(args.el);
    const path = s.select('path');

    const pathConfig = {
      toSpeed: args.toSpeed,
      fromSpeed: args.fromSpeed,
      from: path.attr('d'),
      to: args.el.getAttribute('data-morph-active')
    };

    args.el.addEventListener('mouseover', () => path.animate({ 'path': pathConfig.to }, pathConfig.toSpeed, args.easeIn));
    args.el.addEventListener('mouseout', () => path.animate({ 'path': pathConfig.from }, pathConfig.fromSpeed, args.easeOut));
  }

  const snapElsUpDown = [
    {el: document.querySelector('.arrow-up'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150},
    {el: document.querySelector('.arrow-down'), easeIn: mina.easein, easeOut: mina.easeout, toSpeed: 300, fromSpeed: 150}
  ];

  const snapElsLeftRight = [
    {el: document.querySelector('.arrow-next'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500},
    {el: document.querySelector('.arrow-prev'), easeIn: mina.easein, easeOut: mina.bounce, toSpeed: 300, fromSpeed: 500}
  ];

  if ($('body').hasClass('home') || $('body').hasClass('work') || $('body').hasClass('about')) {
    for (let i=0; i<snapElsUpDown.length; i++) {
      snapMorphHover(snapElsUpDown[i]);
    }
  }

  if ($('body').hasClass('work')) {
    for (let i=0; i<snapElsLeftRight.length; i++) {
      snapMorphHover(snapElsLeftRight[i]);
    }
  }
};

$(() => morphEls());

$(document).on('allPagesEnterCompleted', () => {
  setTimeout( ()=>  morphEls())
});
