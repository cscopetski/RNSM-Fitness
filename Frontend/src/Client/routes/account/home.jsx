import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import DailyHealthBox from "../../Components/ProfilePage/DailyHealthBox";
import NotFound from "../NotFound";
import { Box, Button, Collapse } from "@mui/material";
import { getDate } from "../../lib/Date.js";
import {
  getUser,
  updateDailyLog,
  getHealthProfile,
  getDailyLog,
} from "../../lib/User.js";
import DailyFoodLog from "../../Components/DailyFoodLog/DailyFoodLog";
import DateSelection from "../../Components/DailyFoodLog/DateSelection";
import { getDailyFoodLog } from "../../lib/daily_food_log";
import { DailyMacroCharts } from "../../Components/HomePage/DailyMacroCharts";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { PageLoadingMinHeight } from "../../lib/Loading";

const Home = ({ token, setToken }) => {
  const [user, setUser] = useState(undefined);
  const [dailyLogData, setDailyLogData] = useState(undefined);
  const [healthProfileData, setHealthProfileData] = useState(undefined);
  const [date, setDate] = useState(new Date());
  const [foods, setFoods] = useState();
  const [refresh, setRefresh] = useState(0);
  const [openCharts, setOpenCharts] = useState(true);

  const updateWeight = (data) => {
    updateDailyLog(data, getDate(date));
    handleRefresh();
  };

  const handleOpenCharts = () => {
    setOpenCharts(!openCharts);
  };

  const handleRefresh = () => {
    if (refresh >= 100) {
      setRefresh(0);
    } else {
      setRefresh(refresh + 1);
    }
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        setUser(data);
        if (token === undefined) {
          setToken(data.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    getHealthProfile(getDate(date))
      .then((data) => {
        setHealthProfileData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    getDailyFoodLog(getDate(date))
      .then((foodsData) => {
        setFoods(foodsData);
        getDailyLog(getDate(date))
          .then((data) => {
            setDailyLogData(data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });

  }, [date, refresh]);

  if (
    dailyLogData === undefined ||
    healthProfileData === undefined ||
    user === undefined
  ) {
    //probably want to just return empty data instead

    return (
      <>
        <Loading minHeight={"1000px"} />
      </>
    );
  }

  if (user === false) {
    return <NotFound />;
  } else if (user === undefined) {
    return (
      <>
        <Loading minHeight={"1000px"} />
      </>
    );
  }

  return (
    <main>
      <div>
        <Container maxWidth="lg" sx={{
          minHeight: PageLoadingMinHeight
        }}>
          <Box
            sx={{
              marginTop: "5%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DateSelection date={date} setDate={setDate}></DateSelection>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "flex-end",
              }}
            >
              <Button onClick={handleOpenCharts} sx={{ alignSelf: "flex-end" }}>
                {openCharts ? "Hide" : "Show"} Charts
                {openCharts ? <ExpandLess /> : <ExpandMore />}
              </Button>
            </Box>
            <Collapse in={openCharts} sx={{ marginBottom: 5 }}>
              <DailyMacroCharts macroGoals={dailyLogData}></DailyMacroCharts>
            </Collapse>

            <DailyFoodLog
              foods={foods}
              date={date}
              reload={handleRefresh}
            ></DailyFoodLog>

            <Box sx={{ marginTop: 10, width: "75%" }}>
              <DailyHealthBox
                initial_weight={healthProfileData.initial_weight}
                currentWeight={dailyLogData.weight_results}
                updateDailyLog={updateWeight}
                units={user.units}
              ></DailyHealthBox>
            </Box>
            <Box
              sx={{
                marginBottom: "5%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "75%",
                paddingRight: "5%",
                paddingLeft: "5%",
              }}
            >
              <Button
                component={Link}
                to="/account/settings/diet"
                variant="contained"
                color="primary"
                sx={{
                  width: "40%",
                }}
              >
                Change Diet
              </Button>
              <Button
                component={Link}
                to="/account/settings/fitness"
                variant="contained"
                color="primary"
                sx={{
                  width: "40%",
                }}
              >
                Re-Calculate Diet
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </main>
  );
};

export default Home;
