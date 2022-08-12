import { axiosPost, axiosGet } from "../modules/req.js";

export async function getDailyFoodLog(date) {
  return await axiosGet('api/daily-food-log/get/' + date);
}

export async function getDailyFood(id) {
  return await axiosGet('api/daily-food-log/get-food/' + id);
}

export async function deleteDailyFood(id) {
  const sendData = { id: id };

  return await axiosPost('api/daily-food-log/delete/', sendData);
}

export async function addFoodtoDailyFoodLog(id, quantity, date, meal) {
  const sendData = {
    food_id: id,
    quantity: quantity,
    date: date,
    meal: meal
  };

  return await axiosPost('api/daily-food-log/add', sendData);
}

export async function editDailyFood(id, quantity, meal) {
  const sendData = {
    id: id,
    quantity: quantity,
    meal: meal
  };

  return await axiosPost('api/daily-food-log/update', sendData);
}
