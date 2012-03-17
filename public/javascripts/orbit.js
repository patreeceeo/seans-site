// Parametric equation for circle:
// x = a + cos t
// y = b + sin t

// satellites
sats = [];

function start_orbit() {
  setup_satellites();
  window.setInterval(update_satellites, 1000);
}

function setup_satellites() {
  els = $(".orbiting");
  for (i = 0; i < els.length; i++) {
    sats[i] = {};
    sats[i].el = els[i];
    sats[i].angle = i * 20;
    sats[i].r = 100; // pixels
    sats[i].v = 10;  // pixels/sec
  }
}

function update_satellites() {
  for(i = 0; i < sats.length; i++) {
    sats[i].el;
  }
}


