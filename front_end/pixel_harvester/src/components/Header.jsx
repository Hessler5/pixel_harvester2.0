import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";




function Header({user}) {

    const navigate = useNavigate();
    const location = useLocation();
    
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

    console.log(location)

    return (
        <div className = "header flex justify-between">
            <img className = "w-56 h-56 ml-2" src={"src/assets/Pixel_Harvester_Logo.webp"}/>
            <div>
                <h1 className = "text-6xl m-3 mt-6">User Name: {user.username}</h1>
                <h3 className = "text-3xl m-3">Remaining Scrapes:</h3>
                <h3 className = "text-3xl m-3">Last Scrape:</h3>
            </div>
            <div className = 'flex items-end mr-2'>
                {location.pathname == '/about'? <button className = 'm-3'><Link to="/user">HOME</Link></button>: <button className = 'm-3'><Link to="/about">ABOUT</Link></button>}
                {user? <button className = 'm-3' onClick={handleLogout}>LOG OUT</button> : <button className = 'm-3' onClick={handleLogout}>LOG IN</button>}

            </div>
        </div>
    )
}

export default Header;