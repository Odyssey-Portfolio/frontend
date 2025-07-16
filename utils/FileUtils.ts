export function base64ToFile(base64: string, filename?: string): File {
  const [metadata, data] = base64.split(",");
  const mimeMatch = metadata.match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : "application/octet-stream";

  const binary = atob(data);
  const len = binary.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = binary.charCodeAt(i);
  }

  const defaultExtension = mime.split("/")[1] || "bin";
  const safeFilename = filename || `file.${defaultExtension}`;

  return new File([buffer], safeFilename, { type: mime });
}
