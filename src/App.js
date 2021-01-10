import './App.css';
import { OpenVidu } from "openvidu-browser";
import React, { useEffect, useRef, useState } from "react";

function App() {
  const videoRef = useRef();

  useEffect(()=>{
    const OV = new OpenVidu();
    const OVPub = OV.initPublisher(undefined, {});
    OVPub.addVideoElement(videoRef.current)
  },[])

  const capture = (id) => {
      const canvas = document.getElementById('canvas');
      const video = document.getElementById(id);
      const div = document.querySelector('.photoBooth');
      canvas.width = div.clientWidth;
      canvas.height = div.clientHeight;
      const canvas2D = canvas.getContext('2d');
      const img = new Image;
      img.onload = function(){
          canvas2D.drawImage(img,0,0,div.clientWidth,div.clientHeight);
      };
      img.src = 'https://i.ibb.co/tpFJScg/Fa3zGZX.png';
      img.setAttribute('crossorigin', 'anonymous');


      const vh = video.clientHeight;
      const vw = video.clientWidth;
      const y1 = div.clientHeight*16/51;
      const x1 = div.clientWidth*34/51;

      canvas2D.save();
      canvas2D.scale(-1,1)
      canvas2D.drawImage(video, -x1+vw*0.3, y1-vh*0.2/2, -vw*1.3333333, vh);
      canvas2D.restore();
  }

  const download = () => {
      // const canvas = document.getElementById('canvas');
      // const img2 = canvas.toDataURL("image/png");
      // document.write('<img src="'+img2+'"/>');
      const link = document.createElement('a');
      link.download = 'filename.png';
      link.href = document.getElementById('canvas').toDataURL()
      link.click();
  }
  const buttonClicked = () => {
      capture('video')
  }
  return (
      <>
    <div className={'photoBooth'}>
        <video id="video" type="video/mp4" controls ref={videoRef} style={{gridArea: '16 / 34 / 25 / 40'}}></video>
        <div className={'photoBoothBackground'} style={{backgroundImage: `url('https://i.ibb.co/tpFJScg/Fa3zGZX.png')`}} />
    </div>
          <button onClick={buttonClicked}>Capture</button>
          <button onClick={download}>Download</button>
          <canvas id="canvas" style={{overflow:"auto"}}></canvas>
      </>

);
}

export default App;
