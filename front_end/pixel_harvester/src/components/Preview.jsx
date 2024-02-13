import React from "react";
import { Link } from "react-router-dom";

function Preview({img, handleAccept, handleReject}) {

    return (
        <div className = "w-9/12 bg-white border-black border-solid border-2 rounded-md flex flex-wrap m-5">
            <div className="flex justify-center w-full">
                <button className="m-3 scrape_submit ml-2 p-1.5 rounded-md"><Link to="/about">Troubleshoot Results</Link></button>
            </div>
            <img className = "rounded-md" src = {img}/>
            <div className="flex justify-center w-full">
                <button className="m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick = {handleAccept}>Accept</button>
                <button className="m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick = {handleReject}>Reject</button>
            </div>
        </div>
    )
}

export default Preview;