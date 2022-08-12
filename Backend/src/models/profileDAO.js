import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

const tableName = "profiles";
const key = "user_id";
const queryColumns = "*";

export function getAllProfiles(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export async function getProfileByID(id) {
  return await getDataByID(queryColumns, tableName, key, id)
    .then((data) => {
      const profileObject = data[0];

      return profileObject;
    })
    .catch((error) => {
      throw error;
    })
}

export function updateProfile(updatedFields, id) {
  return updateData(updatedFields, tableName, key, id);
}

export function insertProfile(params) {
  return insertData(params, tableName);
}

export function deleteProfile(id) {
  return deleteData(tableName, key, id);
}