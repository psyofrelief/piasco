"use client";

import { toast } from "sonner";

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
      className="size-md bg-accent-muted flex items-center justify-center text-white transition-opacity hover:opacity-80"
    >
      CX
    </button>
  );
}
