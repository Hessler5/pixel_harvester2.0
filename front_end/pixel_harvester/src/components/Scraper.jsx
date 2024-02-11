import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver';
import JSZip from 'jszip'
import Image_Card from './Image_Card';
import Preview from './Preview';


function Scraper({user, updateUser}){
    //initilaize zip library
    var zip = new JSZip();

    //holds preview image
    const [preview, setPreview] = useState([false, 0])

    //holds loadinf state
    const[isLoading, setIsLoading] = useState(false)

    //holds image cards
    const[images, setImages] = useState([])

    //calculates todays date
    const date = new Date();
    let month = `0${date.getMonth() + 1}`
    let day = `0${date.getDate()}`
    let todays_date = `${date.getFullYear()}-${month.slice(-2)}-${day.slice(-2)}`

    //handles True vs False image selection
    function isTrue(url) {
     let new_images =  images.map((img) => {
        if (url == img[0]){
          img[1] = !img[1]
        }
        return img
      })
      setImages(new_images)
    }

    //control form for url entry
    const[url, setUrl] = useState("")
    function handleUrl(e){
      let newUrl = e.target.value
      setUrl(newUrl)
    }

    function scrapeRouter() {
      if(user){
        handleSubmit()
      } else {
        handlePublicSubmit()
      }
    }

    //handles scrape preview
    function scrapePreview(e){
      e.preventDefault()
      let newScrape = {
        "url": url
        }
      
        fetch('/api/preview', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newScrape)
        })
        .then(resp => resp.blob())
        .then(blob => zip.loadAsync(blob))
        .then(data => {
        let bits = data.files['preview_screenshot.png']._data.compressedContent
        let blob = new Blob([bits], { type: 'image/png' })
        const url = URL.createObjectURL(blob);
        let preview_image = [true, url]
        setPreview(preview_image)
      })
    }

    function handleReject() {
      setPreview([false, 0])
    }

    function handleAccept() {
      setPreview([false, 0])
      setIsLoading(true)
      scrapeRouter()
    }
    
    //handles submit or URL for a new scrape for logged in users
    function handleSubmit(){
        let newScrape = {
        "id": user[0].id,
        "url": url
        }
      //posts a new scrape to the server 
      fetch(`/api/scraper`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newScrape)
      })
      //converst data stream to blob
      .then(resp => resp.blob())
      //converst blob to a zip file
      .then(blob => zip.loadAsync(blob))
      //converts ever file in the zip to a blob and creates a url eleement
      .then(data => {
        let new_image_cards = []
        let image_count = 0
        for (let img in data.files) {
          let bits = data.files[img]._data.compressedContent
          let blob = new Blob([bits], { type: 'image/png' })
          const url = URL.createObjectURL(blob);
          //to embed the images the source of the new image is the url for the image
          image_count ++
          let new_image = [url, true, `File ${image_count}`, blob]
          new_image_cards.push(new_image)
        }
        updateUser({
          "id": user[0].id,
          "url": url,
          "date": todays_date
        })
        setImages(new_image_cards)
        setIsLoading(false)
      })
    }

    function handlePublicSubmit() {
      let newScrape = {
        "url": url
        }
      //posts a new scrape to the server 
      fetch(`/api/public/scraper`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newScrape)
      })
      //converst data stream to blob
      .then(resp => resp.blob())
      //converst blob to a zip file
      .then(blob => zip.loadAsync(blob))
      //converts ever file in the zip to a blob and creates a url eleement
      .then(data => {
        let new_image_cards = []
        let image_count = 0
        for (let img in data.files) {
          let bits = data.files[img]._data.compressedContent
          let blob = new Blob([bits], { type: 'image/png' })
          const url = URL.createObjectURL(blob);
          //to embed the images the source of the new image is the url for the image
          image_count ++
          let new_image = [url, true, `File ${image_count}`, blob]
          new_image_cards.push(new_image)
        }
        setImages(new_image_cards)
        setIsLoading(false)
      })
    }

    function updateFileName(url, fileName){
      let new_images =  images.map((img) => {
        if (url == img[0]){
          img[2] = fileName
        }
        return img
      })
      setImages(new_images)
    }
    

    let image_cards = images.map((img) => <Image_Card 
          key = {img[0]} 
          selected = {img[1]} 
          img = {img[0]} 
          image_name = {img[2]} 
          isTrue= {isTrue}
          updateFileName = {updateFileName}/>)

    //function that allows download of images
    async function downloadImages() {
      //creates new zip instance
      var download = new JSZip();

      //goes through each image and adds files to the zip
      images.forEach((image) => {
        if (image[1] == true) {
          download.file(`${image[2]}.png`, image[3])
        }
      })

      //creates the zip file in memort and downloads
      const zipFile = await download.generateAsync({type: 'blob'})
      .then(blob => saveAs(blob, 'images.zip'))
    }

    return (
        <div className = {images.length == 0 && !preview[0]? "h-screen flex justify-center flex-wrap" : "h-full flex justify-center flex-wrap"}>
            {isLoading? <iframe src="https://lottie.host/embed/480b0bb7-f98f-49bc-b1fd-29e858abfd5f/5rx3yz8Njq.json"></iframe>: null}
            {preview[0] || isLoading? null:
            <form onSubmit= {scrapePreview}>
              <div className = "w-screen flex justify-center">
                <input className = "text-black border-black border-solid border-2 rounded-md pl-1.5 w-2/4" type="text" id="urlname" name="name" onChange={handleUrl} placeholder="Website to Scrape" value={url}/>
                <input className = "scrape_submit border-black border-solid border-2 rounded-md pl-1 pr-1 ml-1.5" type="submit" value="Send Request"/>
              </div>
            </form>}
            <div className = "flex flex-wrap justify-center">
                {preview[0]? <Preview img = {preview[1]} handleAccept = {handleAccept} handleReject = {handleReject}/> :image_cards}
            </div>
            {images.length == 0? null : <button className = "text-2xl scrape_submit border-black border-solid border-2 rounded-md pl-1 pr-1 m-3" onClick={downloadImages}>Download</button>}
        </div>
    )
}

export default Scraper;