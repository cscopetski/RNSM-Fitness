import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import PasswordReset from "../../Components/SettingsPage/PasswordReset";
import EmailChange from "../../Components/SettingsPage/EmailChange";
import UnitsChange from "../../Components/SettingsPage/UnitsChange";
import Loading from "../../Components/Loading";
import FitnessProfileChange from "../../Components/SettingsPage/FitnessProfileChange";
import BirthdayChange from "../../Components/SettingsPage/BirthdayChange";
import SexChange from "../../Components/SettingsPage/SexChange";
import DietChange from "../../Components/SettingsPage/DietChange";
import { getDate } from "../../lib/Date.js";
import {
  getUser,
  updateDailyLog,
  getHealthProfile,
  getDailyLog,
} from "../../lib/User.js";
import { Person } from "@mui/icons-material";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import PasswordIcon from "@mui/icons-material/Password";
import { PageLoadingMinHeight } from "../../lib/Loading";

const buttonTheme = {
  backgroundColor: "primary.main",
  marginTop: "0.5%",
  marginBottom: "0.5%",
  borderRadius: "4px",
  padding: 2,
  justifyContent: "flex-start",
  borderLeft: 5,
  borderColor: "text.primary",
};

const buttonThemePressed = {
  backgroundColor: "primary.main",
  marginTop: "1%",
  marginBottom: "1%",
  borderRadius: "4px",
  padding: 2,
  justifyContent: "flex-start",
  borderLeft: 5,
  borderColor: "primary.main",
};

const AccountSettings = () => {
  let { setting } = useParams();
  const navigate = useNavigate();
  const [curSetting, setCurSetting] = useState(setting || "general");
  const [foundUser, setUserFound] = useState(undefined);
  const [settingPage, setSettingPage] = useState(undefined);
  const [healthProfileData, setHealthProfileData] = useState(undefined);

  const setPage = (inputSetting) => {
    switch (inputSetting) {
      case "general":
        setSettingPage(
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">General Settings</Typography>
            <EmailChange currEmail={foundUser.email} />
            <UnitsChange currUnits={foundUser.units} />
            <BirthdayChange
              currDOB={getDate(new Date(foundUser.dob))}
            ></BirthdayChange>
            <SexChange currSex={foundUser.gender}></SexChange>
          </Box>
        );

        break;
      case "password":
        setSettingPage(
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Change Password</Typography>
            <PasswordReset></PasswordReset>
          </Box>
        );
        break;
      case "diet":
        setSettingPage(
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4">Change Diet Profile</Typography>
            <DietChange
              healthProfileData={healthProfileData}
              currProteinPercent={healthProfileData.protein_goal_ratio}
              currCarbPercent={healthProfileData.carb_goal_ratio}
              currFatPercent={healthProfileData.fat_goal_ratio}
              currTotalCalories={healthProfileData.calorie_goal}
            ></DietChange>
          </Box>
        );
        break;
      case "fitness":
        setSettingPage(
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" align="center">
              Change Health Profile
            </Typography>
            <FitnessProfileChange
              healthProfileData={healthProfileData}
              currUnits={foundUser.units}
            ></FitnessProfileChange>
          </Box>
        );
        break;
      default:
        setSettingPage(
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <EmailChange />
            <UnitsChange currUnits={foundUser.units} />
            <BirthdayChange
              currDOB={getDate(new Date(foundUser.dob))}
            ></BirthdayChange>
            <SexChange currSex={foundUser.gender}></SexChange>
          </Box>
        );
        break;
    }
  };

  const handleChange = (e) => {
    let setting = e.target.value;

    if (setting !== curSetting) {
      navigate("/account/settings/" + setting);
      setCurSetting(setting);
    }
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserFound(data);
        getHealthProfile().then((healthData) => {
          setHealthProfileData(healthData);
        });
      })
      .then(() => {
        if (foundUser === undefined || healthProfileData === undefined) {
          return (
            <>
              <Loading />
            </>
          );
        } else {
          setPage(curSetting);
        }
      });
  }, [curSetting]);

  if (foundUser === undefined || healthProfileData === undefined) {
    return (
      <>
        <Loading minHeight={"1000px"} />
      </>
    );
  } else if (settingPage === undefined) {
    setPage(curSetting);
  }

  return (
    <div>
      <main>
        <div>
          <Container
            maxWidth="lg"
            sx={{
              minHeight: PageLoadingMinHeight,
            }}
          >
            <Box
              sx={{
                marginTop: "5%",
                display: "flex",
                flexDirection: "row",
                margin: "5%",
              }}
            >
              <Box
                overflow={"auto"}
                sx={{
                  bgcolor: "background.darkPaper",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "top",
                  justifyContent: "top",
                  padding: 2,
                  width: "30%",
                  marginRight: "2.5%",
                  borderRadius: 2,
                  maxHeight: 277,
                  boxShadow: 4,
                }}
              >
                <Button
                  value="general"
                  variant="filled"
                  onClick={(e) => handleChange(e)}
                  startIcon={<Person />}
                  sx={
                    curSetting === "general" ? buttonTheme : buttonThemePressed
                  }
                >
                  General
                </Button>

                <Button
                  variant="filled"
                  value="fitness"
                  onClick={(e) => handleChange(e)}
                  startIcon={<HealthAndSafetyIcon />}
                  sx={
                    curSetting === "fitness" ? buttonTheme : buttonThemePressed
                  }
                >
                  Health Profile
                </Button>
                <Button
                  variant="filled"
                  value="diet"
                  onClick={(e) => handleChange(e)}
                  startIcon={<FoodBankIcon />}
                  sx={curSetting === "diet" ? buttonTheme : buttonThemePressed}
                >
                  Diet Profile
                </Button>
                <Button
                  variant="filled"
                  value="password"
                  onClick={(e) => handleChange(e)}
                  startIcon={<PasswordIcon />}
                  sx={
                    curSetting === "password" ? buttonTheme : buttonThemePressed
                  }
                >
                  Password
                </Button>
              </Box>
              <Box
                sx={{
                  bgcolor: "background.darkPaper",
                  // border: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  justifyContent: "left",
                  padding: 1,
                  width: "70%",
                  borderRadius: 2,
                  boxShadow: 4,
                }}
              >
                {settingPage}
              </Box>
            </Box>
          </Container>
        </div>
      </main>
    </div>
  );
};

export default AccountSettings;
