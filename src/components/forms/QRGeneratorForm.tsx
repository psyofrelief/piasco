"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";

export default function QRGeneratorForm() {
  const [destination, setDestination] = useState(
    process.env.NEXT_PUBLIC_BASE_URL || "https://p-s.co",
  );
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showLogo, setShowLogo] = useState(true);
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQR = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 1024;
      canvas.height = 1024;
      if (!ctx) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      if (showLogo) {
        const logo = new Image();
        logo.src = "/images/logo-icon.png";
        logo.onload = () => {
          const logoSize = canvas.width * 0.15; // 15% of QR size
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;

          ctx.fillStyle = bgColor;
          ctx.fillRect(x, y, logoSize, logoSize);

          // Draw the logo icon
          ctx.drawImage(logo, x, y, logoSize, logoSize);

          triggerDownload(canvas);
        };
      } else {
        triggerDownload(canvas);
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  // Helper to handle the actual file saving
  const triggerDownload = (canvas: HTMLCanvasElement) => {
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = "qr-code.png";
    downloadLink.href = pngFile;
    downloadLink.click();
  };

  return (
    <div className="flex w-full justify-between gap-8">
      {/* Controls */}
      <div className="gap-y-xl flex h-fit w-full flex-col">
        <div className="gap-xs flex flex-col">
          <Label htmlFor="destination">URL:</Label>
          <Input
            placeholder="https://example.com"
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="gap-xs flex flex-col">
            <Label htmlFor="fgColor">Dots color:</Label>
            <input
              type="color"
              value={fgColor}
              id="fgColor"
              onChange={(e) => setFgColor(e.target.value)}
              className="border-outline p-xs h-xl w-full cursor-pointer border border-dashed bg-transparent"
            />
          </div>
          <div className="gap-xs flex flex-col">
            <Label htmlFor="bgColor">Background color:</Label>
            <input
              type="color"
              value={bgColor}
              id="bgColor"
              onChange={(e) => setBgColor(e.target.value)}
              className="border-outline p-xs h-xl w-full cursor-pointer border border-dashed bg-transparent"
            />
          </div>
        </div>

        {/* Toggle Option */}
        <div className="gap-x-sm flex items-center">
          <input
            type="checkbox"
            id="logoToggle"
            checked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
            className="size-sm accent-accent"
          />
          <Label htmlFor="logoToggle" className="cursor-pointer text-sm">
            Include Branding Logo
          </Label>
        </div>

        <Button onClick={downloadQR} className="w-full">
          Download PNG
        </Button>
      </div>
      {/* Preview */}
      <div className="border-outline flex h-full border border-dotted">
        <QRCodeSVG
          ref={qrRef}
          value={destination}
          size={undefined}
          bgColor={bgColor}
          fgColor={fgColor}
          level="H"
          marginSize={4}
          className="aspect-square h-full w-auto"
          imageSettings={
            showLogo
              ? {
                  src: "/images/logo-icon.png",
                  height: 16,
                  width: 16,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>{" "}
    </div>
  );
}
