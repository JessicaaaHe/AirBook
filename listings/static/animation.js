$("button").click(
  function() {
    $('.progress-bar').css( "width" , '0%').show().animate({
      width: "100%"
    }, 100);
    $('.progress-bar').delay(1000).fadeOut(500);
  }
);

$("#tab1").click(
  function() {
      $('#tab1').addClass('active');
      $('#tab2').removeClass('active');
      $('#tab3').removeClass('active');

      $('#tabs-1').fadeOut('slow');
      $('#tabs-2').fadeIn('slow');
      $('#tabs-3').fadeOut('slow');
  }
);

$("#tab2").click(
  function() {
      $('#tab1').removeClass('active');
      $('#tab2').addClass('active');
      $('#tab3').removeClass('active');

      $('#tabs-1').fadeOut('slow');
      $('#tabs-2').fadeIn('slow');
      $('#tabs-3').fadeOut('slow');
  }
);

$("#tab3").click(
  function() {
      $('#tab1').removeClass('active');
      $('#tab2').removeClass('active');
      $('#tab3').addClass('active');

      $('#tabs-1').fadeOut('slow');
      $('#tabs-2').fadeOut('slow');
      $('#tabs-3').fadeIn('slow');
  }
);


function num_animation() {
    $('.count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });
    $('.fcount').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $(this).text(this.Counter.toFixed(2));
            }
        });
    });
}
