$("button").click(
  function() {
    $('.progress-bar').css( "width" , '0%').show().animate({
      width: "100%"
    }, 100);
    $('.progress-bar').delay(1000).fadeOut(500);
  }
)

$("#chart_link").click(
  function() {
      $('#basic_link').removeClass('active')
      $('#chart_link').addClass('active')
    $('#tabs-1').fadeOut('slow');
    $('#tabs-2').fadeIn('slow');

  }
)

$("#basic_link").click(
  function() {
      $('#chart_link').removeClass('active')
      $('#basic_link').addClass('active')
    $('#tabs-2').fadeOut('slow');
    $('#tabs-1').fadeIn('slow');
  }
)