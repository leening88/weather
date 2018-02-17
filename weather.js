// jQuery Weather!

// Using your newfound knowledge of jQuery, create a weather
// application. It should:
// - Use a loop to create 6 days of forecast within the <div> element
//   with class name "forecast"
// - When clicking the "Get the weather!" button, the weather should
//   appear with a "fade" effect (try fading in the .current and .forecast
//   elements at different speeds for maximum fun!)
// - It doesn't need to fade in again when clicking "Get the weather!"
//   after the first time

// NOTES AND HINTS

// All of the work of grabbing data from the Dark Sky API is already done
// for you! Your task is to take that data, transform it into HTML, and
// insert it into the document. All of your work begins on line 47!

// Each day of the forecast should use HTML markup similar to:
// <div class="col">
//   <h3><i class="fas fa-sun"></i></h3>
//   <h4>89|55</h4>
//   <h5>Clear throughout the day.</h5>
// </div>

// The CSS styles are already written to fit the markup above. However,
// feel free to go nuts!

// The provided icon() function (in helpers.js) takes a Dark Sky icon name
// (e.g. "clear-day") and converts it into an icon, e.g.
// icon("clear-day") => <i class='fas fa-sun'></i>

// Math.round(75.88) => 75

// .empty() empties the HTML contents of a jQuery DOM object

// .append() appends a string (containing HTML) to a jQuery DOM object

let handleWeatherResponse = function(response) {
  // leave these two lines alone; they allow for the inspection of
  // the response object in the browser console (try typing "response"
  // in the Chrome JavaScript console!)
  console.log(response)
  window.response = response

  // **** your code starts here - don't modify anything else. you will be sad.

$(".current").fadeIn(2000);
$("#current-conditions-icon").empty();
let curr_header = '<div class="col-12">' + '<h4>CURRENT CONDITIONS</h4>' + '</div>';
$("#current-conditions-icon").append(curr_header);

let weather_curr = response.currently;
let weather_today = response.daily.data[0];
let icon_html = icon(weather_curr.icon);
$("#current-conditions-icon").append(icon_html);

$("#current-conditions-text").empty();
let text_html = Math.round(weather_curr.temperature) + '&deg ';
text_html += weather_curr.summary + '<br>';
text_html += '<h5>H '+ Math.round(weather_today.temperatureHigh) + '&deg | ';
text_html += 'L '+ Math.round(weather_today.temperatureLow) + '&deg<br>';
text_html += 'UV index of ' + weather_curr.uvIndex + ' of 10</h5>';
$("#current-conditions-text").append(text_html);

$(".forecast").fadeIn(5000);
$(".forecast").empty();
let fcst_header = '<div class="col-12">' + '<h4>7 DAY FORECAST</h4>' + '</div>';
$(".forecast").append(fcst_header);

for (let i=1; i<response.daily.data.length; i++) {
  let weather_fcst = response.daily.data[i];
  let html = '<div class="col">';
  html += '<h3>' + icon(weather_fcst.icon) + '</h3>';
  html += '<h4>' + Math.round(weather_fcst.temperatureHigh) + '&deg';
  html += ' | ' + Math.round(weather_fcst.temperatureLow) + '&deg</h4>';
  html += '<h6>' + weather_fcst.summary + '</h6>';
  html += '</div>'
$(".forecast").append(html);
}
  // *** your code ends here -- really.
};

// leave this alone; does the event handling and ajax
$(function() {
  $("#get-the-weather").on("click", function(event) {
    event.preventDefault();
    let locationName = $("#location-name").val();
    geocodeAndGetWeather(locationName);
  });
});
