import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import ActivityLevelBox from "../SignupPage/ActivityLevelBox";
import HealthInfoBox from "../SignupPage/HealthInformationBox";
import HeightTextField from "../SignupPage/HeightTextField";
import WeightTextField from "../SignupPage/WeightTextField";
import UnitsButton from "../SignupPage/UnitsButton";
import PersonalInfoBox from "../SignupPage/PersonalInfoBox";
import { getDate, getHealthProfile } from "../../routes/account/home";
import WeightGoalBox from "../SignupPage/WeightGoalBox";
import SuccessFailureMessage from "../Success-FailureMessage";
import { updateHealthProfile } from "../../lib/User";

const FitnessProfileChange = ({
  healthProfileData,
  currUnits = "imperial",
}) => {
  const [units, setUnits] = useState(currUnits);
  const [height, setHeight] = useState(healthProfileData.height || "");
  const [startWeight, setStartWeight] = useState(
    healthProfileData.initial_weight
  );
  const [weight, setWeight] = useState(healthProfileData.weight || "");
  const [goalWeight, setGoalWeight] = useState(
    healthProfileData.goal_weight || ""
  );
  const [activity, setActivity] = useState(
    healthProfileData.activity_level || ""
  );
  const [weightGoal, setWeightGoal] = useState(
    healthProfileData.weight_goal || ""
  );

  const [inputErrors, setInputErrors] = useState(false);
  const [inputSuccess, setInputSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {
      height: height,
      weight: weight,
      initial_weight: startWeight,
      goal_weight: goalWeight,
      activity_level: activity,
      weight_goal: weightGoal,
      update_cals: true,
    };

    updateHealthProfile(body)
      .then(() => {
        setInputSuccess(true);
        setInputErrors(false);
      })
      .catch((err) => {
        setInputErrors(true);
        setInputSuccess(false);
        console.log(inputErrors);
        console.log(err);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityLevelBox
          setActivityLevel={setActivity}
          currActivityLevel={activity}
        ></ActivityLevelBox>
        <WeightGoalBox
          currWeightGoal={weightGoal}
          setWeightGoal={setWeightGoal}
        ></WeightGoalBox>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ marginTop: "5%", marginBottom: "5%", width: "100%" }}>
              <Typography variant="h5" align="center">
                Height
              </Typography>
              <HeightTextField
                units={units}
                currHeight={height}
                setHeight={setHeight}
              ></HeightTextField>
            </Box>
            <Box sx={{ marginTop: "5%", marginBottom: "5%", width: "100%" }}>
              <Typography variant="h5" align="center">
                Starting Weight
              </Typography>
              <WeightTextField
                units={units}
                currWeight={startWeight}
                setWeight={setStartWeight}
              ></WeightTextField>
            </Box>
            <Box sx={{ marginTop: "5%", marginBottom: "5%", width: "100%" }}>
              <Typography variant="h5" align="center">
                Current Weight
              </Typography>
              <WeightTextField
                units={units}
                currWeight={weight}
                setWeight={setWeight}
              ></WeightTextField>
            </Box>
            <Box sx={{ marginTop: "5%", marginBottom: "5%", width: "100%" }}>
              <Typography variant="h5" align="center">
                Goal Weight
              </Typography>
              <WeightTextField
                units={units}
                currWeight={goalWeight}
                setWeight={setGoalWeight}
              ></WeightTextField>
            </Box>

            <UnitsButton
              setParentUnits={setUnits}
              currUnits={units}
            ></UnitsButton>
          </Box>
        </Box>
        <Button
          variant="contained"
          type="submit"
          sx={{ width: "50%", marginTop: "5%" }}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>
        <SuccessFailureMessage
          success={inputSuccess}
          failure={inputErrors}
          successMessage="Successfully updated health profile"
          failureMessage="Error updating health profile"
          setFailure={setInputErrors}
          setSuccess={setInputSuccess}
        ></SuccessFailureMessage>
      </Box>
    </Container>
  );
};

export default FitnessProfileChange;
