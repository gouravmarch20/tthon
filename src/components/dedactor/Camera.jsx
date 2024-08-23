import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";


const videoConstraints = {
  width: 540,
  facingMode: "environment"
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = React.useState(null);

  const capturePhoto = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imageSrc" , imageSrc);
    
    setUrl(imageSrc);
  }, [webcamRef]);

  const onUserMedia = (e) => {
    console.log(e);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        // audio={true}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
      />
      <button onClick={capturePhoto } className=" text-green-500 ">Capture</button>
      <button  className="ms-6 text-red-600" onClick={() => setUrl(null)}>Refresh</button>
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default Camera;
