import knex from "knex";
import database from "../../knex/knex.js";
import { getTimestamp } from "../libs/date.js";

export async function getAllData(selectFields, tableName) {
  try {
    return await database.select(selectFields).from(tableName);
  } catch (err) {
    console.error(err);
  }
}

export async function getDataByID(selectFields, tableName, colNames, values) {
  if (Array.isArray(colNames)) {
    switch (colNames.length) {
      case 1:
        try {
          //console.log(selectFields);
          return await database
            .where(colNames[0], "=", values[0])
            .select(selectFields)
            .from(tableName);
        } catch (err) {
          console.error(err);
        }
        break;
      case 2:
        try {
          //console.log(selectFields);
          return await database
            .where(colNames[0], "=", values[0])
            .where(colNames[1], "=", values[1])
            .select(selectFields)
            .from(tableName);
        } catch (err) {
          console.error(err);
        }
        break;
      default:
        throw new Error("Malformed array input for colNames on select");
        break;
    }
  } else {
    try {
      //console.log(selectFields);
      return await database
        .where(colNames, "=", values)
        .select(selectFields)
        .from(tableName);
    } catch (err) {
      console.error(err);
    }
  }
}

export async function updateData(updatedFields, tableName, colNames, values) {
  updatedFields.updated_at = getTimestamp();

  if (Array.isArray(colNames)) {
    switch (colNames.length) {
      case 1:
        try {
          //console.log(updatedFields);
          return await database
            .where(colNames[0], "=", values[0])
            .update(updatedFields)
            .from(tableName);
        } catch (err) {
          console.error(err);
        }
        break;
      case 2:
        try {
          //console.log(updatedFields);
          return await database
            .where(colNames[0], "=", values[0])
            .where(colNames[1], "=", values[1])
            .update(updatedFields)
            .from(tableName);
        } catch (err) {
          console.error(err);
        }
        break;
      default:
        throw new Error("Malformed array input for colNames on update");
        break;
    }
  } else {
    try {
      return await database
        .where(colNames, "=", values)
        .update(updatedFields)
        .from(tableName);
    } catch (err) {
      console.error(err);
    }
  }
}

export async function insertData(insertFields, tableName) {
  try {
    return await database.insert(insertFields).from(tableName);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteData(tableName, colNames, values) {
  if (Array.isArray(colNames)) {
    switch (colNames.length) {
      case 1:
        try {
          return await database
            .where(colNames[0], "=", values[0])
            .delete()
            .from(tableName);
        } catch (err) {
          console.error(err);
        }
        break;
      case 2:
        try {
          return await database
            .where(colNames[0], "=", values[0])
            .where(colNames[1], "=", values[1])
            .delete()
            .from(tableName);
        } catch (err) {
          console.error(err);
        }
        break;
      default:
        throw new Error("Malformed array input for colNames on delete");
        break;
    }
  } else {
    try {
      return await database
        .where(colNames, "=", values)
        .delete()
        .from(tableName);
    } catch (err) {
      console.error(err);
    }
  }
}
