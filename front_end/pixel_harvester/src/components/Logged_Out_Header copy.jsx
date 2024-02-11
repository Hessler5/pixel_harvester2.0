import React from "react";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";


function Logged_Out_Head({user}) {

    const navigate = useNavigate();
    
    //handles logging out
    function handleLogout(){
        fetch('/api/logout', {
            method: "DELETE"
        }).then(resp => {
            resp.json()})
        .then(data => {
            navigate("/")
        })
    }

    return (
        <div className = "header flex justify-between">
            <img className = "w-56 h-56 ml-2" src={"src/assets/Pixel_Harvester_Logo.webp"}/>
            <div>
                <h1 className = "text-6xl m-3 mt-6">User Name: {user.username}</h1>
                <h3 className = "text-3xl m-3">Remaining Scrapes:</h3>
                <h3 className = "text-3xl m-3">Last Scrape:</h3>
            </div>
            <div className = 'flex items-end mr-2'>
                <button className = 'm-3' onClick={handleLogout}>LOG IN</button>
                <button className = 'm-3'><Link to="/about">ABOUT</Link></button>
            </div>
        </div>
    )
}

export default Logged_Out_Head;