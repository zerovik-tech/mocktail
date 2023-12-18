
import React, { useState,useEffect } from 'react';
import mockup14ProImage from './images/iphone14ProMockup/mockup14Pro.png';
import mockup14Image from './images/iphone14Mockup/mockup14.png';
import './index.css'
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Input, InputLabel } from '@material-ui/core';

import {Button,Checkbox, FormControlLabel } from '@mui/material';

function ImageCombiner() {
  const [checked1, setChecked1] = useState([false, false]);
  const [checked2, setChecked2] = useState([false, false]);
  const [inputArray,setInputArray] = useState([]);
  // const [files1,setFiles1] = useState([]);
  // const [files2,setFiles2] = useState([]);
  const [images, setImages] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  // const mockup14Pro=new Image();
  // mockup14Pro.src = './images/iphone14ProMockup/mockup14Pro.png';
  const [mockup14Pro, setmockup14ProElement] = useState(new Image());
  const [mockup14, setmockup14Element] = useState(new Image());

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
    loadImages();
    
  }, []);


  
 
  
 

  // const handlemockup14ProChange = () => {
  //   // const file = e.target.files[0];
  //   // console.log(e);
  //   // const reader = new FileReader();

  //   // reader.onload = (event) => {
  //     const img = new Image();
  //     img.src = './images/iphone14ProMockup/mockup14Pro.png';
  //     img.onload = () => {
  //       // Resize mockup14Pro
  //       console.log(img.height,img.width);
  //       // const canvas = document.createElement('canvas');
  //       // canvas.width = 630;
  //       // canvas.height = 1280;
  //       // const context = canvas.getContext('2d');
  //       // context.drawImage(img, 0, 0, 630, 1280);
  //       // setmockup14Pro(canvas);
  //       setmockup14Pro(img);
  //     };
  // //   };

  // //   reader.readAsDataURL(file);
  // };
  //function to round corners of any image

 
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
    console.log("entered into combined images")
    console.log("image1")
    console.log(image1)
    console.log("image2")
    console.log(image2)
    
    

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
     
      if(image){
        console.log("entered inside resizeImage")
         return new Promise((resolve) => {
         const canvas = document.createElement('canvas');
          canvas.width =setWidth ;  //1180
          canvas.height = setHeight; //2556
          const context = canvas.getContext('2d'  );
          //rounding off the corners of canvas
          roundCorners(context, canvas.width, canvas.height, 100, )
  
          // drawing the image on the canvas
          context.drawImage(image, 0, 0, setWidth, setHeight);
          setImage((prevImages) => [...prevImages, canvas]);
          resolve(canvas);
          const downloadLink = document.createElement('a');
      downloadLink.href = images[0];
      downloadLink.download = "nameless.png";
      downloadLink.click();
          
      });
      }
     
     
  
    }
    

  const reSizeImageArray = () => {
    inputArray.forEach((item) => {
      // Perform your operations on each item here
      console.log("entered inside reSizeImageArray");
      const img = new Image();
    img.src = item;
    img.onload = () => {
       // Resize and setting input image to image1 and image2
       resizeImage(img,setImages,1180,2556);
      //  resizeImage(img,setImage2,2339,5063);
    };
    
   
     
      

      

      
   

    
   

     
    });
    
  
  }

  const handleImage1Change = (e) => {

     const selectedFiles = e.target.files; // Get the list of selected files
     console.log("selectedFiles")
     console.log(selectedFiles);
    console.log(selectedFiles.length)
     var fileArray = []
    // Convert the FileList into an array and update the state
    for(var i=0; i<selectedFiles.length; i++){
      console.log(selectedFiles[i].length)
      fileArray.push(selectedFiles[i])
      // setInputArray((prevImages) => [...prevImages, selectedFiles[i].name]);
         
          // alternatively: console.log(selectedFiles[i].item(j).name);
      
  }
       setInputArray(fileArray);
      console.log(fileArray)
      console.log("hello")
       console.log(inputArray)

    //  const fileArray = Array.from(selectedFiles);
    //  setInputArray(fileArray);
    //  console.log("inputArray")
    //  console.log(fileArray);

       // Resize and save images
       const resizedImages = [];
       inputArray.forEach((file) => {
         const reader = new FileReader();
 
         reader.onload = (event) => {
           const img = new Image();
           img.src = event.target.result;
 
           img.onload = () => {
             const canvas = document.createElement('canvas');
             const ctx = canvas.getContext('2d');
 
             // Set canvas dimensions to desired size
             canvas.width = 1180;
             canvas.height = 2556;
 
             // Draw the image onto the canvas with the new dimensions
             ctx.drawImage(img, 0, 0, 1180, 2556);
 
             // Convert the canvas content to a data URL
             const resizedDataURL = canvas.toDataURL('image/jpeg');
 
             // Add the resized image to the array
             resizedImages.push(resizedDataURL);
 
             // If all images are resized, update the state
             if (resizedImages.length === inputArray.length) {
               setImages(resizedImages);
             }
           };
         };
 
         // Read the image file as a data URL
         reader.readAsDataURL(file);
       });
    
    // const file = e.target.files;
    // console.log(file);
    // console.log(e.target.result);
    // const reader = new FileReader();

    // reader.onload = (event) => {
    //   console.log(event);
    //   const img = new Image();
    //   img.src = event.target.result;
    //   img.onload = () => {
    //     // Resize and setting input image to image1 and image2
    //     resizeImage(img,setImage1,1180,2556);
    //     resizeImage(img,setImage2,2339,5063);
        
    //   };
    // };

    // reader.readAsDataURL(file);
  };

  // useEffect(() => {
  //   if (image1 && image2) {
  //     combineImages(image1, mockup14Pro, "mockup14Pro", 80, 80);
  //     combineImages(image2, mockup14, "mockup14", 348, 320);
  //   }
  // }, [image1, image2]);

//   useEffect(() => {
//     reSizeImageArray();
// }, [inputArray]);

  const handleClick = () => {
    for (let i = 0; i < images.length; i++) {
      const image = new Image();
     

      image.src = images[i];
      
      image.onload = () => {
      combineImages(image, mockup14Pro, "mockup14Pro", 80, 80);
      combineImages(image, mockup14, "mockup14", 348, 320);
      }
    }
      
  };
 
  

  return (
<div>
    <div className = 'phoneOptions' style={{position: 'absolute',top: '1%'}}>
      <Button onClick={() => {}} variant="contained" style={{margin:20}} >New iphones</Button>
      <Button onClick={() => {}} variant="contained"  style={{margin:20}}>Old iPhones</Button>
    </div>
   
    <div className='outerBox' style={{ position: 'relative', top: '5%' }}>
        <form onClick={() => document.querySelector(".input-field").click()} >        
        <InputLabel htmlFor="image-upload"> <CloudUploadIcon /> Upload Images </InputLabel> <input id='image-upload' className='input-field' type="file" multiple accept="image/*" onChange={handleImage1Change} hidden   /> 
        </form>
        <div className= 'checkboxes'> 
        <FormControlLabel className='labels' label="iPhone 14" 
        control={<Checkbox onChange={() => {}} /> }/>
        <FormControlLabel className='labels' label="iPhone 14 Pro"
        control={ <Checkbox onChange={() => {}}  />} />
    </div>
        <Button className='buttonContainer'  onClick={handleClick} variant="contained" color='success'  style={{position: 'absolute',bottom: 120,right: 40 }} >Download Images </Button>
    </div>
</div>
    
  );
}

export default ImageCombiner;

