import React, { useState, useEffect, useRef, useCallback } from "react";
import { Paper, Typography, Button } from "@mui/material";
import Webcam from "react-webcam";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";

const Detection = () => {
  const [model, setModel] = useState(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [specificClass, setSpecificClass] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      const newModel = await cocoSsd.load({ base: "lite_mobilenet_v2" });
      setModel(newModel);
      setIsModelLoaded(true);
    };
    loadModel();
  }, []);

  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: "user",
  };

  const WebcamCapture = () => {
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
      setImageSrc(webcamRef.current.getScreenshot());
    }, [webcamRef]);

    return (
      <>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <br />
        <Button onClick={capture}>Capture photo</Button>
      </>
    );
  };

  return (
    <React.Fragment>
      <h2>Object Detection</h2>
      <Typography>
        {!isModelLoaded ? "Loading Model... ⌛" : "Model Loaded! ✅"}
      </Typography>
      <WebcamCapture />
      {/* Add functionality to handle predictions and display them */}
    </React.Fragment>
  );
};

const Prediction = ({ imageSrc, predictions }) => {
  const canvasRef = useRef(null);

  const showDetections = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(document.getElementById("webcamFeed"), 0, 0);

    predictions.forEach((prediction) => {
      const [x, y, width, height] = prediction.bbox;
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    });
  };

  useEffect(() => {
    if (imageSrc && predictions) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      showDetections(ctx);
    }
  }, [imageSrc, predictions]);

  return (
    <Paper style={{ margin: "20px", padding: "20px" }}>
      <Typography>Here are the Predictions...</Typography>
      <canvas ref={canvasRef} width={"500px"} height={"500px"} />
    </Paper>
  );
};

export { Detection, Prediction };
