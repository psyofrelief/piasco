"use client";

import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";

export default function QRGeneratorForm() {
  const [destination, setDestination] = useState("https://p-s.co");
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showLogo, setShowLogo] = useState(true); // Toggle State
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
    <div className="flex size-full justify-between gap-8">
      {/* Controls */}
      <div className="gap-y-xl flex w-full flex-col">
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
            className="size-4 accent-black"
          />
          <Label htmlFor="logoToggle" className="cursor-pointer">
            Include Branding Logo
          </Label>
        </div>

        <Button onClick={downloadQR} className="w-full">
          Download PNG
        </Button>
      </div>

      {/* Preview */}
      <QRCodeSVG
        ref={qrRef}
        value={destination}
        bgColor={bgColor}
        fgColor={fgColor}
        level="H" // Error correction level 'H' is required when using logos
        marginSize={4}
        className="border-outline max-size-90 aspect-square w-full border border-dotted"
        imageSettings={
          showLogo
            ? {
                src: "/images/logo-icon.png", // Path to your logo icon
                x: undefined,
                y: undefined,
                height: 32,
                width: 32,
                excavate: true, // This cuts out the QR dots behind the logo
              }
            : undefined
        }
      />
    </div>
  );
}
