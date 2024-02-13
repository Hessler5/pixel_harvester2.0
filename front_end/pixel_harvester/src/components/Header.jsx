import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";




function Header({user}) {

    const navigate = useNavigate();
    const location = useLocation();
    
    //handles logging out
    function handleLogout(){
        fetch('/api/logout', {
            method: "DELETE"
        }).then(() => {
            navigate("/")})
    }

    //calculate remianing scrapes
    // todays_scrapes = user[1].filter(() =>)
    const date = new Date();
    let todays_scrapes = []
    let month = `0${date.getMonth() + 1}`
    let day = `0${date.getDate()}`
    let todays_date = `${date.getFullYear()}-${month.slice(-2)}-${day.slice(-2)}`
    if (user[1]) {
        todays_scrapes = user[1].filter((scrape) => scrape.date == todays_date)
    }

    return (
        <div className = "header flex justify-between">
            <img className = "w-56 h-56 ml-2" src={"src/assets/Pixel_Harvester_Logo.webp"}/>
            {user[0]? 
            <div>
                <h1 className = "text-6xl m-3 mt-6">User Name: {user[0].username}</h1>
                <h3 className = "text-3xl m-3">Today's Remaining Scrapes: {3 - todays_scrapes.length}</h3>
                <h3 className = "text-3xl m-3">Last Scrape: {user[1][1]? user[1][todays_scrapes.length-1].url: null}</h3>
            </div> : null}
            <div className = 'flex items-end mr-2'>
                {location.pathname == '/about'? <button className = 'm-3 scrape_submit ml-2 p-1.5 rounded-md'><Link to="/user">HOME</Link></button>: <button className = 'm-3 scrape_submit ml-2 p-1.5 rounded-md'><Link to="/about">ABOUT</Link></button>}
                {user[0]? <button className = 'm-3 scrape_submit ml-2 p-1.5 rounded-md' onClick={handleLogout}>LOG OUT</button> : null}
            </div>
        </div>
    )
}

export default Header;