var toggle = false;

$(document).ready(function() {

  setInterval(function() {

    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();

    var color_n = normal(h, m, s);
    var color_s = scaled(h, m, s);

    $(".scaled").css("background-color", color_s);
    $(".scaledtext").text(color_s);
    $(".normal").css("background-color", color_n);
    $(".normaltext").text(color_n);
  }, 100);

  $("#clock").click(function() {
    if(toggle){
      $(".scaled").addClass("normal");
      $(".normal").removeClass("scaled");
      $("#clock").addClass("normaltext");
      $("#clock").removeClass("scaledtext");
      toggle = false;
    } else {
      $(".normal").addClass("scaled");
      $(".scaled").removeClass("normal");
      $("#clock").addClass("scaledtext");
      $("#clock").removeClass("normaltext");
      toggle = true;
    }
  });
});

function scaled(h, m, s) {
  var h_s = map_range(h, 0, 23, 0, 230).toString(16);
  var m_s = map_range(m, 0, 59, 0, 236).toString(16);
  var s_s = map_range(s, 0, 59, 0, 236).toString(16);
  //console.info("" + h_s +" "+ m_s+" "+ s_s + " ");
  return ("#" + ("00" + h_s).substr(-2,2) + ("00" + m_s).substr(-2,2) + ("00" + s_s).substr(-2,2));
}

function normal(h, m, s) {
  //console.info("#" + hz + h + mz + m + sz + s);
  return ("#" + ("00" + h).substr(-2,2) + ("00" + m).substr(-2,2) + ("00" + s).substr(-2,2));
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
