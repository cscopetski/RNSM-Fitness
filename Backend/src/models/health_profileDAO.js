import database from "../../knex/knex.js";
import {
  deleteData,
  getAllData,
  getDataByID,
  insertData,
  updateData,
} from "./DAO.js";

import bcrypt from "bcrypt";
import knex from "knex";
import { getUserByID } from "./userDAO.js";
import { updateDailyLog } from "./daily_logDAO.js";
import {
  calculateBMI,
  calculateBMR,
  calculateCaloricGoal,
} from "../libs/healthstats.js";
import { getDate } from "../libs/date.js";

const tableName = "health_profile";
const key = "user_id";
const queryColumns = "*";

const base_protein_ratio = 0.25;
const base_fat_ratio = 0.25;
const base_carb_ratio = 0.5;

export function getAllHealthProfiles(columns = queryColumns) {
  return getAllData(columns, tableName);
}

export async function getHealthProfileByID(id) {
  return await getDataByID(queryColumns, tableName, key, id)
    .then(data => {
      let healthProfileObject = data[0];

      return healthProfileObject;
    })
    .catch(error => {
      throw error;
    });
}

/*
  If you want caloric goal to be automatically calculated must attach update_cals to fields
*/
export async function updateHealthProfile(updatedFields, id) {
  if (
    updatedFields.weight !== undefined ||
    updatedFields.height !== undefined ||
    updatedFields.update_cals ||
    updatedFields.activity_level !== undefined ||
    updatedFields.weight_goal !== undefined
  ) {
    getHealthProfileByID(id).then((healthProfile) => {
      updatedFields.bmi = calculateBMI(
        updatedFields.weight || healthProfile.weight,
        updatedFields.height || healthProfile.height
      );

      if (updatedFields.update_cals) {
        delete updatedFields.update_cals;

        getUserByID(id).then((user) => {
          updatedFields.bmr = calculateBMR(
            user.gender,
            updatedFields.weight || healthProfile.weight,
            updatedFields.height || healthProfile.height,
            user.age
          );
          updatedFields.calorie_goal = calculateCaloricGoal(
            updatedFields.bmr,
            updatedFields.weight_goal || healthProfile.weight_goal,
            updatedFields.activity_level || healthProfile.activity_level
          );
          updateDailyLog(
            {
              calorie_goal: updatedFields.calorie_goal,
              carb_goal: healthProfile.carb_goal_ratio,
              protein_goal: healthProfile.protein_goal_ratio,
              fat_goal: healthProfile.fat_goal_ratio,
            },
            id,
            getDate()
          );
          console.log("CALORIE: " + updatedFields.calorie_goal);
          return updateData(updatedFields, tableName, key, id);
        });
      }

      return updateData(updatedFields, tableName, key, id);
    });
  } else {
    if (
      updatedFields.calorie_goal ||
      updatedFields.carb_goal_ratio ||
      updatedFields.fat_goal_ratio ||
      updatedFields.protein_goal_ratio
    ) {
      getHealthProfileByID(id).then((healthProfile) => {
        updateDailyLog(
          {
            calorie_goal:
              updatedFields.calorie_goal || healthProfile.calorie_goal,
            carb_goal:
              updatedFields.carb_goal_ratio || healthProfile.carb_goal_ratio,
            protein_goal:
              updatedFields.protein_goal_ratio ||
              healthProfile.protein_goal_ratio,
            fat_goal:
              updatedFields.fat_goal_ratio || healthProfile.fat_goal_ratio,
          },
          id,
          getDate()
        );
        return updateData(updatedFields, tableName, key, id);
      });
    }
    return updateData(updatedFields, tableName, key, id);
  }
}

export async function insertHealthProfile(params) {
  //might want to look into these base numbers more
  params.protein_goal_ratio = base_protein_ratio;
  params.carb_goal_ratio = base_carb_ratio;
  params.fat_goal_ratio = base_fat_ratio;
  return insertData(params, tableName);
}

export async function deleteHealthProfile(id) {
  return deleteData(tableName, key, id);
}
