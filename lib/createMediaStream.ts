import getPeakLevel from "./getPeakLevel";

export default function createMediaStream(
  stream: MediaStream,
  isRecording: boolean,
  callback: (peak: number) => void
) {
  // Create a new AudioContext
  const context = new AudioContext();

  // Create a media stream source node from the input stream
  const source = context.createMediaStreamSource(stream);

  // Create an analyzer node for audio analysis
  const analyzer = context.createAnalyser();

  // Connect the source node to the analyzer node
  source.connect(analyzer);

  // Function to continuously analyze audio data and invoke the callback
  const tick = () => {
    // Calculate the peak level using the getPeakLevel function
    const peak = getPeakLevel(analyzer);

    if (isRecording) {
      callback(peak);

      // Request the next animation frame for continuous analysis
      requestAnimationFrame(tick);
    }
  };

  // Start the continuous analysis loop
  tick();
}
