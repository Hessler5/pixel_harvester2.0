import React from 'react'
import Scraper from "../../pixel_harvester/src/components/Scraper";
import Header from "../../pixel_harvester/src/components/Header";


function User(){

    return(
        <>
            <Header />
            <h1 className="text-6xl font-bold underline text-center my-2 text-black">Harvester</h1>
            <Scraper />
        </>
    )
}

export default User;