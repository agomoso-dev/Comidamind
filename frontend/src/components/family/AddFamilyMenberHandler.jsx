import React, { useCallback, useContext, useEffect } from 'react';
import { StateContext } from '../../App';
import useAddFamilyMember from '../../hooks/useAddFamilyMember';

function AddFamilyMemberHandler ({data}) {
    const  {nav, } = useContext(StateContext);

    let registerRes = useAddFamilyMember(data);

    if (registerRes.loading) return <p>loading...</p>
    if (registerRes.error) return <p>ERROR!: {registerRes.msg}</p>
    
    return nav("/family")
}

export default AddFamilyMemberHandler;