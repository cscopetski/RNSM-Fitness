import React from 'react'
import ProfilePicture from "./ProfilePicture.jsx";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const defaultPFP = ""

function ProfileFriend() {
  return (
    <Container disableGutters sx={{
      textAlign: 'center'
    }}>
      {/* pfp */}
      <ProfilePicture borderRadius="0px" width="5em" height="5em" imgsrc={defaultPFP} />

      {/* Name */}
      <Typography variant='caption' sx={{
        fontFamily: 'Arial',
        color: '#ffffff'
      }}>
        Ethan Ferrabelo
      </Typography>
    </Container>
  )
}

export default ProfileFriend