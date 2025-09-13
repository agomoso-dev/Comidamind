import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardActionArea, CardMedia, CardContent, Grid, Stack } from '@mui/material';
import { StateContext } from '../../App';

function FamilyMemberCard({member}) {
    const  { nav, famId } = useContext(StateContext);


    return (
        <Card component="span"
                sx={{  
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: '50%'
                }}>
                    
                <CardActionArea onClick={()=>{nav("/family/detaill")}} sx={{  
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'left'
                }}>
                        <img
                            src={member.picture}
                            alt={member.name}
                            loading="lazy"
                            height="200px"
                            weight="200px"
                            alignSelf='left'
                        />
                    
                        <Stack direction="column" spacing={2}
                            sx={{
                                justifyContent: "center",
                            }}
                        >
                            <Typography variant="h4" component="h4">
                                {member.name}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <Typography variant="p" component="p">
                                        weight: {member.weight}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="p" component="p">
                                        height: {member.height}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="p" component="p">
                                        sedentarism: {member.sedentarism}
                                    </Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography variant="p" component="p">
                                        objective: {member.objective}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Stack>
                </CardActionArea>
                <Stack direction="column" spacing={2}
                    sx={{
                        justifyContent: "center",
                    }}
                >
                    <Button variant="contained" onClick={()=>{nav("/family/update")}}>
                        update
                    </Button>
                    <Button variant="contained" onClick={()=>{nav("/family/delete")}}>
                        Delete
                    </Button>
                    {/* {todo: change this link with filtered recipe list by family Member id} */}
                    <Button variant="contained" onClick={()=>{nav("/family")}}>
                        Recipes
                    </Button>
                </Stack>
        </Card>
    )

}

export default FamilyMemberCard