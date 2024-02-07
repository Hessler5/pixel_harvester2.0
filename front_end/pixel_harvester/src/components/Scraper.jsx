import React, { useState, useEffect } from 'react'
import { saveAs } from 'file-saver';
import JSZip from 'jszip'
import Image_Card from './Image_Card';


function Scraper(){
    //initilaize zip library
    var zip = new JSZip();

    //holds image cards
    const[images, setImages] = useState([])

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
    
    //handles submit or URL for a new scrape
    function handleSubmit(e){
      e.preventDefault()
      let newScrape = {
        "url": url
      }
      //posts a new scrape to the server
      fetch(`http://localhost:5555/scraper`, {
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
        <div className = {images.length == 0? "h-screen flex justify-center flex-wrap" : "h-full flex justify-center flex-wrap"}>
            <form onSubmit={handleSubmit}>
              <div className = "w-screen flex justify-center">
                <input className = "text-black border-black border-solid border-2 rounded-md pl-1.5 w-2/4" type="text" id="urlname" name="name" onChange={handleUrl} placeholder="Website to Scrape" value={url}/>
                <input className = "scrape_submit border-black border-solid border-2 rounded-md pl-1 pr-1 ml-1.5" type="submit" value="Send Request"/>
              </div>
            </form>
            <div className = "flex flex-wrap justify-center">
                {image_cards}
            </div>
            {images.length == 0? null : <button className = "text-2xl scrape_submit border-black border-solid border-2 rounded-md pl-1 pr-1 m-3" onClick={downloadImages}>Download</button>}
        </div>
    )
}

export default Scraper;