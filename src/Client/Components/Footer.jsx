import React from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Outlet } from "react-router-dom";



/*
<Grid>
    <Grid item xs={12} sm={4}>
        <Link>Contact Us</Link>
    </Grid>
</Grid>
*/

function Footer() {
    return (
        <div>
            <Outlet />
            <Container maxWidth="false" sx={{
                bgcolor: "primary.main",
                textAlign: "center",
            }}>
                <Grid container
                    alignItems="center"
                    justifyContent="center"
                    spacing={0}
                    sx={{
                        paddingTop: "20px"
                    }}>
                    <Grid item xs={1}>
                        <Link color="inherit" underline="always" href="https://github.com/cscopetski">
                            Caleb Scoptetski
                        </Link>

                    </Grid>

                    <Grid item xs={1}>
                        <Link color="inherit" underline="always" href="https://github.com/eferrabelo1114">
                            Ethan Ferrabelo
                        </Link>
                    </Grid>
                </Grid>

                <Typography sx={{
                    paddingTop: "20px",
                    paddingBottom: "20px"
                }}>
                    © 2022 RNSM, Co.
                </Typography>


            </Container>

        </div>
    );
}


export default Footer;
