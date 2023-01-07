// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
	var businessHours = [9, 17]; // start time at 9 and end hour at 5PM (17).
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
	// TODO: Add code to apply the past, present, or future class to each time
	// block by comparing the id to the current hour. HINTS: How can the id
	// attribute of each time-block be used to conditionally add or remove the
	// past, present, and future classes? How can Day.js be used to get the
	// current hour in 24-hour time?
	//
	// TODO: Add code to get any user input that was saved in localStorage and set
	// the values of the corresponding textarea elements. HINT: How can the id
	// attribute of each time-block be used to do this?
	//
	// TODO: Add code to display the current date in the header of the page.
	dayjs.extend(window.dayjs_plugin_advancedFormat);
	$("#currentDay").text(dayjs().format("dddd, MMMM Do"));
});
