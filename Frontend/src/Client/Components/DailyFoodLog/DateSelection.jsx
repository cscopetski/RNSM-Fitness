import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import React from "react";
import { Box } from "@mui/system";
import {
  addDaysToDate,
  convertDateToString,
  getDate,
  getDayofWeek,
} from "../../lib/Date";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const DateSelection = ({ date = "", setDate = () => { } }) => {
  const handleSubtractDate = () => {
    setDate(addDaysToDate(date, -1));
  };

  const handleAddDate = () => {
    setDate(addDaysToDate(date, 1));
  };

  return (
    <Box
      sx={{
        paddingTop: "2.5%",
        paddingBottom: "2.5%",
        display: "flex",
        width: "60%",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        bgcolor: "background.darkPaper",
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      <TextField
        type="date"
        name="dob"
        id="dob"
        value={getDate(date)}
        label="Date"
        variant="filled"
        InputLabelProps={{ shrink: true }}
        InputProps={{ disableUnderline: true }}
        onChange={(e) => setDate(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignText: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Button
            onClick={(e) => handleSubtractDate()}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignText: "center",
            }}
          >
            <ArrowBackIosIcon></ArrowBackIosIcon>
          </Button>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              paddingTop: "2%",
            }}
          >
            {getDayofWeek(date)}, {convertDateToString(date)}
          </Typography>

          <Button
            onClick={(e) => handleAddDate()}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignText: "center",
            }}
          >
            <ArrowForwardIosIcon></ArrowForwardIosIcon>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default DateSelection;
