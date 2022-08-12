export function calculateAge(birthday) {
  // birthday is a date
  console.log(new Date(birthday));
  var ageDifMs = Date.now() - new Date(birthday);
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  console.log(Math.abs(ageDate.getUTCFullYear() - 1970));
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function calculateBMR(gender, weight, height, age) {
  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  return Math.round(bmr);
}

export function calculateBMI(weight, height) {
  return Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;
}

export function calculateCaloricGoal(bmr, weight_goal, activity_level) {
  let multi;
  switch (parseInt(activity_level)) {
    case 0:
      multi = 1.2;
      break;
    case 1:
      multi = 1.375;
      break;
    case 2:
      multi = 1.55;
      break;
    case 3:
      multi = 1.725;
      break;
    default:
      multi = 1;
      break;
  }

  let amr = bmr * multi;

  let cal_multi;

  //1 lb of fat is 3500 cal
  //if want to lose 1 lb of fat a week, 500 cal deficet each day * 7 = 3500
  //baseline we will say they want to lose/gain 1 lb per week
  switch (parseInt(weight_goal)) {
    case 0:
      cal_multi = -1;
      break;
    case 1:
      cal_multi = 0;
      break;
    case 2:
      cal_multi = 1;
      break;
    default:
      cal_multi = 0;
      break;
  }

  let cal_goal = amr + cal_multi * 500;

  return Math.round(cal_goal);
}
