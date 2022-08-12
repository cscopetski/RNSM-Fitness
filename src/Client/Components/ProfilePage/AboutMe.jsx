import React from 'react'
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';

import { convertDateToString } from '../../lib/Date.js';


function AboutMe({ description, dob, location }) {
    if (dob !== undefined) {
        dob = convertDateToString(dob);
    }

    return (
        <Container maxWidth="false" sx={{
            backgroundColor: 'background.darkPaper',
            boxShadow: 4,
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            {/* Title */}
            <Typography variant='h5' sx={{
                textAlign: 'center',
                fontFamily: 'Arial',
                color: '#ffffff',
            }}>
                About me
            </Typography>

            {/* Content */}
            <Container disableGutters maxWidth="false" sx={{
                textAlign: 'left'
            }}>
                {/* Desc */}
                <Typography variant='body1' sx={{
                    fontFamily: 'Arial',
                    color: '#ffffff',
                }}>
                    {description}
                </Typography>

                {/* Line */}
                <Box sx={{
                    clear: 'both',
                    height: '0.1em',
                    marginBottom: '0.8em',
                    backgroundColor: 'white'
                }} />

                {/* Location, if it exists */}
                {
                    (location !== undefined) ?
                        <Typography variant='body2' sx={{
                            fontFamily: 'Arial',
                            color: '#d5d5cb'
                        }}>
                            From Plains, Montana
                        </Typography>
                        : undefined
                }

                {/* Birthday, if it exists */}
                {
                    (dob !== undefined) ?
                        <Typography variant='body2' sx={{
                            fontFamily: 'Arial',
                            color: '#d5d5cb'
                        }}>
                            {"Born on " + dob}
                        </Typography>
                        : undefined
                }
            </Container>
        </Container>
    )
}

export default AboutMe