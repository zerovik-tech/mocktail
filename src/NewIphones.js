
import React, { useState,useEffect, useRef} from 'react';
import mockup14ProImage from './images/iphone14ProMockup/mockup14Pro.png';
import mockup14Image from './images/iphone14Mockup/mockup14.png';
import './index.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputLabel } from '@material-ui/core';

import {Button,Checkbox, FormControlLabel } from '@mui/material';
import {useNavigate } from 'react-router-dom';


function NewIphonesImageCombiner() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [inputArray,setInputArray] = useState([]);  // stores initial input
  const [downloadButton, setDownloadButton] = useState(false) // responsible for showing downloading or download
  
  const [isUploading, setIsUploading] = useState(false); // responsible for showing number of selected items
  const [processImage, setProcessImage] = useState(false)


  const [images1, setImages1] = useState([]); //for mockup14Pro stores resized images
  const [images2, setImages2] = useState([]); //for mockup14 stores resized images

 
  const [mockup14Pro, setmockup14ProElement] = useState(new Image());
  const [mockup14, setmockup14Element] = useState(new Image());

  useEffect(()=> { 
    console.log('checked1', checked1)
  },[checked1])

  useEffect(()=> { 
    console.log('checked2', checked2)
  },[checked2])

  //the image has to be loaded from the src otherwise the combineImages function is not working
  const loadImages = () => {
    const img1 = new Image();
    img1.src = mockup14ProImage;
    img1.onload = () => {
      setmockup14ProElement(img1);
    };

    const img2 = new Image();
    img2.src = mockup14Image;
    img2.onload = () => {
      setmockup14Element(img2);
    };

  };
  useEffect(() => {
    console.log("mockups loaded")
    loadImages();
    
  }, []);


  const roundCorners = (context, width, height, radius) => {
    context.beginPath();
    context.moveTo(radius, 0);
    context.lineTo(width - radius, 0);
    context.arcTo(width, 0, width, radius, radius);
    context.lineTo(width, height - radius);
    context.arcTo(width, height, width - radius, height, radius);
    context.lineTo(radius, height);
    context.arcTo(0, height, 0, height - radius, radius);
    context.lineTo(0, radius);
    context.arcTo(0, 0, radius, 0, radius);
    context.closePath();
    context.clip();
  
    
  };

  const combineImages = (image1, image2,name,x,y) => {
   
    if (image1 && image2) { // Check if both images are fully loaded
      // Create a canvas and overlay the images
      const canvas = document.createElement('canvas');
      canvas.width = image2.width;
      canvas.height = image2.height;
      const context = canvas.getContext('2d');
      context.save();

     
      context.drawImage(image1, x, y);
      context.drawImage(image2, 0,0);
     
      

      
      // Convert the combined image to a data URL
      const combinedImage = canvas.toDataURL('image/png');

      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = combinedImage;
      downloadLink.download = `${name}.png`;
      downloadLink.click();
      context.restore();
    }
  };

    //resize image
    const resizeImage = (image,setImage,setWidth,setHeight) =>{

      const canvas = document.createElement('canvas');
        canvas.width =setWidth ;  //1180
        canvas.height = setHeight; //2556
        const context = canvas.getContext('2d');
        context.save();

        //rounding off the corners of canvas
        roundCorners(context, canvas.width, canvas.height, 100, )

        // drawing the image on the canvas
        context.drawImage(image, 0, 0, setWidth, setHeight);
        setImage((prevImages) => [...prevImages, canvas]);
        
        // const combinedImage = canvas.toDataURL('image/png');
        // const downloadLink = document.createElement('a');
        //     downloadLink.href = combinedImage;
        //     downloadLink.download = 'unknownName.png';
        //     downloadLink.click();

        
        }
    



  const handleImageChange = (e) => {
    // setInputArray([])
    
    // setImages1([])
    // setImages2([])
    // setProcessImage(false)
    // setDownloadButton(false)

    // const selectedFiles = e.target.files; // Get the list of selected files
    // if (fileInputRef.current) {
    //     fileInputRef.current.value = '';
    //   }
    // console.log("selectedFiles")
    // console.log(selectedFiles);
    // console.log(selectedFiles.length)

    // const fileArray = Array.from(selectedFiles);
    // setInputArray(fileArray);
    // setIsUploading(true);

    setInputArray((prev) => { 
        return []
    });

    setImages1((prev) => { 
        return []
    });

    setImages2((prev) => { 
        return []
    });

    setProcessImage((prev) => { 
        return false
    });

    setDownloadButton((prev) => { 
        return false
    });

    const selectedFiles = e.target.files;
    

    console.log("selectedFiles")
    console.log(selectedFiles);
    console.log(selectedFiles.length)

    const fileArray = Array.from(selectedFiles);
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    setInputArray((prev) => { 
        return fileArray
    });

    

    setIsUploading((prev) => { 
        return true
    });

};
 
