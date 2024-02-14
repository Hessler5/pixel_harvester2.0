import React, { useState, useEffect }  from "react";
import Header from "../../pixel_harvester/src/components/Header";
import {useNavigate} from "react-router-dom";


function About(){

    const[user, setUser] = useState({})
    const navigate = useNavigate();

    //check for logged in user
    useEffect(() => {
        fetch('/api/user')
        .then(resp => resp.json())
        .then(data => setUser(data))},
         [])
    

    return (
        <div>
            {user? <Header user={user}/> : null}
            <div className = "about_background">
                <div className = "flex flex-wrap justify-center">
                    <div className = "w-4/5 text-center bg-white border-black border-solid border-2 rounded-lg m-5">
                        <h1 className="text-black underline text-xl">About this Project</h1>
                        <p className="text-black mx-5 mb-3">Pixel Harvester is a web scraper that will scrape images from an inputted website. This scraper was created as a graduation project for the Flatiron School programming bootcamp. As opposed to traditional scrappers that loop through the html tree of websites this project uses image processing to to remove images from a screenshot taken of the entire webpages. The intended use of a scraper like this is to aid in the image/data capture for projects such as training a machine learning model.</p>
                    </div>
                    <div className = "w-4/5 text-center bg-white border-black border-solid border-2 rounded-lg m-5">
                        <h1 className="text-black underline text-xl">Scraping Ethics</h1>
                        <p className="text-black mx-5 mb-3">If you are using this scraper make sure to follow the scrapping guidelines of a website's “robot.txt” file and follow the website's terms and conditions. This scrapper is intended for gathering data for research purposes only and not for commercial gain. It is up to the user to obey all copyright laws associated with the scrapped images. Also note this scrapper makes no attempt to subvert anti bot detection as to protect websites that do not wish to be scrapped.</p>
                    </div>
                    <div className = "w-4/5 text-center bg-white border-black border-solid border-2 rounded-lg m-5">
                        <h1 className="text-black underline text-xl">Scrapping Issues</h1>
                        <p className="text-black text-large text-left ml-3">Below is a list of reasons a particular website or page may not scrape correctly.</p>
                        <ul className ="list-disc text-left mx-6 mb-3">
                            <li className = "text-black">If a scrape is not going through make sure you have not used up either your free trial or your three daily logged in scrapes.</li>
                            <li className = "text-black">Websites may use anti bot detection to prevent scraping. This website makes no attempt to subvert these efforts as to not violate the terms and service of another website. If a website preview comes up as an all gray or white screen that is a key indicator that the scrapper was blocked in this manner</li>
                            <li className = "text-black">Images on that particular website may not be nested in html image tags. This scrapper requires all images to be html image components in order for it to be able to detect them.</li>
                            <li className = "text-black">If images are grayed out in the preview this could be due to anti bot detection or the website is loading too slowly for the scrapper to be able to capture the images.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;