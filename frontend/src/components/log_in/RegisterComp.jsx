import React, { useCallback, useContext, useEffect } from 'react';
import useLogIn from '../../hooks/useLogIn';
import { StateContext } from '../../App';
import useRegister from '../../hooks/useResgister';
import LogInComp from './logInComp';
import PgLogin from '../../Pages/LogPages/PgLogin';

function RegisterComp ({user, mail, pw, pw2}) {
    const  {nav, } = useContext(StateContext);

    console.log('logincomp pw: ' + pw)
    let registerRes = useRegister(user, mail, pw, pw2);

    if (registerRes.loading) return <p>loading...</p>
    if (registerRes.error) return <p>ERROR!: {registerRes.msg}</p>
    
    return nav('/login')
}

export default RegisterComp;