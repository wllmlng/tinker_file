import React, {useEffect, useContext} from 'react';
import {MainContext} from '../../context/main-context';


const List = () => {

    const {jwt, setJwt} = useContext(MainContext);

    useEffect(() => {
        // console.log('globalState',globalState)
    },[])

    return(
        <div>
            LIST PAGE
            <button type='button' onClick={()=>console.log(jwt)}>jwt</button>
        </div>
    )

}

export default List;