//   useEffect (() => { 
//     console.log('printing inputArray in useEffect Hook for inputArray : ', inputArray)
   
    

//   },[inputArray])



 


  const handleClick = () => {

    if(inputArray.length === 0){ 
        alert('Please select a few items first')
        return
    }

    

    if (!checked1 && ! checked2){ 
      alert("Please check the boxes for iphone");
    } else { 

        

        

         if (!processImage && !downloadButton) { 
            setProcessImage((prev) => {  // for the first click sets the button to processing
                return true
            });
            
         }
         else if (processImage && downloadButton) {

            
            setIsUploading((prev) => { 
                return false
            });
            setInputArray((prev) => { 
                return []
            });
            
            setProcessImage((prev) => { 
                return false
            });

            const promise = new Promise((resolve) => {
                if (checked1 && checked2) {
                  for (let i = 0; i < images1.length; i++) {
                    combineImages(images1[i], mockup14Pro, `mockup14Pro-${i}`, 80, 80);
                    combineImages(images2[i], mockup14, `mockup14-${i}`, 348, 320);
                  }
                } else if (checked1) {
                  for (let i = 0; i < images1.length; i++) {
                    combineImages(images1[i], mockup14Pro, `mockup14Pro-${i}`, 80, 80);
                  }
                } else {
                  for (let i = 0; i < images2.length; i++) {
                    combineImages(images2[i], mockup14, `mockup14-${i}`, 348, 320);
                  }
                }
                
                resolve(); 
              });
            
              promise.then(() => {
                setDownloadButton((prev) => false);
                setImages1((prev) => []);
                setImages2((prev) => []);
              });
      
         }
        
        }
    };

 

useEffect(() => {
    if (processImage) {
      
      const promises = [];
  
      for (let i = 0; i < inputArray.length; i++) {
        const file = inputArray[i];
        const reader = new FileReader();
  
        
        const promise = new Promise((resolve) => {
          reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
              
              resizeImage(img, setImages1, 1180, 2556);
             
              resizeImage(img, setImages2, 2339, 5063);
  
              resolve(); 
            };
          };
  
          reader.readAsDataURL(file);
        });
  
        promises.push(promise);
      }
  
     
      Promise.all(promises).then(() => {
        setDownloadButton(true);
      });
    }
  }, [processImage]);
  


  let buttonText;
  if (!processImage && !downloadButton) {
    buttonText = 'Process Image';
  } if( processImage && !downloadButton) { 
    buttonText = 'Processing'
  }  if (processImage && downloadButton) {
    buttonText = 'Download Images';
  }  if (!processImage && downloadButton) {
    buttonText = 'Downloading';
  }
 
  useEffect(()=>{
    console.log(buttonText)
  }, [buttonText])
  

  return (
<div>
    <div className = 'phoneOptions' style={{position: 'absolute',top: '1%'}}>
      <Button onClick={() => {navigate('/')}} variant="contained" style={{margin:20, backgroundColor: 'gray', color: 'white'}} >New iphones</Button>
      <Button onClick={() => { navigate('/old-iphones'); }} variant="contained"  style={{margin:20, backgroundColor: 'white', color: 'black'}}>Old iPhones</Button>
    </div>
   
    <div className='outerBox' style={{ position: 'relative', top: '5%' }}>
    <div className='innerBox'>
         <form onClick={() => document.querySelector(".input-field").click()} >        
        <InputLabel htmlFor="image-upload">     {isUploading ? (
      `Selected ${inputArray.length} item${inputArray.length !== 1 ? 's' : ''}...` ) : (
      <>
        <CloudUploadIcon /> Upload Images
      </>)}
       </InputLabel> <input ref={fileInputRef} id='image-upload' className='input-field' type="file" multiple accept="image/*" onChange={handleImageChange} hidden disabled={( processImage && !downloadButton) || (!processImage && downloadButton) }  /> 
        </form>
        <Button onClick = {() => {setInputArray([]); setImages1([]); setImages2([]); setIsUploading(false) }} style={{margin:20, backgroundColor: 'blue', color: 'white'}}> Clear </Button>
    </div>
       
        


        <div className= 'checkboxes'> 
        <FormControlLabel className='labels' label="iPhone 14 Pro" 
        control={<Checkbox checked={checked1} onChange={() => {  setChecked1((prevChecked) => !prevChecked);}} /> }/>
        <FormControlLabel className='labels' label="iPhone 14"
        control={ <Checkbox checked={checked2} onChange={() => { setChecked2((prevChecked) => !prevChecked);}} />} />
    </div>
        <Button className='buttonContainer'  onClick={handleClick} variant="contained" color='success'  style={{position: 'absolute',bottom: 120,right: 40 }} disabled={( processImage && !downloadButton) || (!processImage && downloadButton) } > 
          {buttonText}
            </Button>
    </div>
</div>
    
  );
}

export default NewIphonesImageCombiner;



