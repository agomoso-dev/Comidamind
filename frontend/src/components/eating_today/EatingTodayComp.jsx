import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import MenuPreviewCard from './MenuPreviewCard';

function EatingTodayComp({data}) {
    console.log('problem here: ' + data)
    console.log(data.famMemberList)
    
    //const columnSize = 12/data.foodMomentList.length

    return (
        <Grid container spacing={5} columns={data.famMemberList.length} 
                sx={{ justifyContent: "space-between",}}>
            {
                data.famMemberList.map(famMember => 
                    <Grid size={1}>
                        <Stack direction="column" spacing={2} 
                            sx={{
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h4" component="h4">
                                {famMember.membername}
                            </Typography>
                            <MenuPreviewCard state={famMember.breakfast}  menu={'breakfast'} idmenu={famMember.idbreakfast}></MenuPreviewCard>
                            <MenuPreviewCard state={famMember.snack1}  menu={'snack1'} idmenu={famMember.idsnack1}></MenuPreviewCard>
                            <MenuPreviewCard state={famMember.lunch}  menu={'lunch'} idmenu={famMember.idlunch}></MenuPreviewCard>
                            <MenuPreviewCard state={famMember.snack2}  menu={'snack2'} idmenu={famMember.idsnack2}></MenuPreviewCard>
                            <MenuPreviewCard state={famMember.dinner}  menu={'dinner'} idmenu={famMember.iddinner}></MenuPreviewCard>
                        </Stack>
                        
                    </Grid>
                )
            }
        </Grid>
    )
}

export default EatingTodayComp