import { promises as fs } from "fs";
import pdf from "pdf-thumbnail";

export interface ThumbnailFromPdfProps {
  pdfPath: string;
  width?: number;
  height?: number;
}
export async function thumbnailFromPdf({
  pdfPath,
  width,
  height,
}: ThumbnailFromPdfProps) {
  const pdfBuffer = await fs.readFile(pdfPath);

  try {
    const data = await pdf(pdfBuffer, {
      resize: {
        width: width || 200, // default
        height: height || 200, // default
      },
    });
    const base64 = `data:image/png;base64,${data.toString()}`;

    return base64;
  } catch (err) {
    console.error(err);
  }
}
