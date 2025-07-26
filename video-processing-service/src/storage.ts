// 1. GCS file interactions
// 2. Local file interactions

import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
import e from "express";

const storage = new Storage();

const rawvideoBucketName = "lp-raw-videos-bucket";
const processedVideoBucketName = "lp-processed-videos-bucket";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

/**
 * creates the local directories for raw and processed videos
 */
export function setupDirectories() {
  ensureDirectoryExists(localRawVideoPath);
  ensureDirectoryExists(localProcessedVideoPath);
  console.log("Directories for raw and processed videos are set up.");
}

/** * Uploads a file to Google Cloud Storage
 * @param rawVideoName  - The name of the file to convert from {@link localRawVideoPath}
 * @param processedVideoName - The name of the file to convert to {@link localProcessedVideoPath}
 * @returns a promise that resolves when the video is converted
 * */
export function convertVideo(rawVideoName: string, processedVideoName: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
      .outputOptions("-vf", "scale=-1:360")
      .on("end", () => {
        console.log("Processing finished successfully");
        resolve();
      })
      .on("error", (err) => {
        console.log(`an error occurred: ${err.message}`);
        reject(err);
      })
      .save(`${localProcessedVideoPath}/${processedVideoName}`);
  });
}

/**
 * @param fileName - The name of the file to upload
 * {@link rawvideoBucketName} bucket into the {@link localRawVideoPath} folder
 * @returns a promise that resolves when the file is uploaded
 *
 */
export async function downloadRawVideo(fileName: string) {
  await storage
    .bucket(rawvideoBucketName)
    .file(fileName)
    .download({ destination: `${localRawVideoPath}/${fileName}` });
  console.log(
    `gs://${rawvideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`
  );
}

/**
 * @param fileName - The name of the file to upload from the
 * {@link localProcessedVideoPath} folder into the {@link processedVideoBucketName} bucket
 * @returns a promise that resolves when the file is uploaded
 */
export async function uploadProcessedVideo(fileName: string) {
  const bucket = storage.bucket(processedVideoBucketName);

  await bucket.upload(`${localProcessedVideoPath}/${fileName}`, {
    destination: fileName,
  });
  console.log(
    `${localProcessedVideoPath}/${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}`
  );

  await bucket.file(fileName).makePublic();
}

/**
 * @param fileName - the name of the file to delete from the
 * {@link localRawVideoPath} folder
 * @returns a promise that resolves when the file has been deleted
 *
 */
export function deleteRawVideo(fileName: string) {
  return deleteFile(`${localRawVideoPath}/${fileName}`);
}

/**
 * @param fileName - the name of the file to delete from the
 * {@link localProcessedVideoPath} folder
 * @returns a promise that resolves when the file has been deleted
 */
export function deleteProcessedVideo(fileName: string) {
  return deleteFile(`${localProcessedVideoPath}/${fileName}`);
}

/**
 * @param filePath - The path of the file to delete
 * @returns a promise that resolves when the file is deleted
 */

function deleteFile(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file at ${filePath}:`, err);
          reject(err);
        } else {
          console.log(`File deleted at ${filePath}`);
          resolve();
        }
      });
    } else {
      console.log(`File not found at ${filePath},skipping the delete`);
      resolve();
    }
  });
}

/**
 * ensures a directory exists, creating it if necessary
 * @param {string} dirPath - the path of the directory to ensure exists
 *
 */
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true }); //recursive: true enables creation of nested directories
    console.log(`Directory created at ${dirPath}`);
  }
}
