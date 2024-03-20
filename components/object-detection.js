"use client";
import React, { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam"
import {load as cocoSSDLoad} from "@tensorflow-models/coco-ssd"
import * as tf from "@tensorflow/tfjs"
import { renderPredictions } from '@/utils/renderPredictions';
let detectInterval
const objectDetection = () => {
    
    const [loading,setLoading]=useState(false);
    const webcamRef=useRef(null);
    const canvasRef=useRef(null);
    const runCoco=async()=>{
        setLoading(true);
      const net= await cocoSSDLoad();
      setLoading(false);
      detectInterval= setInterval(()=>{
        runObjectDetection(net)
      },10)
    }
async function runObjectDetection(net){
    if(
        canvasRef.current&&
        webcamRef.current!==null &&
         webcamRef.current.video?.readyState===4
    )
    {
        canvasRef.current.width=webcamRef.current.video.videoWidth;
        canvasRef.current.height=webcamRef.current.video.videoHeight;
        // find all detected objects
        const detectedObjects=await net.detect(webcamRef.current.video,undefined,0.7);
        console.log(detectedObjects)
        const context=canvasRef.current.getContext("2d")
        renderPredictions(detectedObjects,context)
    }
}

    const showmyVideo=()=>{
        if(webcamRef.current!==null && webcamRef.current.video?.readyState===4)
        {
            const myVideoWidth=webcamRef.current.video.videoWidth;
            const myVideoHeight=webcamRef.current.video.videoHeight;

            webcamRef.current.video.width=myVideoWidth;
            webcamRef.current.video.height=myVideoHeight;
        }
    };
    useEffect (()=>{
        runCoco();
        showmyVideo();
    },[]);
  return (
    <div className='mt-4'>
    {
    loading ?(<div className='gradient-title text-center text-lg'>Loading...</div>):

   ( <div className='relative flex justify-center items-center gradient p-1.5 rounded-md '>

{/* webcam-->a react-library */}
<Webcam
ref={webcamRef}
    className='rounded-md w-full lg:h-[720px]'
    muted

/>

{/* canvas-->for red /green squares..on top of cam. */}
<canvas ref={canvasRef}
className='absolute top-0 left-0 z-9999 w-full lg:h-[720px]'

/>
    </div>)
}
    
    
    
    </div>
  )
}

export default objectDetection