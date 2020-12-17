import { useEffect, useRef } from "react";

const App = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    (async () => {
      const { mediaDevices } = navigator;
      const video = videoRef.current;
      if (mediaDevices && video !== null) {
        const stream = await mediaDevices.getUserMedia({
          video: {
            width: 500,
            height: 500,
          },
          audio: false,
        });
        video.srcObject = stream;
      }
    })();
  }, []);

  return (
    <div>
      <video autoPlay ref={videoRef} />
    </div>
  );
};

export default App;
