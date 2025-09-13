import React, { useCallback, useContext, useEffect } from 'react';
import { StateContext } from '../../App';
import FamilyMemberList from './FamilyMemberList';
import useFamilyMemberList from '../../hooks/useFamilyMemberList';

function FamilyMemberListSection ({fam, day}) {
    const  { nav, famId } = useContext(StateContext);
    const apiRes = useFamilyMemberList();

    if (apiRes.loading) return <p>loading...</p>
    if (apiRes.error) return <p>ERROR: {apiRes.msg}</p>

    console.log('DataFetcherEatingToday apiRes.data' + apiRes.data)
    return (
        <>
          <FamilyMemberList data={apiRes.data}/>
        </>
    )
}

export default FamilyMemberListSection;