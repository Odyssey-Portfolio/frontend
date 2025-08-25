"use client";
import * as pdfjsLib from "pdfjs-dist";

interface GeneratePdfThumbnailProps {
  pdfUrl: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}
export async function generatePdfThumbnail({
  pdfUrl,
  thumbnailWidth = 300,
  thumbnailHeight = 200,
}: GeneratePdfThumbnailProps): Promise<string> {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      window.location.origin + "/pdf.worker.min.mjs";
    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    const pdfDocument = await loadingTask.promise;
    const page = await pdfDocument.getPage(1); // Get the first page

    const viewport = page.getViewport({ scale: 1 });
    const scale = Math.min(
      thumbnailWidth / viewport.width,
      thumbnailHeight / viewport.height
    );

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!canvas || !context) return "";
    canvas.width = thumbnailWidth;
    canvas.height = thumbnailHeight;

    const renderContext = {
      canvas: canvas,
      canvasContext: context,
      viewport: page.getViewport({ scale: scale }),
    };

    await page.render(renderContext).promise;

    // Get the thumbnail image data as a Data URL
    const thumbnailDataUrl = canvas.toDataURL("image/jpeg");
    return thumbnailDataUrl;
  } catch (error) {
    console.error("Error generating PDF thumbnail:", error);
    return "";
  }
}
