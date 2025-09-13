import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, CardActionArea, CardMedia, CardContent, Paper, Grid, Stack } from '@mui/material';
import { StateContext } from '../../App';

function RecipePreviewCard({recipe}) {
    const  { nav, famId, setRecipeId} = useContext(StateContext);

    const handleClick = (link) => {
        setRecipeId(recipe.id)
        nav(link)
    }
    return (
        <Card 
            sx={{ 
                padding: '5%',
                width: '100%',
                height: '100%',
            }}>

                <Stack direction="column" spacing={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "stretch",
                    }}
                >
                    <Stack direction="row" spacing={2}
                            sx={{
                                justifyContent: "center",
                            }}
                        >
                        <Button variant="contained" index={4} onClick={()=>{handleClick("/recipe/delete")}}>
                            Delete
                        </Button>
                        <Button variant="contained" index={4} onClick={()=>{handleClick("/recipe/update")}}>
                            Update
                        </Button>
                    </Stack>
                    <CardActionArea onClick={()=>{handleClick("/recipe/detaill")}} 
                        sx={{ 
                            width: '100%',
                            height: '100%',
                            justifyContent: "center",
                            alignItems: "stretch",
                        }}>
                        <CardMedia
                        component="img"
                        width="100%" height="100%"
                        image={recipe.picture}
                        alt={recipe.name}
                        loading="lazy"
                        />
                        <CardContent 
                            sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: "center",
                                alignItems: "stretch",
                            }}>
                            <Typography variant="h5" component="h5" 
                            sx={{
                                width: '100%',
                                height: '100%',
                                justifyContent: "center",
                                alignItems: "stretch",
                            }}>
                                {recipe.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Stack>
        </Card>
    )

}

export default RecipePreviewCard;