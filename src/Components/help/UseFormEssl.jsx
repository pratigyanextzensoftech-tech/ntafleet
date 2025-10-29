import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import HeaderCard from '../Common/Component/HeaderCard';

const UseFormEssl = ({ title }) => {
  const [videoRef, setVideoRef] = useState(null);

  const handlePlayPause = () => {
    if (videoRef) {
      videoRef.paused ? videoRef.play() : videoRef.pause();
    }
  };

  const handleSize = (size) => {
    if (videoRef) {
      switch (size) {
        case 'big':
          videoRef.style.width = '1100px';
          break;
        case 'small':
          videoRef.style.width = '300px';
          break;
        default:
          videoRef.style.width = '700px';
          break;
      }
    }
  };

  return (
    

      <Row style={{ maxWidth: '750px', width: '100%' }} className="mx-auto mb-3">
        <Col className="d-flex justify-content-center mb-2">
          <button
            className="btn btn-secondary w-100"
            style={{ maxWidth: '150px' }}
            onClick={handlePlayPause}
          >
            Play / Pause
          </button>
        </Col>
        <Col className="d-flex justify-content-center mb-2">
          <button
            className="btn btn-secondary w-100"
            style={{ maxWidth: '150px' }}
            onClick={() => handleSize('big')}
          >
            Big
          </button>
        </Col>
        <Col className="d-flex justify-content-center mb-2">
          <button
            className="btn btn-secondary w-100"
            style={{ maxWidth: '150px' }}
            onClick={() => handleSize('small')}
          >
            Small
          </button>
        </Col>
        <Col className="d-flex justify-content-center mb-2">
          <button
            className="btn btn-secondary w-100"
            style={{ maxWidth: '150px' }}
            onClick={() => handleSize('normal')}
          >
            Normal
          </button>
        </Col>
        <Col sm="12">
        <video
          ref={setVideoRef}
          src={`${process.env.PUBLIC_URL}/help/how_use_eflse.mp4`} // ✅ correct path from /public
          width="700"
          controls
        >
          Your browser does not support the video tag.
        </video></Col>
      </Row>

      
  );
};

export default UseFormEssl;
