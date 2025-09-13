
import React, { useState } from 'react'
import './App.css'
import Footer from './components/navigation/Footer';
import Header from './components/navigation/Header';

import { Route, Routes, useNavigate, useLocation } from 'react-router-dom'
import PgHome from './Pages/RegularPages/PgHome';
import PgLogin from './Pages/LogPages/PgLogin';
import PgRegister from './Pages/LogPages/PgRegister';
import PgWellcome from './Pages/LogPages/PgWellcome';
import LogPageWraper from './Pages/LogPages/LogPageWrapper';
import PageWraper from './Pages/RegularPages/PageWrapper';
import PgFamily from './Pages/RegularPages/PgFamily';
import PgRecipe from './Pages/RegularPages/PgRecipe';
import PgHelp from './Pages/RegularPages/PgHelp';
import FormAddFamilyMember from './forms/family/FormAddFamilyMember';
import PgPwRecovery from './Pages/LogPages/PgPwRecovery';
import FormUpdateFamilyMember from './forms/family/FormUpdateFamilyMember';
import FormDeleteFamilyMember from './forms/family/FormDeleteFamilyMember';
import FormInviteFamilyMember from './forms/family/FormInviteFamilyMember';
import FormAddRecipe from './forms/recipe/FormAddRecipe';
import FormUpdateRecipe from './forms/recipe/FormUpdateRecipe';
import FormDeleteRecipe from './forms/recipe/FormDeleteRecipe';
import FormFilterRecipe from './forms/recipe/FormFilterRecipe';
import PgFilteredRecipes from './Pages/RegularPages/PgFilteredRecipes';
import PgRecipeDetaill from './Pages/RegularPages/PgRecipeDetaill';
import PgFamilyMemberDetaill from './Pages/RegularPages/PgFamilyMemberDetaill';
import PgMenuDetaill from './Pages/RegularPages/PgMenuDetaill';
import PgAllMenuList from './Pages/RegularPages/PgAllMenuList';
import FormContact from './forms/help/FormContact';
import PgLimitedFood from './Pages/RegularPages/PgLimitedFood';
import PgExercise from './Pages/RegularPages/PgExercise';

export const StateContext = React.createContext();

function App() {

  const myUseNavigate = useNavigate();
  const location = useLocation();

  const nav = (link) => {
    const currentUrl = window.location.href;
    //console.log(currentUrl);
    //console.log(location.origin);
    console.log(location.pathname);
    //console.log(location.search);
    myUseNavigate(link);
  } 

  const [famId, setfamId] = useState(null);
  const [recipeId, setRecipeId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [userName, setUserName ] = useState("");
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = React.useState('');

  return (
    <StateContext.Provider  value={
            {nav, 
            userName, setUserName, 
            famId, setfamId,
            userLastName, setUserLastName,
            userEmail, setUserEmail,
            recipeId, setRecipeId,
            menuId, setMenuId,
           }
        }>
          <Routes>
            <Route path="/" element={ <LogPageWraper page={<PgWellcome/>}/>} />
            <Route path="/login" element={ <LogPageWraper page={<PgLogin/>}/> } />
            <Route path="/register" element={ <LogPageWraper page={<PgRegister/>}/> } />
            <Route path="/pwrecovery" element={ <LogPageWraper page={<PgPwRecovery/>}/> } />

            <Route path="/home" element={ <PageWraper page={<PgHome/>}/> } />
            <Route path="/menu/detaill" element={ <PageWraper page={<PgMenuDetaill/>}/> } />
            <Route path="/menu/all" element={ <PageWraper page={<PgAllMenuList/>}/> } />

            <Route path="/help" element={ <PageWraper page={<PgHelp/>}/> } />
            <Route path="/contact" element={ <PageWraper page={<FormContact/>}/> } />
            
            <Route path="/recipe" element={ <PageWraper page={<PgRecipe/>}/> } />
            <Route path="/recipe/add" element={ <PageWraper page={<FormAddRecipe/>}/> } />
            <Route path="/recipe/update" element={ <PageWraper page={<FormUpdateRecipe/>}/> } />
            <Route path="/recipe/delete" element={ <PageWraper page={<FormDeleteRecipe/>}/> } />
            <Route path="/recipe/filter" element={ <PageWraper page={<FormFilterRecipe/>}/> } />
            <Route path="/recipe/filter/res" element={ <PageWraper page={<PgFilteredRecipes/>}/> } />
            <Route path="/recipe/detaill" element={ <PageWraper page={<PgRecipeDetaill/>}/> } />


            <Route path="/family" element={ <PageWraper page={<PgFamily/>}/> } />
            <Route path="/family/add" element={ <PageWraper page={<FormAddFamilyMember/>}/> } />
            <Route path="/family/update" element={ <PageWraper page={<FormUpdateFamilyMember/>}/> } />
            <Route path="/family/delete" element={ <PageWraper page={<FormDeleteFamilyMember/>}/> } />
            <Route path="/family/invite" element={ <PageWraper page={<FormInviteFamilyMember/>}/> } />
            <Route path="/family/detaill" element={ <PageWraper page={<PgFamilyMemberDetaill/>}/> } />
            <Route path="/family/limitedfood" element={ <PageWraper page={<PgLimitedFood/>}/> } />
            <Route path="/family/exercise" element={ <PageWraper page={<PgExercise/>}/> } />

        </Routes >
    </StateContext.Provider>
  );
}

export default App;