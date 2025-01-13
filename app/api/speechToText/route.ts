import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: "Invalid JSON input" }, { status: 400 });
  }

  const base64Audio = body.audio;

  // Convert the base64 audio data to a Buffer
  const audio = Buffer.from(base64Audio, "base64");

  // Define the file path for storing the temporary WAV file
  const filePath = path.join(process.cwd(), "tmp", "input.wav");

  try {
    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audio);

    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: "whisper-1",
    });

    // Remove the temporary file after successful processing
    fs.unlinkSync(filePath);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing audio:", error);
    return NextResponse.error();
  }
}
