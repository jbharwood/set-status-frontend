//callback - where we want to get result
export default function blobToBase64(
  blob: Blob,
  callback: (base64data: string | undefined) => void
) {
  const reader = new FileReader();
  reader.onload = function () {
    const base64data =
      typeof reader.result === "string"
        ? reader.result.split(",")[1]
        : undefined;
    callback(base64data);
  };
  reader.readAsDataURL(blob);
}
