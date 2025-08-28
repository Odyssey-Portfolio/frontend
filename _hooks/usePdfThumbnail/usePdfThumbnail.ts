"use client";
import { useEffect, useState } from "react";

interface UsePdfThumbnailProps {
  pdfUrl: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
}

export function usePdfThumbnail({
  pdfUrl,
  thumbnailWidth = 300,
  thumbnailHeight = 200,
}: UsePdfThumbnailProps): string | null {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function generateThumbnail() {
      try {
        const pdfjsLib = await import("pdfjs-dist");

        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdfDocument = await loadingTask.promise;
        const page = await pdfDocument.getPage(1); // first page

        const viewport = page.getViewport({ scale: 1 });
        const scale = Math.max(
          thumbnailWidth / viewport.width,
          thumbnailHeight / viewport.height
        );

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!canvas || !context) return;
        canvas.width = thumbnailWidth;
        canvas.height = thumbnailHeight;
        const renderContext = {
          canvas: canvas,
          canvasContext: context,
          viewport: page.getViewport({ scale }),
        };

        await page.render(renderContext).promise;

        const thumbnailDataUrl = canvas.toDataURL("image/jpeg");

        if (isMounted) {
          setThumbnail(thumbnailDataUrl);
        }
      } catch (error) {
        console.error("Error generating PDF thumbnail:", error);
        if (isMounted) setThumbnail(null);
      }
    }

    generateThumbnail();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl, thumbnailWidth, thumbnailHeight]);

  return thumbnail;
}
