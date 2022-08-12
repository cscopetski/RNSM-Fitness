const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export function getDate(input_date = new Date(Date.now())) {
  const date = new Date(input_date);

  return (
    date.getUTCFullYear() +
    "-" +
    (date.getUTCMonth() + 1 <= 10 ? "0" : "") +
    (date.getUTCMonth() + 1) +
    "-" +
    (date.getUTCDate() + 1 <= 10 ? "0" : "") +
    date.getUTCDate()
  );
}

export function addDaysToDate(input_date = new Date(Date.now()), num_days = 0) {
  const date = new Date(input_date);
  date.setDate(date.getDate() + num_days);

  return date;
}

export function convertDateToString(GivenDate) {
  var date = new Date(GivenDate);

  var month = months[date.getMonth()];

  var day = date.getUTCDate() + nth(date.getUTCDate());
  var year = date.getFullYear();

  return month + " " + day + ", " + year;
}

export function getDayofWeek(input_date = new Date(Date.now())) {
  const date = new Date(input_date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getUTCDay()];
}
