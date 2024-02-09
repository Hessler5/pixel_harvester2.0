import React, { useState, useEffect } from 'react'
import Scraper from "../../pixel_harvester/src/components/Scraper";
import Header from "../../pixel_harvester/src/components/Header";
import {useNavigate} from "react-router-dom";


function User(){

    const[user, setUser] = useState({})
    const navigate = useNavigate();

    //check for logged in user
    useEffect(() => {
        fetch('/api/user')
        .then(resp => resp.json())
        .then(data => {
            if(!data.username){
                    navigate("/")
            }else {
                setUser(data)
            }
            })
        }, [])

    return(
        <>
            <Header user = {user}/>
            <h1 className="text-6xl font-bold underline text-center my-2 text-black">Harvester</h1>
            <Scraper user = {user}/>
        </>
    )
}

export default User;