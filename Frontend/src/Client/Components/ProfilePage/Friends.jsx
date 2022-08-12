import React from 'react'
import ProfileFriend from './ProfileFriend.jsx';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Friends({ friends }) {
    
  return (
    <Container disableGutters sx={{
        backgroundColor: '#645f5f',
        marginTop: '1em',
        boxShadow: 4,
        borderRadius: '10px'
    }}>
        <Container disableGutters>
            {/* Title of Box */}
            <Typography variant='h5' sx={{
                textAlign: 'center',
                fontFamily: 'Arial',
                color: '#ffffff'
            }}>
                Friends
            </Typography>

            {/* Box Content */}
            {
                (friends !== undefined) ? 
                <Container disableGutters sx={{
                    marginTop: '1em'
                }}>
                    <Grid container spacing={2}  sx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        {/* Friend Component */}
                        <Grid item xs={3.5}>
                            <ProfileFriend />
                        </Grid>
                    </Grid>
                </Container>
                : undefined
            }
        </Container>
    </Container>
  )
}

export default Friends