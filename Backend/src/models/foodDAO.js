import database from "../../knex/knex.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "food";
const key = "id";
const queryColumns = "*";

export function getAllFood(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export async function getFoodByID(id) {
  return await getDataByID(queryColumns, tableName, key, id)
    .then(data => {
      let foodObject = data[0];

      return foodObject;
    })
    .catch(error => {
      throw error;
    });
}

export function updateFood(updatedFields, id) {
  return updateData(updatedFields, tableName, key, id);
}

export function insertFood(params) {
  return insertData(params, tableName);
}

export function deleteFood(id) {
  return deleteData(tableName, key, id);
}

export async function getAllFoodByUserID(id) {
  try {
    return await database
      .where("user_id", "=", id)
      .select(queryColumns)
      .from(tableName);
  } catch (err) {
    console.error(err);
  }
}

export async function getAllVisibleFoodByUserID(id) {
  try {
    return await database
      .where("user_id", "=", id)
      .where("is_visible", "=", true)
      .select(queryColumns)
      .from(tableName);
  } catch (err) {
    console.error(err);
  }
}
