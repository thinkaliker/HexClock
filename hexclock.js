let mode = "scaled";

$(document).ready(function() {

  setInterval(function() {

    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    //h = 12; m = 12; s = 59;

    const hScaled = mapRange(h, 0, 23, 0, 230).toString(16);
    const mScaled = mapRange(m, 0, 59, 0, 236).toString(16);
    const sScaled = mapRange(s, 0, 59, 0, 236).toString(16);

    const colorNormal = rgbToHex(h, m, s);
    const colorScaled = rgbToHex(hScaled, mScaled, sScaled);

    let textCol = "";
    if (mode === "scaled") {
      textCol = textColorFromBackground(hScaled, mScaled, sScaled);
    } else {
      textCol = textColorFromBackground(h, m, s);
    }
     
    $(".scaled").css("background-color", colorScaled);
    $(".scaledtext").text(colorScaled);
    $(".normal").css("background-color", colorNormal);
    $(".normaltext").text(colorNormal);
    $(".scaledtext").css("color", textCol);
  }, 100);

  $("#clock").click(function() {
    if(mode ===  "scaled"){
      $(".scaled").addClass("normal");
      $(".normal").removeClass("scaled");
      $("#clock").addClass("normaltext");
      $("#clock").removeClass("scaledtext");
      mode = "normal";
    } else {
      $(".normal").addClass("scaled");
      $(".scaled").removeClass("normal");
      $("#clock").addClass("scaledtext");
      $("#clock").removeClass("normaltext");
      mode = "scaled";
    }
  });
});

function rgbToHex(r, g, b) {
  return (`#${("00" + r).substr(-2,2)}${("00" + g).substr(-2,2)}${("00" + b).substr(-2,2)}`);
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


function textColorFromBackground(r, g, b) {
  //console.log(parseInt(r, 16) * 0.299, parseInt(g, 16) * 0.586, parseInt(b, 16) * 0.114)
  return (((parseInt(r, 16) * 0.299) + (parseInt(g, 16) * 0.587) + (parseInt(b, 16) * 0.114)) > 186) ?
  "#000000" : "#ffffff";
}