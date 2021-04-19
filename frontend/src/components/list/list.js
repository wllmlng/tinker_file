import React, {useEffect, useContext} from 'react';
import {MainContext} from '../../context/main-context';

//!test
import axios from 'axios';
const qs = require("qs");
//!test 

const List = () => {

    const {jwt, setJwt} = useContext(MainContext);

    useEffect(() => {
        // console.log('globalState',globalState)
    },[])

    //!wont work cause its a protected route?!
    const postSlack = () => {
        //token
        const slackToken = 'xoxb-1980593975044-1974431144242-Fiu0SmyF1asXXAWEptk4aZ3X'
        const url = 'https://hooks.slack.com/services/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'
        let text = {
            text: "Hello world"
        }
        // const res =  axios.post(url, JSON.stringify({
        //     'text':'Hello'
        // // }, {headers: {authorization: `Bearer ${slackToken}`}});
        // // }, {headers: {'Content-Type': "application/json"}});
        // }), {headers: {'Content-Type': "application/x-www-form-urlencoded"}});



        //!last worked
        axios({
            method: "POST",
            url: url,
            headers: { 
                // 'Accept': "application/x-www-form-urlencoded",
                "Content-type": "application/x-www-form-urlencoded"
            },
            data: { text: "Sometimes work!" },
            }).then(
            (response) => {
                console.log(response);
            },
            (error) => {
                console.log(error);
            });
        //!last worked
   
    };

    return(
        <div>
            LIST PAGE
            <button type='button' onClick={()=>console.log(jwt)}>jwt</button>
            <button type='button' onClick={postSlack}>Slack</button>
        </div>
    )

}

export default List;