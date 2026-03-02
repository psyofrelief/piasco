"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QRGenerator() {
  const [url, setUrl] = useState("https://p-s.co");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-2xl font-bold">QR Code Generator</h1>

      <div className="flex flex-col gap-8 md:flex-row">
        {/* Controls */}
        <div className="flex flex-1 flex-col gap-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">URL:</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-md border p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold">Dots color:</label>
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-md border p-1"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-bold">Background color:</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-md border p-1"
              />
            </div>
          </div>

          <button
            onClick={downloadQR}
            className="mt-4 rounded-full bg-black px-8 py-3 font-bold text-white transition-opacity hover:opacity-80"
          >
            Download
          </button>
        </div>

        <QRCodeSVG
          ref={qrRef}
          value={url}
          size={256}
          bgColor={bgColor}
          fgColor={fgColor}
          level="H"
          marginSize={4}
        />
      </div>
    </main>
  );
}
