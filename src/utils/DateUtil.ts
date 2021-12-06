import { ROOT_URL } from '../constants';
import { format } from 'date-fns';

var singapore = require('./singapore_en');
var romcal2 = require('./romcal');


var url = "https://www.supuwatha.com/web/TAMIL/READINGS/";
var urltxt = "https://www.arulvakku.com/calendar.php?dt=";
var urlsaints = 'https://www.supuwatha.com/web/TAMIL/';

//base urls for daily readings.
var baseURL = 'https://www.supuwatha.com/web/TAMIL/READINGS/';
var baseURLsaints = 'https://www.supuwatha.com/web/TAMIL/';

const properReadingsForMemorials = [
    'martha_of_bethany_mary_of_bethany_and_lazarus_of_bethany',
    'our_lady_of_sorrows',
    'therese_of_the_child_jesus_and_the_holy_face_of_lisieux_virgin',
    'guardian_angels',
    'francis_xavier_priest',
    'barnabas_apostle',
    'passion_of_saint_john_the_baptist',
    'immaculate_heart_of_mary',
    'timothy_of_ephesus_and_titus_of_crete_bishops',
    'mary_mother_of_the_church',
];

//Array for the calendar
var eventsArray = [];

// constants for month names
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// If your locale is supported by Romcal, it will use it.
// If not, it will default to 'en'.
//var currentLocale = navigator.language || navigator.userLanguage;
var currentLocale = 'en-US'

var today = new Date();
//var today = new Date(2021, 04, 04);

//Remove hours, minutes, seconds and milliseconds


var liturgicalReading = "";
var liturgicalDay = "";
var dailyReading = "";
var dailyReflection = "";
var dailySaints = "";
var dailyReadingVideo = "";


function getTodayReading(selectedDate: Date) {

  today=selectedDate;
  today.setHours(8, 0, 0, 0);

  currentLocale = 'en-US';

    const romcal = new romcal2({
        localizedCalendar: singapore,
        scope: 'gregorian',
        epiphanyOnSunday: true,
        corpusChristiOnSunday: true,
        ascensionOnSunday: false,
        outputOptionalMemorials: false,
        strictMode: true
    });

    romcal.generateCalendar(today.getFullYear()).then(function (result) {

        // for the first year which is the current year

        var isoTodayDate = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, '0') + "-" + String(today.getDate()).padStart(2, '0');
        var todayArray = result[isoTodayDate];

        // function to create the daily reading links.
        dailyReadingLinks(todayArray);

    });

}

