import React, { useState, useEffect } from "react";
import SignupBox from "../../Components/SignupPage/SignupBox";
import { Navigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import HealthSignupBox from "../../Components/SignupPage/ActivityLevelBox";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/material";
import { CssBaseline } from "@mui/material";
import WeightGoalBox from "../../Components/SignupPage/WeightGoalBox";
import ActivityLevelBox from "../../Components/SignupPage/ActivityLevelBox";
import HealthInfoBox from "../../Components/SignupPage/HealthInformationBox";
import PersonalInfoBox from "../../Components/SignupPage/PersonalInfoBox";
import { AxiosInstance } from "../../modules/req.js";
import { PageLoadingMinHeight } from "../../lib/Loading";

const CreateAccount = ({ setToken, token }) => {
  const [signupError, setSignupError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({ units: "imperial" });
  const [clickedNext, setClickedNext] = useState(false);
  const maxPage = 4;

  const nextPage = () => {
    if (!signupError) {
      setCurrentPage(currentPage + 1);
      setClickedNext(false);
    } else {
      setClickedNext(true);
    }
  };

  const prevPage = () => {
    setSignupError(false);
    setClickedNext(false);
    setCurrentPage(currentPage - 1);
  };

  const setActivityLevel = (activity) => {
    const data = formData;
    data.activitylevel = activity;
    setFormData(data);
  };

  const setWeightGoal = (goal) => {
    const data = formData;
    data.weightgoal = goal;
    setFormData(data);
  };

  const setHeight = (height) => {
    const data = formData;
    data.height = height;
    setFormData(data);
  };

  const setWeight = (weight) => {
    const data = formData;
    data.weight = weight;
    setFormData(data);
  };

  const setGoalWeight = (goalWeight) => {
    const data = formData;
    data.goalweight = goalWeight;
    setFormData(data);
  };

  const setSignupCreds = (creds) => {
    const data = formData;
    data.firstname = creds.firstname;
    data.lastname = creds.lastname;
    // data.dob = creds.dob;
    data.email = creds.email;
    data.password = creds.password;
    // data.gender = creds.gender;
    setFormData(data);
  };

  const setGender = (gender) => {
    const data = formData;
    data.gender = gender;
    setFormData(data);
  };

  const setDOB = (dob) => {
    const data = formData;
    data.dob = dob;
    setFormData(data);
  };

  const setUnits = (units) => {
    const data = formData;
    data.units = units;
    setFormData(data);
  };

  const sendSignupRequest = () => {
    AxiosInstance.post("api/users/signup", formData)
      .then((response) => {
        window.location = window.location.origin + '/auth/redirect';
        setSignupError(false);
      })
      .catch((error) => {
        console.error(error);
        setSignupError(true);
      });
  };

  const singupWithGoogle = () => {
    AxiosInstance.post("auth/google/signupdata", formData)
      .then((response) => {
        window.open(process.env.AXIOS_BASE_URL + "auth/google", "_self");
      })
      .catch((error) => {
        console.error(error);
        setSignupError(true);
      });
  };

  let page;

  switch (currentPage) {
    case 0:
      page = <ActivityLevelBox setActivityLevel={setActivityLevel} />;
      break;
    case 1:
      page = <WeightGoalBox setWeightGoal={setWeightGoal} />;
      break;
    case 2:
      page = (
        <HealthInfoBox
          setHeight={setHeight}
          setWeight={setWeight}
          setProfileUnits={setUnits}
          setGoalWeight={setGoalWeight}
          setSignupError={setSignupError}
        />
      );
      break;
    case 3:
      page = (
        <PersonalInfoBox
          setGender={setGender}
          setDOB={setDOB}
          setError={setSignupError}
        ></PersonalInfoBox>
      );
      break;
    case 4:
      page = (
        <SignupBox
          signupError={signupError}
          sendSignupRequest={sendSignupRequest}
          setSignupCreds={setSignupCreds}
          singupWithGoogle={singupWithGoogle}
        />
      );
      break;
    default:
      page = <div></div>;
      break;
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: PageLoadingMinHeight,
      }}
    >
      <Box
        sx={{
          marginTop: "10%",
          marginBottom: "10%",
          backgroundColor: "background.darkPaper",
          display: "flex",
          borderRadius: 2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignText: "center",
          boxShadow: 3,
        }}
      >
        {page}
        <Box
          sx={{
            display: "flex",
            borderRadius: 2,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            marginBottom: "5%",
          }}
        >
          {currentPage !== 0 ? (
            <Button
              onClick={() => {
                prevPage();
              }}
              sx={{
                width: "20%",
                marginRight: "5%",
                padding: 1,
                borderRadius: 2,
                backgroundColor: "primary.light",
              }}
            >
              Prev
            </Button>
          ) : (
            <div />
          )}
          {currentPage !== maxPage ? (
            <Button
              disabled={signupError && clickedNext}
              onClick={() => {
                nextPage();
              }}
              sx={{
                width: "20%",
                padding: 1,
                borderRadius: 2,
                backgroundColor: "primary.light",
              }}
            >
              Next
            </Button>
          ) : (
            <div />
          )}
        </Box>

        {signupError && clickedNext ? (
          <Typography variant="h6" sx={{ paddingBottom: "5%", color: "red" }}>
            Must fill out required fields
          </Typography>
        ) : (
          <div></div>
        )}
      </Box>
    </Container>
  );
};

export default CreateAccount;
