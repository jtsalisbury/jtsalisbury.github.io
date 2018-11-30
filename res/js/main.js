/*
.scrolling {
	background-color: rgb(240, 240, 240);
	width: 100% !important;
	left: 0 !important;
	margin-top: -8px !important;
}
*/

function setScrolling() {
	$("#nav").finish().animate({
		"margin-top": "0px",
		"width": "99.2vw",
		"backgroundColor": "#f0f0f0",
		"left": "0vw"
	}, 100);

	$("#nav").removeClass("nav-expanded");
}

function remScrolling() {
	$("#nav").finish().animate({
		"margin-top": "20px",
		"width": "70vw",
		"backgroundColor": "rgba(0, 0, 0, 0)",
		"left": $(".container").offset().left
	}, 100);

	$("#nav").removeClass("nav-expanded");
}

// In descending order!
var sections = ["about", "projects", "experience", "contact"]

var sectionPositions = [0, 0, 0];

function loadSectionPositions() {
	for (var i = 0; i < sections.length; i++) {
		var pos = $("#" + sections[i]).offset().top - 100;

		sectionPositions[i] = pos;
	}
}

function testToResizeNavbar() {
	if ($(this).width() <= 800) {
		$(".nav-ul").addClass("nav-ul-mobile").removeClass("nav-ul");
	} else {
		$(".nav-ul-mobile").addClass("nav-ul").removeClass("nav-ul-mobile");
	}

	$("#nav").removeClass("nav-expanded");
}

$(document).ready(function() {
	var scrollApplied = false;
	var distance = $(this).scrollTop();

	if (distance > 0) {
		setScrolling();

		scrollApplied = true;
	}

	loadSectionPositions();
	testToResizeNavbar();

	$(this).scroll(function() {
		distance = $(this).scrollTop();

		if (distance > 0 && !scrollApplied) {
			setScrolling();

			scrollApplied = true;
		} else if (distance == 0 && scrollApplied) {

			remScrolling();

			scrollApplied = false;
		}


		for (var i = 0; i < sections.length; i++) {
			if (distance > sectionPositions[i]) {
				$(".goToSection").removeClass("active");
				$(".goTo_" + sections[i]).addClass("active");
			}
		}
	});

	$(".backToTop").click(function() {
		$("html, body").stop().animate({
	        scrollTop: 0
	    }, 500);
	})

	$(".expandNavigation").click(function(e) {
		e.preventDefault();

		$("#nav").toggleClass("nav-expanded");
	})

	$(".goToSection").click(function(e){
		e.preventDefault();

		var to = $(this).attr("href");

    	$("html, body").stop().animate({
	        scrollTop: $(to).offset().top - 50
	    }, 500);

    });
})

$(window).on("resize", function() {
	testToResizeNavbar();

	loadSectionPositions();
})

