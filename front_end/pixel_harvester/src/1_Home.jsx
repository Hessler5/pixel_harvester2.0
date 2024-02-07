import React from 'react';
import Login from '../../pixel_harvester/src/components/Login';
import Scraper from '../../pixel_harvester/src/components/Scraper';


function Home(){

    return (
        <>
            <Login/>
            <div className = "flex justify-center m-3">
                <h1 className = "text-black text-6xl">Try Harvesting Now before Loging in!</h1>
            </div>
            <Scraper/>
        </>
    )
}

export default Home;