$("button").click(
  function() {
    $('.progress-bar').css( "width" , '0%').show().animate({
      width: "100%"
    }, 100);
    $('.progress-bar').delay(1000).fadeOut(500);
  }
)