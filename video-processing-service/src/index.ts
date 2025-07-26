import express from "express";
import {
  convertVideo,
  deleteProcessedVideo,
  deleteRawVideo,
  downloadRawVideo,
  setupDirectories,
  uploadProcessedVideo,
} from "./storage";

setupDirectories();

const app = express();
app.use(express.json());

app.post("/process-video", async (req, res) => {
  //get the bucket and file name from the cloud pub/sub message
  let data;
  try {
    const message = Buffer.from(req.body.message, "base64").toString("utf-8");
    data = JSON.parse(message);
    if (!data.name) {
      throw new Error("invalid message payload received");
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send("Bad Request: Missing file name");
  }

  const inputFileName = data.name;
  const outputFileName = `processed-${inputFileName}`;

  //Download the raw video from Google Cloud Storage
  await downloadRawVideo(inputFileName);

  //Convert the video using ffmpeg
  try {
    await convertVideo(inputFileName, outputFileName);
  } catch (err) {
    await Promise.all([
      deleteRawVideo(inputFileName),
      deleteProcessedVideo(outputFileName),
    ]);
    console.error(err);
    return res
      .status(500)
      .send("Internal Server Error: Video conversion failed");
  }

  //upload the processed video to Google Cloud Storage
  await uploadProcessedVideo(outputFileName);

  await Promise.all([
    deleteRawVideo(inputFileName),
    deleteProcessedVideo(outputFileName),
  ]);
  res.status(200).send("Video processed successfully");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Video Processing Service is running on http://localhost:${port}`
  );
});
