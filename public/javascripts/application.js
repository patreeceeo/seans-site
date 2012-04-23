$(document).ready(function() {

	// Open external links in a new window
	hostname = window.location.hostname
	$("a[href^=http]")
	  .not("a[href*='" + hostname + "']")
	  .addClass('link external')
	  .attr('target', '_blank');

  showPage("home");
});

function hide(klass, removeKlass) {
  var to_hide = $("."+klass+"."+removeKlass);
  to_hide.removeClass(removeKlass);
}

function showPage(name) {
  show(name, "page", "showing");
  pageShown(name);
}

function pageShown(name) {
  if(name == "comics") {
    console.log("showing comics");
    $("#comics").scrollspy();
    // show("comic-panel-cover", "panel", "showing");
  }
}

function show(id, klass, addKlass) {
  hide(klass, addKlass);
  $("#"+id).addClass(addKlass);  
}


function showPrev(klass) {
  var stor="."+klass;
  var to_hide = $(stor+".showing");
  to_hide.removeClass("showing");

  var index = to_hide.index();
  index--;
  if (index < 0)
    index = $(stor).size() - 1;
  var to_show = $(stor).eq(index);

  to_show.addClass("showing");
  return to_show;
}

function showNext(klass) {
  var stor="."+klass;
  var to_hide = $("."+stor+".showing");
  to_hide.removeClass("showing");

  var index = to_hide.index();
  index++;
  if (index >= $(stor).size())
    index = 0;
  var to_show = $(stor).eq(index);

  to_show.addClass("showing");
  return to_show;
}
