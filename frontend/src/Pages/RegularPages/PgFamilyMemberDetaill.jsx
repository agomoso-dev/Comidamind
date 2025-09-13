import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import Typography from '@mui/material/Typography';
import { Button, Grid, IconButton, Stack } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import RecipeFilterSection from '../../components/recipe/RecipeFilterSection';
import RecipeListSection from '../../components/recipe/RecipeListSection';
import FamilyMemberDetaillSection from '../../components/family_member_detaill/FamilyMemberDetailSection';
import useFamilyMemberDetaill from '../../hooks/useFamilyMemberDetaill';

function PgFamilyMemberDetaill() {
    const  { nav, famId } = useContext(StateContext);
    const  apiRes = useFamilyMemberDetaill();
    return (
          <FamilyMemberDetaillSection apiRes={apiRes}></FamilyMemberDetaillSection>
  )
}

export default PgFamilyMemberDetaill;