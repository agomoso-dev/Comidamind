
import React, { useCallback, useContext, useEffect } from 'react';
import useLogIn from '../../hooks/useLogIn';
import { StateContext } from '../../App';

function LogInComp ({user, pw}) {
    const  {nav, } = useContext(StateContext);

    console.log('logincomp pw: ' + pw)
    let logInRes = useLogIn(user, pw);
    console.log('login res: ' + logInRes)

    if (logInRes.loading) return <p>loading...</p>
    if (logInRes.error) return <p>ERROR!: {logInRes.msg}</p>

    nav("/home");
    return null;
}

export default LogInComp;