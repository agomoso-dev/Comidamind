
import React, { useCallback, useEffect } from 'react';
import EatingTodayComp from './EatingTodayComp';
import useEatingToday from '../../hooks/useEatingToday';

function DataFetcherEatingToday ({fam, day}) {
    let apiRes = useEatingToday(day)

    if (apiRes.loading) return <p>loading...</p>
    if (apiRes.error) return <p>ERROR: {apiRes.msg}</p>

    console.log('DataFetcherEatingToday apiRes.data' + apiRes.data)
    return (
        <>
          <EatingTodayComp data={apiRes.data}/>
        </>
    )
}

export default DataFetcherEatingToday;
