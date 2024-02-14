import React, { useState } from 'react'

function Image_Card({img, image_name, selected, isTrue, updateFileName}){
    //control form for file name
    const[fileName, setFileName] = useState(`${image_name}`)

    function onNameChange(e) {
        setFileName(e.target.value)
        updateFileName(img, e.target.value)
    }

    //handle selection of Images
    const[hover, isHover] = useState(!selected)
    const cardCSS = "product_card border-black border-solid border-2 w-80 rounded-lg justify-center flex m-1.5 flex-wrap shadow-md"
    const selectedCardCSS = "product_card border-black border-solid border-2 w-80 rounded-lg justify-center flex m-1.5 flex-wrap shadow-md"
    const imageCSS = "w-72 h-72 mt-2.5 mb-5 shadow-md border-black border-solid border-2 rounded-md"
    const selectedImageCSS = "w-72 h-72 mt-2.5 mb-5 shadow-md border-rose-500 border-solid border-2 rounded-md"

    function handleOnEnter() {
        isHover(!hover)
    }

    function handleOnExit(){
        isHover(!hover)
    }


    return (
        <div className = {hover || selected? selectedCardCSS: cardCSS}>
            <div className='relative'>
                <img className = {hover || !selected? selectedImageCSS: imageCSS} src = {img} onMouseEnter = {handleOnEnter} onMouseLeave = {handleOnExit} onClick={() => isTrue(img)}/>
                {selected? null : <p className = "absolute top-3 left-1.5">❌</p>}
            </div>
            <div className = "mb-5">
                <label htmlFor="fileName" className = "mr-2.5">File Name </label>
                <input type="text" className = "text-black border-black border-solid border-2 rounded-md pl-0.5" id="fileName" name="name" onChange = {onNameChange} value = {fileName}/>
            </div>
        </div>
    )
}

export default Image_Card;