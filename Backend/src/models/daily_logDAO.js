import database from "../../knex/knex.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "daily_log";
const key1 = "user_id";
const key2 = "date";
const queryColumns = "*";

export async function getAllDailyLogs(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export async function getDailyLogByID(user_id, date) {
  return await getDataByID(queryColumns, tableName, [key1, key2], [user_id, date])
    .then(data => {
      let dailyLogObject = data[0];

      return dailyLogObject;
    })
    .catch(error => {
      throw error;
    });
}

export async function updateDailyLog(updatedFields, user_id, date) {
  if (updatedFields.calorie_goal) {
    const calorie_goal = updatedFields.calorie_goal;
    updatedFields.protein_goal = Math.round(
      (calorie_goal * updatedFields.protein_goal) / 4
    );
    updatedFields.fat_goal = Math.round(
      (calorie_goal * updatedFields.fat_goal) / 9
    );
    updatedFields.carb_goal = Math.round(
      (calorie_goal * updatedFields.carb_goal) / 4
    );
  }

  return updateData(updatedFields, tableName, [key1, key2], [user_id, date]);
}

export async function createDailyLog(insertFields) {
  const calorie_goal = insertFields.calorie_goal;
  insertFields.protein_goal = Math.round(
    (calorie_goal * insertFields.protein_goal) / 4
  );
  insertFields.fat_goal = Math.round(
    (calorie_goal * insertFields.fat_goal) / 9
  );
  insertFields.carb_goal = Math.round(
    (calorie_goal * insertFields.carb_goal) / 4
  );

  return insertData(insertFields, tableName);
}

export async function deleteDailyLog(tableName, user_id, date) {
  return deleteData(tableName, [key1, key2], [user_id, date]);
}
