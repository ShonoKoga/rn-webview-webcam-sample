import Webcam from "react-webcam";

export default () => {
  return (
    <div>
      <h1>WebCam</h1>
      <Webcam onUserMediaError={(e) => window.alert(e)}/>
    </div>
  );
};
