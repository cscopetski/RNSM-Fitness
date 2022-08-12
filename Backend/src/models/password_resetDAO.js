import database from "../../knex/knex.js";
import { getTimestamp } from "../libs/date.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "password_reset";
const key = "user_id";
const queryColumns = "*";

export function getAllPasswordReset(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export function getPasswordResetByID(id) {
  return getDataByID(queryColumns, tableName, key, id);
}

export function getPasswordResetByToken(token) {
  return getDataByID(queryColumns, tableName, "password_reset_token", token);
}

export function updatePasswordReset(updatedFields, id) {
  return updateData(updatedFields, tableName, key, id);
}

export function insertPasswordReset(params) {
  return insertData(params, tableName);
}

export function deletePasswordReset(id) {
  return deleteData(tableName, key, id);
}

export async function deleteExpiredPasswordTokens() {
  return await database
    .delete()
    .where(
      "password_reset_token_expiration",
      "<",
      getTimestamp(new Date(Date.now()))
    )
    .from(tableName);
}
