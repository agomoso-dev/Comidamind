import React, { useCallback, useContext, useEffect } from 'react';
import { StateContext } from '../../App';
import useRecipeList from '../../hooks/useRecipeList';
import RecipeList from './RecipeList';

function RecipeListSection ({fam, day}) {
    const  { nav, famId } = useContext(StateContext);
    const apiRes = useRecipeList();

    if (apiRes.loading) return <p>loading...</p>
    if (apiRes.error) return <p>ERROR: {apiRes.msg}</p>

    console.log('DataFetcherEatingToday apiRes.data' + apiRes.data)
    return (
        <>
          <RecipeList data={apiRes.data}/>
        </>
    )
}

export default RecipeListSection;