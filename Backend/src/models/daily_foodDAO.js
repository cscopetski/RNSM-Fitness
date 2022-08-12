import database from "../../knex/knex.js";
import { getDailyFoodLogByUserIDandDate } from "./daily_food_logDAO.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "daily_food";
const key = "id";
const queryColumns = "*";

export function getAllDailyFood(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export function getDailyFoodByID(id) {
  return getDataByID(queryColumns, tableName, key, id);
}

export function updateDailyFood(updatedFields, id) {
  return updateData(updatedFields, tableName, key, id);
}

export function insertDailyFood(params) {
  return insertData(params, tableName);
}

export function deleteDailyFood(id) {
  return deleteData(tableName, key, id);
}

export function getAllDailyFoodfromDailyFoodLogID(daily_food_log_id) {
  return getDataByID(
    queryColumns,
    tableName,
    "daily_food_log_id",
    daily_food_log_id
  );
}

export async function getDailyFoodMacrosByID(id) {
  try {
    const food = await database
      .where(tableName + ".id", "=", id)
      .select("*")
      .from(tableName)
      .join("food", "food.id", tableName + ".food_id")
      .select(
        tableName + ".id",
        tableName + ".quantity",
        tableName + ".meal",
        "food.name",
        "food.protein",
        "food.fat",
        "food.carbs",
        "food.calories",
        "food.serving_size"
      );
    console.log(food);
    return food;
  } catch (err) {
    console.log(err);
    throw new Error("Error getting daily food with id " + id);
  }
}

export async function getAllDailyFoodfromUserIDandDate(user_id, date) {
  return getDailyFoodLogByUserIDandDate(user_id, date).then(async (log) => {
    if (log) {
      try {
        const foods = await database
          .where("daily_food_log_id", "=", log[0].id)
          .select("*")
          .from(tableName)
          .join("food", "food.id", tableName + ".food_id")
          .select(
            tableName + ".id",
            tableName + ".quantity",
            tableName + ".meal",
            "food.name",
            "food.protein",
            "food.fat",
            "food.carbs",
            "food.calories",
            "food.serving_size"
          );

        return foods;
      } catch (err) {
        console.log(err);
        throw new Error(
          "Error getting daily foods with user_id " +
          user_id +
          " and date " +
          date
        );
      }
    } else {
      console.log(
        "No Daily Foods exist with user_id " + user_id + " and date " + date
      );
      throw new Error(
        "No Daily Foods exist with user_id " + user_id + " and date " + date
      );
    }
  });
}
