import React from "react";

function Preview({img, handleAccept, handleReject}) {

    console.log(img)
    return (
        <div className = "w-9/12 bg-white border-black border-solid border-2 rounded-md flex flex-wrap m-5">
            <img className = "rounded-md" src = {img}/>
            <div className="flex justify-center w-full">
                <button className="m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick = {handleAccept}>Accept</button>
                <button className="m-3 scrape_submit ml-2 p-1.5 rounded-md" onClick = {handleReject}>Reject</button>
            </div>
        </div>
    )
}

export default Preview;