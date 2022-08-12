import database from "../../knex/knex.js";
import { calculateAge } from "../libs/healthstats.js";

import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";
import { updateHealthProfile } from "./health_profileDAO.js";

const tableName = "user";
const key = "id";
const queryColumns = [
  "id",
  "firstname",
  "lastname",
  "email",
  "dob",
  "gender",
  "age",
  "units",
];

export function getAllUsers(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export async function getUserByID(id, columns = queryColumns) {
  return await getDataByID(columns, tableName, key, id)
    .then(data => {
      let userObject = data[0];

      return userObject;
    })
    .catch(error => {
      throw error;
    });
}

export function updateUser(updatedFields, id) {
  if (updatedFields.dob) {
    updatedFields.age = calculateAge(updatedFields.dob);
  }

  if (updatedFields.age || updatedFields.gender) {
    updateHealthProfile({ update_cals: true }, id);
  }

  return updateData(updatedFields, tableName, key, id);
}

export function insertUser(params) {
  return insertData(params, tableName);
}

export function deleteUser(id) {
  return deleteData(tableName, key, id);
}

export async function getUserByEmail(email) {
  try {
    return await database
      .select("*")
      .where("email", "=", email)
      .from(tableName);
  } catch (err) {
    console.error(err);
    throw err;
  }
}
