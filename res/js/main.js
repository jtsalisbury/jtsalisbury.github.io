
/*
  Responsible for animating the navbar to be full width
*/
function setScrolling() {
	$("#nav").finish().animate({
		"margin-top": "0px",
		"width": "99.2vw",
		"backgroundColor": "#f0f0f0",
		"left": "0vw"
	}, 100);

	$("#nav").removeClass("nav-expanded");
  $(".hamburger").removeClass("change");
}

/*
  Responsible for animating the navbar to be partial width and floating
*/
function remScrolling() {
	$("#nav").finish().animate({
		"margin-top": "20px",
		"width": "70vw",
		"backgroundColor": "rgba(0, 0, 0, 0)",
		"left": $(".container").offset().left
	}, 100);

	$("#nav").removeClass("nav-expanded");
  $(".hamburger").removeClass("change");
}


// In descending order!
// Used to assign locations for each section
var sections = ["about", "projects", "experience", "contact"]
var sectionPositions = [0, 0, 0];

function doExpandableCollapse(target) {
  var end = target.find(".collapseTop");

  var h = end.offset().top - target.offset().top - end.height();

  target.stop().animate({
    height: h
  }, 200);
}

function setExpandableHeights() {
  $(".expandSection").text("Click to Read More");
  $(".expandable").removeClass("expanded");

  $(".expandable").each(function(i, val) {
    doExpandableCollapse($(val));
  })
}

// Determines whether the navbar should be styled for mobile
function testToResizeNavbar() {
	if ($(this).width() <= 800) {
		$(".nav-ul").addClass("nav-ul-mobile").removeClass("nav-ul");
	} else {
		$(".nav-ul-mobile").addClass("nav-ul").removeClass("nav-ul-mobile");
	}

  // Go ahead and collapse the navbar
	$("#nav").removeClass("nav-expanded");
  $(".hamburger").removeClass("change");

  // Reposition the navbar 
  $("#nav").finish().animate({
    "left": $(this).scrollTop() == 0 ? $(".container").offset().left : 0
  }, 100);
}

// Helper function to load repos
function loadRepos() {
  $.ajaxSetup({ cache: true });
  jQuery.getJSON('https://api.github.com/users/jtsalisbury/repos?callback=?',function(data) {
    var repos = data.data;

    if (repos.message) {
      $(".gh-backup").css("display", "inline");
      return;
    }

    repos.sort(function(a, b) {
      return a.name - b.name;
    })

    console.log(repos);

    $(repos).each(function() {
      $(".github-projects-list").append("<li><a class='github-project' target='_blank' href='" + this.html_url + "'>" + this.name + "</a></li>");
    })
  })
}

var previousWidth = 0;
$(document).ready(function() {
  previousWidth = $(window).width();

	var scrollApplied = false;
	var distance = $(this).scrollTop();

  // If we are scrolling, set the scrollbar accordingly
	if (distance > 0) {
		setScrolling();

		scrollApplied = true;
	}

	testToResizeNavbar();

  // Event handler for scrolling the document
	$(this).scroll(function() {
		distance = $(this).scrollTop();

    // If we weren't scrolling but start, apply the scroll settings
		if (distance > 0 && !scrollApplied) {
			setScrolling();

			scrollApplied = true;
		} else if (distance == 0 && scrollApplied) { // If we stop scrolling, remove the scroll settings

			remScrolling();

			scrollApplied = false;
		}

    // Set the navbar labels to be active depending which section we are scrolling at
		for (var i = 0; i < sections.length; i++) {
			if (distance > $("#" + sections[i]).offset().top - 100) {
				$(".goToSection").removeClass("active");
				$(".goTo_" + sections[i]).addClass("active");
			}
		}
	});

  /*
    Click event handlers
  */

  // Responsible for animating the scroll back to the top of the page
	$(".backToTop").click(function() {
		$("html, body").stop().animate({
	        scrollTop: 0
	    }, 500);
	})

  // Opens the navbar menu in mobile
	$(".expandNavigation").click(function(e) {
		e.preventDefault();

		$("#nav").toggleClass("nav-expanded");
    $(".hamburger").toggleClass("change");
	})

  // Determine where to scroll based upon the section header we click on
	$(".goToSection").click(function(e){
	  e.preventDefault();

	  var to = $(this).attr("href");

    $("#nav").removeClass("nav-expanded");
    $(".hamburger").removeClass("change");

  	$("html, body").stop().animate({
        scrollTop: $(to).offset().top - 50
    }, 500);
  });


  // Logic for handling section expansion
  $(".expandSection").click(function(e) {
    e.preventDefault();

    // Find the body for the corresponding expansion link
    var body = $(this).parent().siblings(".body-text");

    if (body.hasClass("expanded")) {

      // Scroll to the top of the section and collapse it
      $("html, body").stop().animate({
          scrollTop: body.parent().parent().offset().top - 75
      }, 150);

      doExpandableCollapse(body);  

      body.removeClass("expanded");
      $(this).text("Click to Read More");

    } else {
      
      // Expand the section
      body.stop().animate({
        height: body[0].scrollHeight+'px'
      }, 400);

      body.addClass("expanded");
      $(this).text("Click to Read Less");
    }
  })

  setExpandableHeights();

  // Setup the image gallery for adminme
  $("#adminme-gallery").lightGallery({
    thumbnail: true,
    showThumbByDefault: true
  });

  loadRepos();
})

// Resize the navbar on window change. As well, load the section positions again.
$(window).on("resize", function() {
  if (previousWidth != $(window).width()) {
    testToResizeNavbar();

    setExpandableHeights();

    previousWidth = $(window).width();
  }	
})