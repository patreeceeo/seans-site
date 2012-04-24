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
  // currentPage = name;
  show(name, "page", "showing");
  pageShown(name);
}

function currentPageEl() {
  return $(".page.showing");
}

function activeSubNavEl() {
  var pageEl = currentPageEl();
  var navEl = pageEl.find(".nav ul");
  var activeSubNav = navEl.find("li.active");
  if(activeSubNav.size() == 0)
    return navEl.find("li").first();
  return activeSubNav;
}


function referencedEl(navEl) {
  var href = navEl.find("a").attr("href");
  return $(href);
}

function scrollYMin(el) {
  return el.offset().top
}

function scrollYMax(el) {
  return el.next().offset().top
}

function pageShown(name) {
  var pageEl = $("#"+name);
  $(this).scrollTop(0);
  function updateNav (e) {
    var navEl = activeSubNavEl();
    // var refdEl = referencedEl(navEl);
    var yScroll = $(this).scrollTop();
    navEl.removeClass("active");
    while(yScroll >= scrollYMax(referencedEl(navEl)))
      navEl = navEl.next();
    while(yScroll < scrollYMin(referencedEl(navEl))-1)
      navEl = navEl.prev();
    navEl.addClass("active");
    // if(yScroll >= scrollYMax(refdEl)) {
    //   navEl.removeClass("active");
    //   navEl.next().addClass("active");
    // } else if (yScroll < scrollYMin(refdEl)-1) {
    //   navEl.removeClass("active");
    //   navEl.prev().addClass("active");
    // } else navEl.addClass("active");
  }(null);

  if(pageEl != null && pageEl.size() > 0) {
    console.log("adding callback");
    $(this).scroll(updateNav); 
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
