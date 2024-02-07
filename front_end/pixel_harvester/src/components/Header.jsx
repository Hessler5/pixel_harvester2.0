import React from "react";


function Header() {
    return (
        <div className = "header flex justify-between">
            <img className = "w-56 h-56 ml-2" src={"src/assets/Pixel_Harvester_Logo.webp"}/>
            <div>
                <h1 className = "text-6xl m-3 mt-6">User Name:</h1>
                <h3 className = "text-3xl m-3">Remaining Scrapes:</h3>
                <h3 className = "text-3xl m-3">Last Scrape:</h3>
            </div>
            <div className = 'flex items-end mr-2'>
                <button className = 'm-3'>LOG OUT</button>
                <button className = 'm-3'>ABOUT</button>
            </div>
        </div>
    )
}

export default Header;