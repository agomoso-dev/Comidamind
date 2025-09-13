import React, { useState, useContext } from 'react';
import { StateContext } from '../../App';

import FamilyMemberDetaill from './FamilyMemberDetaill';

function FamilyMemberDetaillSection({apiRes}) {
    const  { nav, famId } = useContext(StateContext);
    const [searchValue, setSearchValue] = useState('');

    if (apiRes.loading) return <p>loading...</p>
    if (apiRes.error) return <p>ERROR: {apiRes.msg}</p>
    
    return (
        <FamilyMemberDetaill data={apiRes.data}></FamilyMemberDetaill>
    )
}

export default FamilyMemberDetaillSection;