function dailyReadingLinks(result) {

  var todayDateTxt = today.getDate() + "-" + months[today.getMonth()] + "-" + today.getFullYear();
  //console.log(todayDateTxt, "todaydate");

  var celebrationTypevariable = result[0].rank;
  //console.log(" " + result[0].rank, "celebrationTypes");


  if (result[0].rank == "SOLEMNITY" || result[0].rank == "FEAST") {
      var path = baseURL + result[0].rank + "/" + result[0].cycles.sundayCycle + "/" + result[0].key;
      //console.log(result[0].name + " (" + result[0].cycles.sundayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].name + " (" + result[0].cycles.sundayCycle + ")", "liturgicalReading";
  }

  else if (result[0].rank == "SUNDAY") {
      var path = baseURL + result[0].seasons[0] + "/" + "SUNDAY" + "/" + result[0].cycles.sundayCycle + "/" + String(result[0].calendar.weekOfSeason).padStart(2, '0') + "/" + result[0].calendar.dayOfWeek;
      //console.log(result[0].name + " (" + result[0].cycles.sundayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].name + " (" + result[0].cycles.sundayCycle + ")", "liturgicalReading";
  }

  else if (result[0].periods[0] == "CHRISTMAS_OCTAVE") {
      var path = baseURL + result[0].seasons[0] + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/OCTAVE/" + result[0].calendar.dayOfSeason;
      //console.log(result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");

      liturgicalReading = result[0].name + " (" + result[0].cycles.sundayCycle + ")", "liturgicalReading";

  }

  else if (result[0].key.includes("advent_december_")) {
      var path = baseURL + result[0].seasons[0] + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/NOVENA/" + result[0].key;
      console.log(result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";

  }

  else if (result[0].periods[0] == "DAYS_BEFORE_EPIPHANY") {
      if (result[0].key == "basil_the_great_and_gregory_nazianzen_bishops") {
          var path = baseURL + "CHRISTMASTIDE" + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/EPIPHANY/" + result[0].weekday.key
          console.log(result[0].weekday.name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");

          liturgicalReading = result[0].weekday.name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";
      }
      else {
          var path = baseURL + "CHRISTMASTIDE" + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/EPIPHANY/" + result[0].key
          console.log(result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");

          liturgicalReading = result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";
      }
  }

  else if (result[0].periods[0] == "DAYS_FROM_EPIPHANY") {
      var path = baseURL + "CHRISTMASTIDE" + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/EPIPHANY/" + result[0][0].calendar.dayOfWeek;
      console.log(result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";
  }

  else if (result[0].rank == "MEMORIAL" && properReadingsForMemorials.includes(result[0].key)) {
      var path = baseURL + "/" + result[0].rank + "/" + result[0].key;
      console.log(result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";

  }

  else if (result[0].rank == "MEMORIAL") {
      var path = baseURL + result[0].seasons[0] + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/" + String(result[0].calendar.weekOfSeason).padStart(2, '0') + "/" + result[0].calendar.dayOfWeek;

      console.log(result[0].weekday.name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].weekday.name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";
      liturgicalDay = result[0].name;
  }

  else {
      var path = baseURL + result[0].seasons[0] + "/" + "WEEKDAY" + "/" + result[0].cycles.weekdayCycle + "/" + String(result[0].calendar.weekOfSeason).padStart(2, '0') + "/" + result[0].calendar.dayOfWeek;
      console.log(result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading");
      liturgicalReading = result[0].name + " (" + result[0].cycles.weekdayCycle + ")", "liturgicalReading";
  }

  dailyReading = path + ".mp3";
  dailyReadingVideo = path + ".mp4";
  dailyReflection = path + "R.mp3";
  dailySaints = baseURLsaints + "SAINTS/AUDIO" + "/" + months[today.getMonth()] + "/" + String(today.getDate()).padStart(2, '0') + '.mp3';
  console.log(path + ".mp3");
  console.log(path + "R.mp3");
  console.log(baseURLsaints + "SAINTS/AUDIO" + "/" + months[today.getMonth()] + "/" + String(today.getDate()).padStart(2, '0') + '.mp3');

  // res.send(JSON.stringify({
  //     daily_reading: dailyReading,
  //     daily_reflection: dailyReflection,
  //     daily_saints: dailySaints,
  //     liturgical_reading: liturgicalReading,
  //     liturgical_day: liturgicalDay
  // }));
}

function getAudioURL(selectedDate: Date) {
  getTodayReading(selectedDate);
  //return ROOT_URL + 'AUDIO/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.mp3';
  console.log(dailyReading);
  return dailyReading;
}

function getVideoURL(selectedDate: Date) {
  getTodayReading(selectedDate);
  //return ROOT_URL + 'VIDEO/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.mp4';

  //https://www.supuwatha.com/web/TAMIL/READINGS/ADVENT/WEEKDAY/YEAR_2/02/1.mp4
  return dailyReadingVideo;
}

function getTextURL(selectedDate: Date) {
  const textBaseURL = `https://www.arulvakku.com/calendar.php?dt=${format(selectedDate, 'yyyy-MM-dd')}`;
  return textBaseURL;
}

function getSaintsAudioURL(selectedDate: Date) {
  return ROOT_URL + 'SAINTS/AUDIO/' + format(selectedDate, 'MMM/dd').toUpperCase() + '.mp3';
}

function getSaintsVideoURL(selectedDate: Date) {
  return ROOT_URL + 'SAINTS/VIDEO/' + format(selectedDate, 'MMM/dd').toUpperCase() + '.mp4';
}

function getSaintsTextURL(selectedDate: Date) {
  return ROOT_URL + 'SAINTS/TEXT/' + format(selectedDate, 'MMM/dd').toUpperCase() + '.pdf';
}

function getReflectionURL(selectedDate: Date) {
  getTodayReading(selectedDate);
  //return ROOT_URL + 'REFLECTION/' + format(selectedDate, 'yyyy/MMM/dd').toUpperCase() + '.mp3';
  return dailyReflection;

}

export default {
  getAudioURL,
  getVideoURL,
  getTextURL,
  getSaintsAudioURL,
  getSaintsVideoURL,
  getSaintsTextURL,
  getReflectionURL,
};
