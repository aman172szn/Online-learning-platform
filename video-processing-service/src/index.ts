import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
  //get video file path from request body
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  if (!inputFilePath || !outputFilePath) {
    return res
      .status(400)
      .json({ error: "Input and output file paths are required" });
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      return res
        .status(200)
        .json({ message: "Video processing done successfully" });
    })

    .on("error", (err) => {
      console.log(`an error occurred: ${err.message}`);
      res.status(500).json({ error: "Internal server error" });
    })
    .on("progress", (progress) => {
      console.log("progress", progress.timemark);
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(
    `Video Processing Service is running on http://localhost:${port}`
  );
});
