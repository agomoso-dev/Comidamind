import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, List, Checkbox, ListItem, ListItemIcon, ListItemText, ListItemButton, CardActionArea, CardMedia, CardContent, Paper, Grid, Stack } from '@mui/material';


import { StateContext } from '../../App';

function FamilyMemberDetaill({data}) {
    const  { nav, setRecipeId } = useContext(StateContext);
    

    return (
        <Stack direction="column" spacing={2} 
                    sx={{
                        justifyContent: "center",
                        alignItems:'center',
                    }}
            >
            <Stack direction="row" spacing={2} 
                        sx={{
                            justifyContent: "center",
                            alignItems:'center',
                        }}
                >
                <img
                    src={data.member.picture}
                    alt={data.member.name}
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
                        {data.member.name}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <Typography variant="h5" component="h5">
                                weight:
                            </Typography>
                            <Typography variant="p" component="p">
                                {data.member.weight} {data.member.weightUnit}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h5" component="h5">
                                height:
                            </Typography>
                            <Typography variant="p" component="p">
                                {data.member.height} {data.member.heightUnit}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h5" component="h5">
                                sedentarism:
                            </Typography>
                            <Typography variant="p" component="p">
                                {data.member.sedentarism}
                            </Typography>
                        </Grid>
                        <Grid size={6}>
                            <Typography variant="h5" component="h5">
                                objective:
                            </Typography>
                            <Typography variant="p" component="p">
                                {data.member.objective}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="h5" component="h5">
                                Meals:
                            </Typography>
                            <List sx={{ width: '100%', maxWidth: 360 }}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        checked={data.member.breakfast}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>breakfast</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        checked={data.member.snack1}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>snack1</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        checked={data.member.lunch}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>lunch</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        checked={data.member.snack2}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>snack2</ListItemText>
                                </ListItem>
                                <ListItem>
                                    <ListItemIcon>
                                        <Checkbox
                                        edge="start"
                                        checked={data.member.dinner}
                                        />
                                    </ListItemIcon>
                                    <ListItemText>dinner</ListItemText>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Stack>
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
                
            </Stack>
            <Stack direction="row" spacing={2}
                    sx={{
                        justifyContent: "center",
                    }}
                >
                <Button variant="contained" onClick={()=>{nav("/family/limitedfood")}}>
                    Limited Food
                </Button>
                <Button variant="contained" onClick={()=>{nav("/family/exercise")}}>
                    Exercise
                </Button>
            </Stack>
        </Stack>
    )

}

export default FamilyMemberDetaill;