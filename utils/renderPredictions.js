import { throttle } from "lodash";

export const renderPredictions=(predictions,ctx)=>{
   ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
//    fonts
   const font="16px sans-serif" // 
   ctx.font=font;
   ctx.textBaseline="top"
   predictions.forEach((prediction)=>{
    const [x,y,width,height]=prediction["bbox"];
    const isPerson=prediction.class=="person";
    // bounding box
    ctx.strokeStyle=isPerson?"#FF0000":"#00FFFF";
    // fill the color
    ctx.fillStyle=`rgba(255,0,0, ${isPerson?0.2:0})`
    ctx.fillRect(x,y,width,height);
    // draw the label bg
    ctx.fillStyleisPerson?"#FF0000":"#00FFFF";
    const textWidth=ctx.measureText(prediction.class).width;
    const textHeight=parseInt(font,10);
    ctx.fillRect(x,y,textWidth+4,textHeight+4)

    ctx.fillStyle="#000000";
    ctx.fillText(prediction.class,x,y);
    if(isPerson)
    {
        playAudio()
    }
   })
}
const playAudio=throttle(()=>{
    const audio=new Audio("/pols-aagyi-pols.mp3")
    audio.play();
},2000)