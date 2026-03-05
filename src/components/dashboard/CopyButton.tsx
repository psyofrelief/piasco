"use client";

import { toast } from "sonner";
import CopyIcon from "../icons/CopyIcon";

export default function CopyButton({ url }: { url: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="bg-accent/60 p-xs rounded-full"
    >
      <CopyIcon />
    </button>
  );
}
