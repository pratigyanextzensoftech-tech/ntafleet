import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';

const UseFormEssl = ({ title }) => {
  const [videoRef, setVideoRef] = useState(null);

  const handlePlayPause = () => {
    if (videoRef) {
      if (videoRef.paused) videoRef.play();
      else videoRef.pause();
    }
  };

  const handleSize = (size) => {
    if (videoRef) {
      if (size === "big") videoRef.style.width = "1100px";
      else if (size === "small") videoRef.style.width = "300px";
      else videoRef.style.width = "700px";
    }
  };

  return (
                                       <div style={{border:"1px solid #ccc",padding:"5px 5px",bprderRadius:"3px",marginBottom:"10px"}}>

      <div className='bg-primary p-2 my-3'>
        <HeaderCard title={title} />
      </div>

      <Row style={{maxWidth:"750px",width:"100%"}} className=' mx-auto mb-3 '>
        <Col><button style={{width:"150px"}} className='btn  btn-secondary' onClick={handlePlayPause}>Play / Pause</button></Col>
        <Col><button  style={{width:"150px"}} className='btn btn-secondary' onClick={() => handleSize("big")}>Big</button></Col>
        <Col><button   style={{width:"150px"}} className='btn btn-secondary' onClick={() => handleSize("small")}>Small</button></Col>
        <Col><button  style={{width:"150px"}} className='btn btn-secondary' onClick={() => handleSize("normal")}>Normal</button></Col>
      </Row>

      <div className="text-center d-flex align-items-cetner justify-content-center">
        <video
          ref={setVideoRef}
          src={`${process.env.PUBLIC_URL}/how_use_eflse.mp4`} // ✅ path relative to /public folder
          width="700"
          controls
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default UseFormEssl;
