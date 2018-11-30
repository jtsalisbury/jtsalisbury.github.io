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
		"margin-top": "-8px",
		"width": "100%",
		"backgroundColor": "#f0f0f0",
		"margin-left": "-=14vw"
	}, 100);

	$("#nav").removeClass("nav-expanded");
}

function remScrolling() {
	$("#nav").finish().animate({
		"margin-top": "20px",
		"width": "70vw",
		"backgroundColor": "rgba(0, 0, 0, 0)",
		"margin-left": $(window).width() / 2 - $(".section").width() / 2 + 6
	}, 100);

	$("#nav").removeClass("nav-expanded");
}

$(document).ready(function() {
	var scrollApplied = false;
	var distance = $(this).scrollTop();

	if (distance > 0) {
		setScrolling();

		scrollApplied = true;
	}

	$(this).scroll(function() {
		distance = $(this).scrollTop();

		if (distance > 0 && !scrollApplied) {
			setScrolling();

			scrollApplied = true;
		} else if (distance == 0 && scrollApplied) {

			remScrolling();

			scrollApplied = false;
		}
	});

	$(".expandNavigation").click(function(e) {
		e.preventDefault();

		$("#nav").toggleClass("nav-expanded");
	})


})

$(window).on("resize", function() {
	if ($(this).width() <= 800) {
		$(".nav-ul").addClass("nav-ul-mobile").removeClass("nav-ul");
	} else {
		$(".nav-ul-mobile").addClass("nav-ul").removeClass("nav-ul-mobile");
	}

	$("#nav").removeClass("nav-expanded");
})

