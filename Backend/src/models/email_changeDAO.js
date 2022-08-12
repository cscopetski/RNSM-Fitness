import database from "../../knex/knex.js";
import { getTimestamp } from "../libs/date.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "email_change";
const key = "user_id";
const queryColumns = "*";

export function getAllEmailChange(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export async function getEmailChangeByID(id) {
  return await getDataByID(queryColumns, tableName, key, id)
    .then(data => {
      let emailChangeObject = data[0];

      return emailChangeObject;
    })
    .catch(error => {
      throw error;
    });

}

export async function getEmailChangeByToken(token) {
  return await getDataByID(queryColumns, tableName, "email_verification_token", token)
    .then(data => {
      let emailChangeObject = data[0];

      return emailChangeObject;
    })
    .catch(error => {
      throw error;
    });
}

export function updateEmailChange(updatedFields, id) {
  return updateData(updatedFields, tableName, key, id);
}

export function insertEmailChange(params) {
  return insertData(params, tableName);
}

export function deleteEmailChange(id) {
  return deleteData(tableName, key, id);
}

export async function deleteExpiredEmailTokens() {
  return await database
    .delete()
    .where(
      "email_verification_token_expiration",
      "<",
      getTimestamp(new Date(Date.now()))
    )
    .from(tableName);
}
