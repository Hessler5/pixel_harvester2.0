import React, { useState, useEffect }  from "react";
import Header from "../../pixel_harvester/src/components/Header";
import {useNavigate} from "react-router-dom";


function About(){

    const[user, setUser] = useState({})
    const navigate = useNavigate();

    //check for logged in user
    useEffect(() => {
        fetch('/api/user')
        .then(resp => resp.json())
        .then(data => setUser(data))},
         [])
    

    return (
        <div>
            {user? <Header user={user}/> : null}
        </div>
    )
}

export default About;