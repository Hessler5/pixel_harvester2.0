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
            if(!data[1]){
                    navigate("/")
            }else {
                setUser(data)
            }
            })
        }, [])

    function updateUser(newScrape) {
        let userToUpdate = {...user}
        userToUpdate[1].push(newScrape)
        console.log(userToUpdate)
        setUser(userToUpdate)
    }

    return(
        <>
            <Header user = {user}/>
            <h1 className="text-6xl font-bold underline text-center my-2 text-black">Harvest Images</h1>
            <Scraper user = {user} updateUser = {updateUser}/>
        </>
    )
}

export default User;