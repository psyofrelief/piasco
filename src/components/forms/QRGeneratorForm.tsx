"use client";

import { useState, useRef, ChangeEvent } from "react";
import { QRCodeSVG } from "qrcode.react";
import Label from "@/components/ui/Label";
import Input from "@/components/ui/Input";
import Button from "../ui/Button";
import UploadIcon from "../icons/UploadIcon";
import { useSearchParams } from "next/navigation";

export default function QRGeneratorForm() {
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showLogo, setShowLogo] = useState(true);
  const [customLogo, setCustomLogo] = useState<string>("/images/logo-icon.png");
  const qrRef = useRef<SVGSVGElement>(null);

  const searchParams = useSearchParams();
  const urlParam = searchParams.get("url");

  const [destination, setDestination] = useState(() => {
    return urlParam || process.env.NEXT_PUBLIC_BASE_URL || "https://p-s.co";
  });

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogo(url);
    }
  };

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
        logo.src = customLogo;
        logo.onload = () => {
          const logoSize = canvas.width * 0.15;
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;

          ctx.fillStyle = bgColor;
          ctx.fillRect(x, y, logoSize, logoSize);
          ctx.drawImage(logo, x, y, logoSize, logoSize);

          triggerDownload(canvas);
        };
      } else {
        triggerDownload(canvas);
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const triggerDownload = (canvas: HTMLCanvasElement) => {
    const pngFile = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.download = "qr-code.png";
    downloadLink.href = pngFile;
    downloadLink.click();
  };

  return (
    <div className="flex w-full justify-between gap-8">
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
            <Label htmlFor="fgColor">Dots colour:</Label>
            <input
              type="color"
              value={fgColor}
              id="fgColor"
              onChange={(e) => setFgColor(e.target.value)}
              className="border-outline p-xs h-xl w-full cursor-pointer border border-dashed bg-transparent"
            />
          </div>
          <div className="gap-xs flex flex-col">
            <Label htmlFor="bgColor">Background colour:</Label>
            <input
              type="color"
              value={bgColor}
              id="bgColor"
              onChange={(e) => setBgColor(e.target.value)}
              className="border-outline p-xs h-xl w-full cursor-pointer border border-dashed bg-transparent"
            />
          </div>
        </div>
        {/* Logo Upload Section */}
        <div className="gap-xs flex flex-col">
          <Label htmlFor="logoUpload">Upload custom logo:</Label>
          <div
            className="border-outline hover:bg-popover flex min-h-32 w-full cursor-pointer flex-col items-center justify-center border border-dashed transition-colors"
            onClick={() => document.getElementById("logoUpload")?.click()}
          >
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <div className="gap-y-xs flex flex-col items-center">
              <UploadIcon />
              <span className="text-muted-foreground text-xs">
                Click to upload image
              </span>
            </div>
          </div>
        </div>{" "}
        <div className="gap-x-sm flex items-center">
          <input
            type="checkbox"
            id="logoToggle"
            checked={showLogo}
            onChange={(e) => setShowLogo(e.target.checked)}
            className="size-sm accent-accent"
          />
          <Label htmlFor="logoToggle" className="cursor-pointer text-sm">
            Include branding logo
          </Label>
        </div>
        <Button onClick={downloadQR} className="w-full">
          Download PNG
        </Button>
      </div>

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
                  src: customLogo,
                  height: 16,
                  width: 16,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
