let mode = "scaled";

$(document).ready(function() {

  // time to color calculator
  setInterval(function() {
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    const s = d.getSeconds();
    //h = 13; m = 30; s = 30;

    let bgColor = null;
    let clockColor = null;

    if (mode === "scaled") {
      const hScaled = mapRange(h, 0, 23, 0, 255).toString(16);
      const mScaled = mapRange(m, 0, 59, 0, 255).toString(16);
      const sScaled = mapRange(s, 0, 59, 0, 255).toString(16);
      bgColor = rgbToHexString(hScaled, mScaled, sScaled);
      clockColor = textColorFromBackground(hScaled, mScaled, sScaled);
    } else if (mode === "normal") {
      bgColor = rgbToHexString(h, m, s);
      clockColor = textColorFromBackground(h, m, s);
    }

    $("body").css("background-color", bgColor);
    $("#clock").text(String(bgColor));
    $("#clock").css("color", clockColor);
  }, 100);

  // mode switcher
  $("#clock").click(function() {
    if (mode ===  "scaled"){
      mode = "normal";
    } else if (mode === "normal"){
      mode = "scaled";
    }
  });
});

// converts 3 rgb (or other set of 3 numbers) values into a hex string
function rgbToHexString(r, g, b) {
  return (`#${String(r).padStart(2, '0')}${String(g).padStart(2, '0')}${String(b).padStart(2, '0')}`);
}

// maps a value from one range to another range
function mapRange(value, low1, high1, low2, high2) {
  return Math.round(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
}

// choose a text color based on the provided RGB values
function textColorFromBackground(r, g, b) {
  //console.log(parseInt(r, 16) * 0.299, parseInt(g, 16) * 0.586, parseInt(b, 16) * 0.114)
  return (((parseInt(r, 16) * 0.299) + (parseInt(g, 16) * 0.587) + (parseInt(b, 16) * 0.114)) > 186) ?
  "#000000" : "#ffffff";
}