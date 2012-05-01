
if(console) {
  console.__log = console.log;
  console.log = undefined;
  console.__warn = console.warn;
  console.warn = undefined;
  console.__error = console.error;
  console.error = undefined;
} else {
  console = {}
  console.__log = console.__warn = console.__error = function () {}
}

function log (msg) {
  console.__log(msg);
}

function warn (msg) {
  console.__warn(msg);
}

function error (msg) {
  console.__error(msg);
}

function makeExternalLinksOpenInNewWindow(root_stor) {
	var hostname = window.location.hostname
  $(root_stor+" a[href^=http]")
    .not("a[href*='" + hostname + "']")
    .addClass('link external')
    .attr('target', '_blank');
}

function bump(thing, type, active_class, inactive_class) {
  var things = $("[id$='"+type+"']");
  if(things.size() == 0) {
    error("There's no elements with ids ending in "+type+" in this document.");
    return;
  }
  things.each(function(i, el) {
    $(el).removeClass(active_class);
    $(el).addClass(inactive_class);
  });
  var el = $("#"+thing+"-"+type);
  if(el.size() == 0) {
    error("There's no element with id \""+thing+"-"+type+"\".");
    return;
  }
  $("#"+thing+"-"+type).addClass(active_class);
  $("#"+thing+"-"+type).removeClass(inactive_class);
}

function showPage(page) {
  bump(page, "page", "center", "left");
}

function activeSubNavEl() {
  var pageEl = $("[id$=page]");
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
  return el.offset().top + el.height();
}

function doScrollSpy() {
  var navEl = activeSubNavEl();
  if(navEl) {
    var yScroll = scrollYMin(referencedEl(navEl));
    $(this).scrollTop(yScroll);
  }
  function updateNav (e) {
    var navEl = activeSubNavEl();
    if(navEl) {
      var yScroll = $(this).scrollTop();
      navEl.removeClass("active");
      while(yScroll >= scrollYMax(referencedEl(navEl)))
        navEl = navEl.next();
      while(yScroll < scrollYMin(referencedEl(navEl))-1)
        navEl = navEl.prev();
      navEl.addClass("active");
    }
  }(null);

  $(this).scroll(updateNav); 
}

// Starting point:
$(document).ready(function() {

  makeExternalLinksOpenInNewWindow(""); 
  // showPage("home");
  doScrollSpy();
});

// function hide(klass, removeKlass) {
//   var to_hide = $("."+klass+"."+removeKlass);
//   to_hide.removeClass(removeKlass);
// }

// function showPage(name) {
//   // currentPage = name;
//   show(name, "page", "showing");
//   pageShown(name);
// }

// function currentPageEl() {
//   return $(".page.showing");
// }





// function show(id, klass, addKlass) {
//   hide(klass, addKlass);
//   $("#"+id).addClass(addKlass);  
// }


// function showPrev(klass) {
//   var stor="."+klass;
//   var to_hide = $(stor+".showing");
//   to_hide.removeClass("showing");

//   var index = to_hide.index();
//   index--;
//   if (index < 0)
//     index = $(stor).size() - 1;
//   var to_show = $(stor).eq(index);

//   to_show.addClass("showing");
//   return to_show;
// }

// function showNext(klass) {
//   var stor="."+klass;
//   var to_hide = $("."+stor+".showing");
//   to_hide.removeClass("showing");

//   var index = to_hide.index();
//   index++;
//   if (index >= $(stor).size())
//     index = 0;
//   var to_show = $(stor).eq(index);

//   to_show.addClass("showing");
//   return to_show;
// }
