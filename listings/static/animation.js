$("button").click(
  function() {
    $('.progress').show()
    $('.progress-bar').css( "width" , '0%').animate({
      width: "100%"
    }, 100);
    $('.progress').delay(1000).fadeOut(500);
  }
)