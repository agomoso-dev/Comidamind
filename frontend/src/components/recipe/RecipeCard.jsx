import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Card, List, ListItem, CardActionArea, CardMedia, CardContent, Paper, Grid, Stack } from '@mui/material';
import { StateContext } from '../../App';

function RecipeCard({recipe}) {
    const  { nav, setRecipeId } = useContext(StateContext);
    
        const handleClick = (link) => {
            setRecipeId(recipe.id)
            nav(link)
        }
        
        const displaycategories= (recipe)=>{ if(recipe.categoryList!=null){
                    <Grid size={6} >
                    <Stack direction="column" spacing={2}
                        sx={{
                            justifyContent: "center"
                        }}
                    >
                        <Typography variant="h5" component="h5" 
                            sx={{
                                justifyContent: "center",
                                alignItems: "stretch",
                            }}>
                            Categories
                        </Typography>
                        <List>
                        {
                            recipe.categoryList.map(category => 
                                <ListItem>{category}</ListItem>
                            )
                        }
                        </List>
                    </Stack>
                </Grid>
            }else{
                return null;
            }
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
                            <Typography variant="h4" component="h4" 
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "stretch",
                                }}>
                                {recipe.name}
                            </Typography>
                            <Button variant="contained" index={4} onClick={()=>{handleClick("/recipe/delete")}}>
                                save/Delete
                            </Button>
                            <Button variant="contained" index={4} onClick={()=>{handleClick("/recipe/update")}}>
                                Update
                            </Button>
                        </Stack>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <Stack direction="column" spacing={2}
                                    sx={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="h5" component="h5" 
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "stretch",
                                        }}>
                                        Ingredients
                                    </Typography>
                                    <List>
                                    {
                                        recipe.ingredientList.map(ingredient => 
                                            <ListItem>{ingredient.name} {ingredient.cuantity} {ingredient.unit} </ListItem>
                                        )
                                    }
                                    </List>
                                </Stack>
                            </Grid>
                            <Grid size={6}>
                                <img
                                    src={recipe.picture}
                                    alt={recipe.name}
                                    loading="lazy"
                                    height="300px"
                                    weight="300px"
                                    alignSelf='left'
                                />
                            </Grid>
                            <Grid size={12}>
                                <Stack direction="column" spacing={2}
                                    sx={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="h5" component="h5" 
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "stretch",
                                        }}>
                                        Steps
                                    </Typography>
                                    <List>
                                    {
                                        recipe.stepList.map(step => 
                                            <ListItem>{step}</ListItem>
                                        )
                                    }
                                    </List>
                                </Stack>
                            </Grid>
                            {displaycategories}
                            <Grid size={6}>
                                <Stack direction="column" spacing={2}
                                    sx={{
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography variant="h5" component="h5" 
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "stretch",
                                        }}>
                                        Dinners:
                                    </Typography>
                                    <Typography variant="p" component="p" 
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "stretch",
                                        }}>
                                        {recipe.diners}
                                    </Typography>
                                    <Typography variant="h5" component="h5" 
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "stretch",
                                        }}>
                                        Time expected:
                                    </Typography>
                                    <Typography variant="p" component="p" 
                                        sx={{
                                            justifyContent: "center",
                                            alignItems: "stretch",
                                        }}>
                                        {recipe.timeExpeted}
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                </Stack>
            </Card>
    )

}

export default RecipeCard;