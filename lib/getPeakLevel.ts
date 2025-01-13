// Function to calculate the peak level from the analyzer data
export default function getPeakLevel(analyzer: AnalyserNode) {
  // Create a Uint8Array to store the audio data
  const array = new Uint8Array(analyzer.fftSize);

  // Get the time domain data from the analyzer and store it in the array
  analyzer.getByteTimeDomainData(array);

  // Calculate the peak level by finding the maximum absolute deviation from 127
  return (
    array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) /
    128
  );
}
