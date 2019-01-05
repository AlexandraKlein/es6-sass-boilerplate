function directionAwareButton() {
  $('.btn')
    .on('mouseenter', function(e) {
      const parentOffset = $(this).offset();
      const relX = e.pageX - parentOffset.left;
      const relY = e.pageY - parentOffset.top;
      $(this).find('span').css({top:relY, left:relX})
    })
    .on('mouseout', function(e) {
      const parentOffset = $(this).offset();
      const relX = e.pageX - parentOffset.left;
      const relY = e.pageY - parentOffset.top;
      $(this).find('span').css({top:relY, left:relX})
    });
}

$(() => directionAwareButton());

$($document).on('allPagesEnter', () => {
  directionAwareButton();
});
