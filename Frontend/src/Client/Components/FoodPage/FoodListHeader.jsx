import React from "react";
import Box from "@mui/material/Box";
import FoodHeaderButton from "./FoodHeaderButton";

function FoodListHeader({ changeSort, sort }) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          width: "100%",
          paddingLeft: 1,
          paddingRight: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                width: "40%",
              }}
            >
              <FoodHeaderButton
                name="Name"
                value="name"
                changeSort={changeSort}
                sort={sort}
              ></FoodHeaderButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "25%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FoodHeaderButton
                    name="Carbs"
                    units="(g)"
                    value="carbs"
                    changeSort={changeSort}
                    sort={sort}
                  ></FoodHeaderButton>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "25%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FoodHeaderButton
                    name="Fat"
                    units="(g)"
                    value="fat"
                    changeSort={changeSort}
                    sort={sort}
                  ></FoodHeaderButton>
                </Box>
              </Box>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "25%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FoodHeaderButton
                    name="Protein"
                    units="(g)"
                    value="protein"
                    changeSort={changeSort}
                    sort={sort}
                  ></FoodHeaderButton>
                </Box>
              </Box>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "25%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <FoodHeaderButton
                    name="Calories"
                    units="(kcal)"
                    value="calories"
                    changeSort={changeSort}
                    sort={sort}
                  ></FoodHeaderButton>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "10%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <FoodHeaderButton
                  name="Serving"
                  units="(g)"
                  value="serving_size"
                  changeSort={changeSort}
                  sort={sort}
                ></FoodHeaderButton>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "10%",
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default FoodListHeader;
