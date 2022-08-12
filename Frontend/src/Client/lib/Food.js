import { axiosPost, axiosGet } from "../modules/req.js";

export async function insertFood(name, serving_size, fat, carbs, protein) {
  let data = {
    name: name,
    serving_size: serving_size,
    fat: fat,
    carbs: carbs,
    protein: protein,
    calories: calculateTotalCalories(fat, carbs, protein),
  };

  return await axiosPost("api/food/insert", data);
}

export async function editFood(
  id,
  name,
  serving_size,
  fat,
  carbs,
  protein,
  is_visible = true
) {
  let data = {
    id: id,
    name: name,
    serving_size: serving_size,
    fat: fat,
    carbs: carbs,
    protein: protein,
    is_visible: is_visible,
    calories: calculateTotalCalories(fat, carbs, protein),
  };

  return await axiosPost("api/food/update", data);
}

export async function getFood(id) {
  return await axiosGet("api/food/get/" + id);
}

export async function getAllUserFoods() {
  return await axiosGet("api/food/getAll-user");
}

export function calculateTotalCalories(fat, carbs, protein) {
  return fat * 9 + carbs * 4 + protein * 4;
}

export function calculateMacros(totalCals, fatRatio, carbRatio, proteinRatio) {
  return {
    fat: Math.round((fatRatio * totalCals) / 9),
    carbs: Math.round((carbRatio * totalCals) / 4),
    protein: Math.round((proteinRatio * totalCals) / 4),
  };
}

export function compare(
  a,
  b,
  ascending,
  by,
  a_quantity = 1,
  b_quantity = 1,
  round = false
) {
  let diff = 0;

  if (typeof a[by] === "string") {
    diff = a[by].toLowerCase().localeCompare(b[by].toLowerCase());
  } else if (typeof a[by] === "number") {
    if (round) {
      diff =
        Math.round(a[by] * a_quantity) > Math.round(b[by] * b_quantity)
          ? -1
          : 1;
    } else {
      diff = a[by] * a_quantity > b[by] * b_quantity ? -1 : 1;
    }
  }

  if (ascending === true) {
    return diff;
  }

  return -1 * diff;
}
