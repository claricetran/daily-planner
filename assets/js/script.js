// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
	// start time at 9AM and end hour at 5PM (17).
	var businessHours = [9, 17];
	// Example of how bootstrap html looks for the timeblocks:
	//	<div id="hour-9" class="row time-block past">
	// 		<div class="col-2 col-md-1 hour text-center py-3">9AM</div>
	// 		<textarea class="col-8 col-md-10 description" rows="3"> </textarea>
	// 		<button class="btn saveBtn col-2 col-md-1" aria-label="save">
	// 			<i class="fas fa-save" aria-hidden="true"></i>
	// 		</button>
	//  </div>
	// This section will write out all of the needed html based off of the bootstrap format. the id and content in the div will be based off the needed hour.
	for (var i = businessHours[0]; i <= businessHours[1]; i++) {
		var hour = dayjs().hour(i);
		$(".container-lg").append(
			'<div id="hour-' +
				i +
				'" class="row time-block"><div class="col-2 col-md-1 hour text-center py-3">' +
				hour.format("hA") +
				'</div><textarea class="col-8 col-md-10 description" rows="3"></textarea><button class="btn saveBtn col-2 col-md-1" aria-label="save"><i class="fas fa-save" aria-hidden="true"></i></button></div>'
		);
	}
	// Listener for click events on save buttons.
	$(".saveBtn").click(function () {
		var timeblockEl = $(this).parent();
		// directly setting the hour-x as the key to grab by using a computed property name
		localStorage.setItem([timeblockEl.attr("id")], timeblockEl.find("textarea").val());
	});

	// Every second, the site will check the current hour compared to the listed business hours and determine if the event is in the past, present, or future and color code accordingly.
	setInterval(function () {
		var currHour = dayjs().hour();
		for (var time = businessHours[0]; time <= businessHours[1]; time++) {
			if (time < currHour) {
				$("#hour-" + time)
					.addClass("past")
					.removeClass("present future");
			} else if (time == currHour) {
				$("#hour-" + time)
					.addClass("present")
					.removeClass("past future");
			} else {
				$("#hour-" + time)
					.addClass("future")
					.removeClass("past present");
			}
		}
	}, 1000);

	// Places any saved events into their respective timeblocks.
	for (var timeBlock = businessHours[0]; timeBlock <= businessHours[1]; timeBlock++) {
		var savedText = localStorage.getItem("hour-" + timeBlock);
		if (savedText != null) {
			$("#hour-" + timeBlock)
				.find("textarea")
				.text(savedText);
		}
	}

	//Displays the current date in the header of the page.
	dayjs.extend(window.dayjs_plugin_advancedFormat);
	$("#currentDay").text(dayjs().format("dddd, MMMM Do"));
});
