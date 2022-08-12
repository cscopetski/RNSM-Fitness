import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";
import ProfileSettings from "./ProfileSettings.jsx";
import { useState, useEffect } from "react";
import ProfilePicture from "./ProfilePicture.jsx";
import { convertDateToString } from '../../lib/Date.js';

function ProfileHeader({ firstName, lastName, pfpImage, token, profileId, joined, description }) {
    const [profilePicture, setProfilePicture] = useState(pfpImage);

    if (joined !== undefined) {
        joined = convertDateToString(joined);
    }

    return (
        <Container disableGutters maxWidth="lg" sx={{
            display: 'flex',
            paddingTop: '2%',
            bgcolor: "primary.main",
            justifyContent: 'center'
        }}>
            {/* Profile Picture */}
            <Container disableGutters maxWidth="false" sx={{
                maxWidth: '22em',
                marginBottom: '1em'
            }}>
                <ProfilePicture borderRadius="50%" width="20em" height="20em" imgsrc={profilePicture} />
            </Container>

            {/* Rest */}
            <Container disableGutters maxWidth="lg">
                {/* Name/Member Since */}
                <Container disableGutters maxWidth="lg" sx={{
                    paddingTop: '3em',
                    paddingRight: '1em'
                }}>
                    <Typography noWrap variant="h1" sx={{
                        fontFamily: 'Arial',
                        color: 'white'
                    }}>
                        {firstName} {lastName}
                    </Typography>

                    <Typography noWrap variant='subtitle1' sx={{
                        fontFamily: 'Arial',
                        fontStyle: 'italic',
                        color: '#b4b0b0',
                        position: 'relative',
                        bottom: '1.2em',
                        left: '0.3em'
                    }}>
                        {"Member Since " + joined}
                    </Typography>
                </Container>


                <Container disableGutters maxWidth="lg" sx={{
                    paddingTop: '3em',
                }}>
                    {
                        (token === profileId) ?
                            <ProfileSettings setProfilePicture={setProfilePicture} pfp={profilePicture} currentDescription={description} /> :
                            undefined
                    }



                    <Box sx={{
                        clear: 'both',
                        height: '0.1em',
                        backgroundColor: 'white'
                    }} />
                </Container>




                {/* Profile Navigation */}
                <Container maxWidth="lg" disableGutters sx={{
                    backgroundColor: 'red',
                    fontFamily: 'Arial',
                    color: 'white',
                    bgcolor: "primary.main",
                    paddingTop: '0.4em'
                }}>

                    <Button type="submit" disableRipple variant="text" sx={{
                        color: "white",
                        backgroundColor: "primary.main",
                        width: '8em',
                        height: '4em',
                        '&:hover': {
                            backgroundColor: "background.darkPaper"
                        }
                    }}>
                        <Typography noWrap sx={{
                            fontFamily: 'Arial',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            fontSize: '1.5em'
                        }}>
                            HOME
                        </Typography>
                    </Button>
                </Container>
            </Container>
        </Container>
    );
}

export default ProfileHeader;
