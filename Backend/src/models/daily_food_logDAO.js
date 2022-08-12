import database from "../../knex/knex.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "daily_food_log";
const key = "id";
const queryColumns = "*";

export function getAllDailyFoodLog(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export function getDailyFoodLogByID(id) {
  return getDataByID(queryColumns, tableName, key, id);
}

export function updateDailyFoodLog(updatedFields, id) {
  return updateData(updatedFields, tableName, key, id);
}

export function insertDailyFoodLog(params) {
  return insertData(params, tableName);
}

export function deleteDailyFoodLog(id) {
  return deleteData(tableName, key, id);
}

export function getDailyFoodLogByUserIDandDate(user_id, date) {
  return getDataByID(
    queryColumns,
    tableName,
    ["user_id", "date"],
    [user_id, date]
  ).then((data) => {
    if (data && data.length == 0) {
      return insertDailyFoodLog({ user_id: user_id, date: date }).then(
        (log) => {
          return getDataByID(
            queryColumns,
            tableName,
            ["user_id", "date"],
            [user_id, date]
          );
        }
      );
    } else {
      return data;
    }
  });
}
