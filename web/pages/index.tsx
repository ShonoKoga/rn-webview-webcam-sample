import React from 'react'
// import Webcam from "react-webcam";

export default () => {
  React.useEffect(() => {
    const getMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 250,
          height: 250,
        },
        audio: false,
      });
      window.alert(JSON.stringify(stream))
    };
    getMedia();
  }, []);

  return (
    <div>
      <h1>WebCam</h1>
      {/* <Webcam onUserMediaError={(e) => window.alert(e)} /> */}
    </div>
  );
};
